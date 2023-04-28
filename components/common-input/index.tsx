import { Form, Input } from "antd";
import React from "react";

interface CommonInputProps {
  name: string;
  ruleMessage?: string;
  className: string;
  placeholder?: string;
  maxLength: number;
  type?: string;
}
function CommonInput({
  name,
  ruleMessage = "",
  className,
  placeholder = "",
  maxLength,
  type = "text",
  ...props
}: CommonInputProps) {
  return (
    <Form.Item
      name={name}
      rules={[
        {
          required: true,
          message: `${ruleMessage}`,
          whitespace: true,
        },
      ]}
      {...props}
    >
      <Input
        type={type}
        className={className}
        placeholder={placeholder}
        maxLength={maxLength}
      />
    </Form.Item>
  );
}

export default CommonInput;
