import organizationManager from './../managers/organizationManager';
import eventInteractionManager from './../managers/eventInteractionManager';
import errorUtils from './errorUtils';
import EventInteraction from './../models/eventInteraction';
import sequelize from './sequelize';
import Charity from './../models/charity';
import Department from './../models/department';
import Event from './../models/event';
import User from './../models/user';
import Organization from './../models/organization';
import _ from 'underscore';
import Sequelize from 'sequelize';

const executeVolunteerSummaryQuery = (user, start, end) => {
  const query = 'SELECT ei.id,  ei.`value`, (select sum(evi.value) from event_interactions evi where evi.user_id = :userId AND evi.interaction_type = :minutes_spent) as achieved, e.title, e.starts_at, act.`name` FROM event_interactions ei JOIN `events` e ON e.id = ei.event_id JOIN event_activites ea ON ea.event_id = e.id JOIN activities act ON act.id = ea.activity_id WHERE ei.created_at BETWEEN :start and :end and ei.user_id = :userId AND ei.interaction_type = :minutes_spent AND ei.`value` IS NOT NULL AND ea.activity_id IS NOT NULL ORDER BY value DESC LIMIT 5'; 
  return sequelize.query(query, {replacements: { minutes_spent: eventInteractionManager.INTERACTION_TYPE_MINUTES_SPENT, userId: user.id, start: start, end: end}, type: sequelize.QueryTypes.SELECT});
}

const getUserVolunteringSummary = (user, startEnd) => {    
    
  return executeVolunteerSummaryQuery(user, startEnd.start, startEnd.end) 
  .then((eventMinutes) => {
    if(null == eventMinutes || eventMinutes.length == 0){
      return {
        chartId: "Volunteering Summary",
        targetHours: null == user.targetHours ? 0 : user.targetHours,
        achivedHours: 0,
        activities: []
      };
    }

    let targetHours = null == user.targetHours ? 0 : user.targetHours;
    let achivedHours = Math.ceil(eventMinutes[0].achieved/60);
    let activities = eventMinutes.map((eventMinute) => {
      return {
        value: eventMinute.value == null ? 0 : Math.ceil(parseInt(eventMinute.value)/60),
        eventTitle: eventMinute.title,
        date: eventMinute.starts_at,
        activityName: eventMinute.name
      }
    });
    return {
      chartId: "Volunteering Summary",
      targetHours: targetHours,
      achivedHours: achivedHours,
      activities: activities
    };
  });
}

const getTopFiveVolunteersData = (user, startEnd) => {
  return EventInteraction.findAll({
    group: 'user.id',
    where: {        
      interactionType: eventInteractionManager.INTERACTION_TYPE_MINUTES_SPENT,
      organizationId: user.organizationId,
      createdAt: {
        $between: [startEnd.start, startEnd.end]
      }
    }, 
    attributes: [[Sequelize.fn('SUM', Sequelize.cast(Sequelize.literal('value'), 'SIGNED INTEGER')), 'sumMinutes']],
    include: {
      where: {
        organizationId: user.organizationId
      },
      model: User, 
      as: 'user',
      attributes: ['id', 'firstName', 'lastName'],
      include: [{
          model: Department, as: 'department',
          attributes: ['name']
        },
        {
          model: Organization, as: 'organization',
          attributes: ['id','name']
        }
      ]
    },
    order: [[Sequelize.fn('SUM', Sequelize.cast(Sequelize.literal('value'), 'SIGNED INTEGER')), 'DESC']],
    limit: 5 
  })
  .then((eventMinutes) => {
    if(null == eventMinutes || eventMinutes.length == 0){
      return {
        chartId: "Top 5 Volunteers",
        volunteers: []
      };
    }

    let volunteers = eventMinutes.map((eventMinute) => {
      return {
        value: Math.ceil(eventMinute.get('sumMinutes')/60),
        firstName: eventMinute.user.firstName,
        lastName: eventMinute.user.lastName,
        department: null !== eventMinute.user.department ? eventMinute.user.department.name : '',
        organization: eventMinute.user.organization.name
      }
    });
    return {
      chartId: "Top 5 Volunteers",
      volunteers: volunteers
    };
  });
}

