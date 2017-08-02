import React from "react"
import { connect } from "react-redux"
import { push } from "react-router-redux"
import RaisedButton from "material-ui/RaisedButton"
import Popover from "material-ui/Popover"
import Menu from "material-ui/Menu"
import MenuItem from "material-ui/MenuItem"

@connect()
export default class ButtonMenu extends React.Component {
  state = {
    open: false,
    anchorEl: undefined
  }
  handleClickButton = e => {
    e.preventDefault()

    this.setState({
      open: !this.state.open,
      anchorEl: e.currentTarget
    })
  }
  handleRequestClose = () => {
    this.setState({
      open: false
    })
  }
  handleClickMenuItem = item => {
    const { dispatch } = this.props
    dispatch(push(item.link))
  }
  render() {
    const { label, items } = this.props
    return (
      <div>
        <RaisedButton
          label={label}
          secondary
          onClick={this.handleClickButton}
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          targetOrigin={{ horizontal: "right", vertical: "top" }}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            {items.map(item =>
              <MenuItem
                primaryText={item.label}
                onClick={this.handleClickMenuItem.bind(null, item)}
              />
            )}
          </Menu>
        </Popover>
      </div>
    )
  }
}
