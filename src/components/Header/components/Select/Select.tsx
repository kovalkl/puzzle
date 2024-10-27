import { useState } from 'react';

import styles from '@/components/Header/components/Select/Select.module.sass';

type SelectProps = {
  text: string;
  length: number;
  doneOptions?: string[];
  value: string;
  setValue: (value: string) => void;
};

const getItemWithText = (text: string, item: string) => {
  return `${text} ${item}`;
};

const getOptionsArray = (length: number) => {
  const optionsArray = [];
  for (let i = 1; i <= length; i += 1) {
    optionsArray.push(i.toString());
  }
  return optionsArray;
};

export const Select = ({
  text,
  length,
  doneOptions,
  value,
  setValue,
}: SelectProps) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const handleChangeOption = (option: string) => {
    setValue(option);
    setIsOptionsOpen(false);
  };

  return (
    <div className={`${styles.select} ${isOptionsOpen ? styles.open : ''}`}>
      <div
        className={`${styles.select__value} ${doneOptions?.includes(value) ? styles.done : ''}`}
        onClick={() => setIsOptionsOpen(!isOptionsOpen)}
      >
        {getItemWithText(text, value)}
      </div>
      <ul className={styles.select__options}>
        {getOptionsArray(length).map((option) => (
          <li
            className={`${styles.select__option} ${doneOptions?.includes(option) ? styles.done : ''}`}
            key={option}
            onClick={() => {
              handleChangeOption(option);
            }}
          >
            {getItemWithText(text, option)}
          </li>
        ))}
      </ul>
    </div>
  );
};
