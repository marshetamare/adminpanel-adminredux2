
import React from "react";
import styles from "./modal.module.css";
//import { RiCloseLine } from "react-icons/ri";
import {uiActions} from '../../../Store/ui-slice'
import { useSelector, useDispatch} from 'react-redux'
const Modal = (props) => {
    const dispatch = useDispatch();
    const toggleHandler = ()=>{
        dispatch(uiActions.closeModal())
    }
  return (
    <div>
      <div className={styles.darkBG} onClick={toggleHandler} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Dialog</h5>
          </div>
          <button className={styles.closeBtn} onClick={toggleHandler}>
            {//<RiCloseLine style={{ marginBottom: "-3px" }} />
        }
                X
          </button>
          <div className={styles.modalContent}>
            {props.children}
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button className={styles.deleteBtn} onClick={toggleHandler}>
                Delete
              </button>
              <button
                className={styles.cancelBtn}
                onClick={toggleHandler}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;