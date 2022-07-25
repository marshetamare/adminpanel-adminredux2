
import React, { Component } from 'react'
import styles from './Notification.module.css'
import {useSelector, useDispatch} from 'react-redux'
import {uiActions} from '../../../Store/ui-slice'

const Notification = (props)=>{
  const notify = useSelector((state)=>state.ui.isNotificationOpen);
  const dispatch = useDispatch();

  const closeNotification = ()=>{
    dispatch(uiActions.closeNotification())
  }
    return (
      <div className={styles.notificationContainer} style={{backgroundColor: `${props.bgcolor}`, colr: `${props.color}` } }>
        <div>{props.title}</div>
        <div>{props.children}</div>
        <button className={styles.closeBtn} onClick={closeNotification}>X</button>
         
      </div>
    )
  
}
export default Notification;