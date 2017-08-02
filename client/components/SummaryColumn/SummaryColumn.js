// libs
import React from "react"
import { connect } from "react-redux"
import { NavLink, Route } from "react-router-dom"
import get from "lodash/get"

// src
import styles from "./SummaryColumn.less"
import { getCurrentUser, getPathname } from "../../utils"

const navigation = [
  {
    name: "Report Types",
    condition: "/queries",
    type: "group",
    children: [
      {
        name: "Total Queries",
        path: "/queries/total"
      },
      {
        name: "Report Queries",
        path: "/queries/report"
      },
      {
        name: "Dashboard Queries",
        path: "/queries/dashboard"
      }
    ]
  }
]

@connect((state, ownProps) => {
  const user = getCurrentUser(state)
  const pathname = getPathname(state)
  const showSystemLink = user && user.email === "starter@emumba.com"
  const nav = navigation.filter(
    group => !group.condition || pathname.indexOf(group.condition) > -1
  )

  return { showSystemLink, pathname, nav }
})
export default class SummaryColumn extends React.Component {
  render() {
    const { showSystemLink, nav } = this.props

    return (
      <div className={styles.root}>
        <ul className={styles.navigation}>
          {nav.map(group =>
            <li>
              <span className={styles.heading}>
                {group.name}
              </span>
              <ul>
                {group.children.map(item =>
                  <li>
                    <NavLink to={item.path} activeClassName={styles.activeLink}>
                      {item.name}
                    </NavLink>
                  </li>
                )}
              </ul>
            </li>
          )}
          <Route
            path="/system"
            render={() =>
              <li>
                <NavLink to="/queries">Reports View</NavLink>
              </li>}
          />
          <Route
            path="/system"
            render={() =>
              <li>
                <NavLink to="/query-breakdown">Query Breakdown</NavLink>
              </li>}
          />
          <If condition={showSystemLink}>
            <Route
              path="/queries"
              render={() =>
                <li>
                  <NavLink to="/system">System View</NavLink>
                </li>}
            />
          </If>
        </ul>
      </div>
    )
  }
}