const getTopFiveGroupsData = (user, startEnd) => {
  return EventInteraction.findAll({
    group: 'user.department_id',
    attributes: [[Sequelize.fn('SUM', Sequelize.cast(Sequelize.literal('value'), 'SIGNED INTEGER')), 'sumMinutes']],
    where: {
      createdAt: {
        $between: [startEnd.start, startEnd.end]
      }
    },
    include: {
      where: {
        organizationId: user.organizationId,
        department_id : {
          $ne: null
        }
      },
      model: User, 
      as: 'user',
      include: [{
          model: Department, as: 'department',
          attributes: ['name']
        },
        {
          model: Organization, as: 'organization',
          attributes: ['id','name']
        }
      ]
    },
    order: [[Sequelize.fn('SUM', Sequelize.cast(Sequelize.literal('value'), 'SIGNED INTEGER')), 'DESC']],
    limit: 5 
  })
  .then((eventMinutes) => {
    if(null == eventMinutes || eventMinutes.length == 0){
      return {
        chartId: "Top 5 Groups",
        groups: []
      };
    }

    let groups = eventMinutes.map((eventMinute) => {
      return {
        value: Math.ceil(eventMinute.get('sumMinutes')/60),
        department: null !== eventMinute.user.department ? eventMinute.user.department.name : ''
      }
    });
    return {
      chartId: "Top 5 Groups",
      groups: groups
    };
  });
}

const getTopFiveNonProfit = (user, startEnd) => {
  return EventInteraction.findAll({
    group: 'event.charity_id',
    where: {
      createdAt: {
        $between: [startEnd.start, startEnd.end]
      }
    },
    attributes: [
      [Sequelize.fn('SUM', Sequelize.cast(Sequelize.literal('value'), 'SIGNED INTEGER')), 'sumMinutes'],
      [sequelize.fn('count', sequelize.col('user_id')), 'noOfParticipants']],
    include: {
      model: Event, 
      as: 'event',
      where: {
        organizationId: user.organizationId
      },
      include: [{
          model: Charity, as: 'charity',
          attributes: ['id','name']
        },
        {
          model: Organization, as: 'organization',
          attributes: ['id']
        }
      ]
    },
    order: [[Sequelize.fn('SUM', Sequelize.cast(Sequelize.literal('value'), 'SIGNED INTEGER')), 'DESC']],
    limit: 5 
  })
  .then((eventMinutes) => {
    if(null == eventMinutes || eventMinutes.length == 0){
      return {
        chartId: "Top 5 non profit",
        charities: []
      };
    }

    let charities = eventMinutes.map((eventMinute) => {
      return {
        value: Math.ceil(eventMinute.get('sumMinutes')/60),
        noOfParticipants: eventMinute.get('noOfParticipants'),
        name: null !== eventMinute.event.charity ? eventMinute.event.charity.name : 'Self Organized'
      }
    });
    return {
      chartId: "Top 5 non profit",
      charities: charities
    };
  });
}

const getTopFiveActivities = (user, startEnd) => {
  return executeTopFiveActivitiesQuery(user, startEnd.start, startEnd.end)
  .then((eventMinutes) => {
    if(null == eventMinutes || eventMinutes.length == 0){
      return {
        chartId: "Top 5 Activities",
        activities: []
      };
    }

    let activities = eventMinutes.map((eventMinute) => {
      return {
        value: Math.ceil(eventMinute['sumMinutes']/60),
        name: eventMinute['activityName'],
        noOfParticipants: eventMinute['noOfParticipants']
      }
    });
    return {
      chartId: "Top 5 Activities",
      activities: activities
    };
  });
}

