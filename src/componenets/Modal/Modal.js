import React from "react";
import styles from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
  return (
    <React.Fragment>
      <Backdrop show={props.status} clicked={props.clicked} />
      <div
        className={styles.Modal}
        style={{
          transform: props.status ? "translateY(0)" : "translateY(-100vh)",
        }}
      >
        {props.children}
      </div>
    </React.Fragment>
  );
};
export default Modal;
