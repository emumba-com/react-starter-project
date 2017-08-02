// libs
import React from "react"
import DocumentTitle from "react-document-title"

// src
import styles from "./PageSystemViewInner.less"
import BlankSlate from "./BlankSlate"
import Loading from "./Loading"
import SystemView from "./SystemView"
import ButtonMenu from "../ButtonMenu"

const PageSystemViewInner = props => {
  const { isLoading = false, items } = props

  return (
    <div className={`${styles.root}`}>
      <DocumentTitle title="System View - Emumba" />
      <div className="row">
        <div className="col-lg-8">
          <h1>System View</h1>
        </div>
        <div className="col-lg-4" className={styles.actionContainer}>
          <ButtonMenu
            label="+ New"
            items={[
              {
                label: "Environment",
                link: "/environments/new"
              },
              {
                label: "Node",
                link: "/nodes/new"
              }
            ]}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <Choose>
            <When condition={isLoading}>
              <Loading {...props} />
            </When>
            <When condition={items.length}>
              <SystemView {...props} />
            </When>
            <Otherwise>
              <BlankSlate {...props} />
            </Otherwise>
          </Choose>
        </div>
      </div>
    </div>
  )
}

export default PageSystemViewInner
