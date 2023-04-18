import { Button, Form } from "antd";
import React from "react";

interface CommonButtonSubmitProps {
  className: string;
  text: string;
}

function CommonButtonSubmit({ className, text }: CommonButtonSubmitProps) {
  return (
    <Form.Item labelCol={{ span: 24 }}>
      <Button block type="primary" htmlType="submit" className={className}>
        {text}
      </Button>
    </Form.Item>
  );
}

export default CommonButtonSubmit;
