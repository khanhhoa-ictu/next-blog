import { Modal } from "antd";
import React from "react";
import styles from "./style.module.scss";

interface CustomModalProps {
  isOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  title: string;
  children?: React.ReactNode;
}

function CustomModal(props: CustomModalProps) {
  const { isOpen, handleOk, handleCancel, title, children } = props;
  return (
    <Modal
      title={title}
      visible={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      className={styles.modalCustom}
      closable={false}
      cancelText={"Cancel"}
      okText={"OK"}
      centered
    >
      {!!children && children}
    </Modal>
  );
}

export default CustomModal;
