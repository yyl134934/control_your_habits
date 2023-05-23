import React from 'react';
import { Input, InputProps } from 'antd';
import useClearableInput from './hooks';

type ClearableInputProps = InputProps;

export const ClearableInput: React.FC<ClearableInputProps> = ({ ...props }) => {
  const clearableInputProps = useClearableInput();

  return <Input {...clearableInputProps} {...props} />;
};

export default ClearableInput;
