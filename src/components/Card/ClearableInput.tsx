import React from 'react';
import { Input, InputProps } from 'antd';
import useClearableInput from './hooks';

type ClearableInputProps = InputProps;

export const ClearableInput: React.FC<ClearableInputProps> = ({ ...props }) => {
  const inputProps = useClearableInput();

  return <Input {...inputProps} {...props} />;
};

export default ClearableInput;
