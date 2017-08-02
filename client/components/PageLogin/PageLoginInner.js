// libs
import React from 'react'
import { Field } from 'redux-form'
import Paper from 'material-ui/Paper'
import DocumentTitle from 'react-document-title'

// src
import styles  from './PageLoginInner.less'
import { renderTextField } from '../../utils'

const PageLoginInner = props => {
  const { onSubmit, renderSubmitButton, renderMessage } = props

  return (
    <div className={`${styles.root} row`}>
      <div className="col-lg-6 col-lg-offset-3">
        <DocumentTitle title="Login - Emumba"/>
        <Paper>
          <form className={styles.root} onSubmit={onSubmit}>
            <h2 className="dialog-heading" style={{textAlign: 'center'}}>Sign in</h2>
            {
              renderMessage()
            }
            <Field name="email" label="Email" component={renderTextField} autoFocus/>
            <Field name="password" label="Password" component={renderTextField} type="password"/>
            <div className={styles.btnSubmitContainer}>
              {
                  renderSubmitButton({
                      label: 'Login',
                      labelWhenSubmitting: 'Logging in ...'
                  })
              }
            </div>
            <div className={styles.instructionsContainer}>
            </div>
            <input type="submit" style={{display: 'none'}}/>
          </form>
        </Paper>
      </div>
    </div>
  )
}

export default PageLoginInner
