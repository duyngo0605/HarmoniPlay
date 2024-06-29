// Modal.js
import React from "react";
import styles from "./Modal.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Modal = ({ title, children, onClose }) => {
  return (
    <div className={cx("modal-overlay")}>
      <div className={cx("modal-container", "customer-container")}>
        <div className={cx("modal-header", "contents-container")}>
          <h2>{title}</h2>
        </div>
        <div className={cx("modal-content", "contents-container")}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
