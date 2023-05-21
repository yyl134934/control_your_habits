import { useState, ChangeEventHandler, KeyboardEventHandler } from 'react';

interface UseClearableInput {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
}

const useClearableInput = (): UseClearableInput => {
  const [value, setValue] = useState('');

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      setValue('');
    }
  };

  return {
    value,
    onChange: handleChange,
    onKeyDown: handleKeyDown,
  };
};

export default useClearableInput;
