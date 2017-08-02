import React from 'react'
import MyDialogInner from './MyDialogInner'

export default class MyDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleRequestClose(e) {
    if (e.target.id === 'content-wrapper') {
      this.props.onRequestClose();
    }
  }
  componentWillReceiveProps(nextProps) {
    const present = this.props.open
    const future = nextProps.open

    if (present && !future) {
      this.dialogWillClose()
    } else if (!present && future) {
      this.dialogWillOpen()
    }
    
    setTimeout(() => (document.body.style.overflow = future ? 'hidden' : 'scroll'), 0)
  }
  dialogWillOpen() {
    const {onDialogWillOpen} = this.props
    // alert(`opening dialog ...`)
    onDialogWillOpen && onDialogWillOpen()
  }
  dialogWillClose() {
    const {onDialogWillClose} = this.props
    
    onDialogWillClose && onDialogWillClose()
  }
  render() {
    return (
      <MyDialogInner {... this.props} onRequestClose={this.handleRequestClose.bind(this)}/>
    );
  }
}
