import React from "react";
import styles from "./Modal.module.css";

const Modal = (props) => {
  return (
    <div
      className={styles.Modal}
      style={{
        transform: props.status ? "translateY(0)" : "translateY(-100vh)",
      }}
    >
      {props.children}
    </div>
  );
};
export default Modal;
