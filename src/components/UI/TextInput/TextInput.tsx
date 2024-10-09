import { forwardRef } from 'react';

import styles from '@/components/UI/textInput/TextInput.module.sass';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  errorText?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, errorText, ...props }, ref) => {
    return (
      <div className={styles.textInput}>
        <label className={styles.textInput__label}>
          <input
            className={`${styles.textInput__input} ${Boolean(errorText) && styles.error}`}
            type='text'
            placeholder={label}
            ref={ref}
            {...props}
          />
        </label>
        <span className={styles.textInput__error}>
          {errorText ? errorText : ''}
        </span>
      </div>
    );
  },
);

export default TextInput;
