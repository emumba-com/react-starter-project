// libs
import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'
import RadioButtonGroup from 'material-ui/RadioButton/RadioButtonGroup'
import SelectField from 'material-ui/SelectField'

// src
import { hasFeed as fnHasFeed, getFeed } from './utils'
import { fetchAllUsers } from '../actions'

export const renderTextField = ({ input, label, innerRef, meta: { touched, error }, ...custom }) => (
  <TextField
    floatingLabelText={label}
    floatingLabelFixed
    fullWidth
    errorText={touched && error}
    ref={innerRef}
    hintStyle={{fontSize: 12}}
    {...input}
    {...custom}
  />
)

export const renderCheckbox = ({ input, label }) => (
  <Checkbox label={label}
    checked={input.value ? true : false}
    onCheck={input.onChange}/>
)

export const renderRadioGroup = ({ input, label, ...rest }) => (
  <div style={{margin: '10px 0'}}>
    <label style={{fontSize: 12, color: 'rgba(0, 0, 0, 0.298039)'}}>{label}</label>
    <RadioButtonGroup {...input} {...rest}
      valueSelected={input.value}
      onChange={(event, value) => input.onChange(value)}/>
  </div>
)

export const renderSelectField = ({ input, label, meta: { touched, error }, children }) => (
  <SelectField
    floatingLabelText={label}
    floatingLabelFixed
    fullWidth
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}/>
)

const makeEntitySelectionField = ({ feedKey, entityKey, fetch }) => {

  return @connect((state, ownProps) => {
    const { meta, filterItems } = ownProps
    const hasFeed = fnHasFeed(state, feedKey, entityKey)
    const feed = getFeed(state, feedKey, entityKey)
    const items = filterItems
      ? get(feed, 'items', []).filter(item => item[filterItems.key] === filterItems.value)
      : get(feed, 'items', [])

    return { hasFeed, ...feed, items, meta }
  }, { fetch })
  class EntitySelectionField extends React.Component {
    componentDidMount() {
      const { hasFeed, fetch } = this.props

      if ( !hasFeed ) fetch()
    }
    render() {
      const { isLoading, items, children, ...rest } = this.props

      return (
        <div>
          <Choose>
            <When condition={ isLoading }>
              <p>Loading ...</p>
            </When>
            <When condition={ !items.length }>
              <p>Data not loaded!</p>
            </When>
            <Otherwise>
              {
                renderSelectField(Object.assign({}, rest, {
                  children: items.map( ({id, name}) => <MenuItem value={id} primaryText={name}/>)
                }))
              }
            </Otherwise>
          </Choose>
        </div>
      )
    }
  }
}

export const renderUsersField = makeEntitySelectionField({
  feedKey: 'userAll',
  entityKey: 'user',
  fetch: fetchAllUsers
})