const executeTopFiveActivitiesQuery = (user, start, end) => {    
  const query = 'SELECT sum(ei.value) as sumMinutes, count(ei.user_id) as noOfParticipants, act.name as activityName FROM event_interactions ei JOIN events ev ON ev.id = ei.event_id JOIN event_activites e_act ON e_act.event_id = ev.id JOIN activities act ON act.id = e_act.activity_id WHERE ei.created_at BETWEEN :start and :end and ei.value IS NOT NULL AND ei.interaction_type = :minutes_spent AND ei.organization_id = :organizationId GROUP BY act.id ORDER BY sum(ei.value) DESC LIMIT 5';
  return sequelize.query(query, {replacements: { minutes_spent: eventInteractionManager.INTERACTION_TYPE_MINUTES_SPENT, organizationId: user.organizationId, start: start, end: end}, type: sequelize.QueryTypes.SELECT});
}

const executeOrganizationMonthlyTimeSpentQuery = (user, start, end) => {
  const query = 'SELECT org.hours_per_year as targetHours, sum(ei.value) as sumMinutes, DATE_FORMAT(FROM_UNIXTIME(ei.created_at/1000), "%b") as monthName from event_interactions ei JOIN organizations org on org.id = ei.organization_id where ei.created_at BETWEEN :start and :end and ei.value is not null and ei.interaction_type = :minutes_spent and ei.organization_id = :organizationId GROUP BY monthName, DATE_FORMAT(FROM_UNIXTIME(ei.created_at/1000), "%Y") ORDER BY ei.created_at LIMIT 24';
  return sequelize.query(query, {replacements: { minutes_spent: eventInteractionManager.INTERACTION_TYPE_MINUTES_SPENT, organizationId: user.organizationId, start: start, end: end}, type: sequelize.QueryTypes.SELECT});     
}

const getOrganizationSummary = (user, startEnd) => {
  
  let organization = null;
  
  return user.getOrganization()
  .then((o) => {
    organization = o;
    return executeOrganizationMonthlyTimeSpentQuery(user, startEnd.start, startEnd.end);
  })    
  .then((eventMinutes) => {
    if(null == eventMinutes || eventMinutes.length == 0){
      return {
        chartId: "Monthly Breakdown",
        targetHours: null == organization.hoursPerYear ? 0 : organization.hoursPerYear,
        achivedHours: 0,
        monthlyHours: [],
        percentageAchived: '0%'
      };
    }
    let targetHours = null == organization.hoursPerYear ? 0 : organization.hoursPerYear;
    let achivedHours = Math.ceil(_.pluck(eventMinutes, 'sumMinutes')
      .reduce((prev, current) => { return prev + (null == current ? 0 : parseInt(current)); } , 0)/60);
    let percentageAchived = (targetHours > 0 && achivedHours > 0) 
        ? (Math.ceil((achivedHours/targetHours)*100) > 100 ? 100 : Math.ceil((achivedHours/targetHours)*100)) 
        : 0
    let monthlyHours = eventMinutes.map((eventMinute) => {
      return {
        hours: Math.ceil(eventMinute['sumMinutes']/60),
        monthName: eventMinute['monthName']
      }
    });
    return {
      chartId: "Monthly Breakdown",
      targetHours: targetHours,
      achivedHours: achivedHours,
      monthlyHours: monthlyHours,
      percentageAchived: percentageAchived+'%'
    };
  });
}

const handleChartDataGenericRequest = (req, res, fetchChartData) => {

  req.user.getOrganization()
  .then((organization) => {
    
    let startEnd;
    if(undefined !== req.query.monthsPrevious)
      startEnd = organizationManager.getStartAndCurrentAsEndMillisByMonth(req.query.monthsPrevious);
    else
      startEnd = organizationManager.getStartEndMillisOfCurrentYear(organization);

    return fetchChartData(req.user, startEnd);
  })
  .then((resp) => {
    res.send(resp);
  })
  .catch((error) => {
    return errorUtils.caughtError(res, error);
  });
}

export default{
  handleChartDataGenericRequest: handleChartDataGenericRequest,
  getOrganizationSummary: getOrganizationSummary,  
  getTopFiveActivities: getTopFiveActivities,
  getTopFiveNonProfit: getTopFiveNonProfit,
  getTopFiveGroupsData: getTopFiveGroupsData,
  getTopFiveVolunteersData: getTopFiveVolunteersData,
  getUserVolunteringSummary: getUserVolunteringSummary
}
