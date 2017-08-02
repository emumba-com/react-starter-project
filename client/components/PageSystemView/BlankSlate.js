// libs
import React from 'react'
import { Link } from 'react-router-dom'

// src
import styles from './BlankSlate.less'

const BlankSlate = () => {
    return <div className={styles.root}>You have no environments at the moment. <Link to="/environments/new">+ Create new environment</Link></div>
}

export default BlankSlate
