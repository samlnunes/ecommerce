import React, {
  HTMLInputTypeAttribute,
  FocusEventHandler,
  KeyboardEventHandler,
} from 'react';
import { useEffect } from 'react';
import InputMask from 'react-input-mask';
import {
  ErrorMessage,
  Input,
  Parent,
  Placeholder,
} from './styles';

export interface TextFieldProps {
  id?: string;
  name: string;
  placeholder: string;
  value?: any;
  error?: string;
  disabled?: boolean;
  mask?: string | Array<string | RegExp>;
  maskPlaceholder?: string | null;
  mb?: number;
  mt?: number;
  type?: HTMLInputTypeAttribute;
  readOnly?: boolean;
  onChange?: (value: string) => void;
  onKeyPress?: KeyboardEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  invalidChars?: string;
  maxLength?: number;
  inputMode?:
    | 'none'
    | 'text'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | 'search'
    | undefined;
  className?: string;
  autocomplete?: string;
  ref?: any;
}

const TextField: React.FC<TextFieldProps> = React.forwardRef(
  (
    {
      id,
      name,
      value,
      placeholder,
      error,
      disabled,
      mask,
      maskPlaceholder = null,
      type,
      readOnly = false,
      onChange,
      onKeyPress,
      onFocus,
      invalidChars,
      maxLength,
      inputMode,
      className,
      autocomplete,
    },
    ref,
  ) => {
    useEffect(() => {
      if (invalidChars) {
        const inputBox = document.getElementById(name);

        inputBox!.addEventListener('keydown', function (e) {
          if (invalidChars.includes(e.key)) {
            e.preventDefault();
          }
        });
      }
    }, [invalidChars, name]);

    return (
      <Parent error={!!error}>
        {mask ? (
          <InputMask
            id={name}
            name={name}
            mask={mask}
            type={type}
            value={value}
            disabled={disabled}
            readOnly={readOnly}
            className={className}
            inputMode={inputMode}
            autoComplete={autocomplete}
            maskPlaceholder={maskPlaceholder}
            onChange={e => onChange && onChange(e.target.value)}
          />
        ) : (
          <Input
            id={id}
            name={name}
            value={value}
            error={!!error}
            onFocus={onFocus}
            readOnly={readOnly}
            disabled={disabled}
            maxLength={maxLength}
            inputMode={inputMode}
            className={className}
            onKeyPress={onKeyPress}
            filled={value?.length > 0}
            type={type ? type : 'text'}
            autoComplete={autocomplete}
            onChange={e => onChange && onChange(e.target.value)}
          />
        )}

        <Placeholder
          error={!!error}
          htmlFor={name}
          className={className}
          filled={value != undefined && value !== ''}
        >
          {placeholder}
        </Placeholder>

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Parent>
    );
  },
);

TextField.displayName = 'TextField';

export default TextField;
