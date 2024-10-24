import { useState } from 'react';

import styles from '@/components/Header/components/Select/Select.module.sass';

type SelectProps = {
  options: string[];
  doneOptions?: string[];
};

export const Select = ({ options, doneOptions }: SelectProps) => {
  const [value, setValue] = useState(options[0]);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  return (
    <div className={`${styles.select} ${isOptionsOpen ? styles.open : ''}`}>
      <div
        className={`${styles.select__value} ${doneOptions?.includes(value) ? styles.done : ''}`}
        onClick={() => setIsOptionsOpen(!isOptionsOpen)}
      >
        {value}
      </div>
      <ul className={styles.select__options}>
        {options?.map((option) => (
          <li
            className={`${styles.select__option} ${doneOptions?.includes(option) ? styles.done : ''}`}
            key={option}
            onClick={() => {
              setValue(option);
              setIsOptionsOpen(false);
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};
