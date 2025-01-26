import { SelectorType } from '@/components/Header/components/types';

import styles from '@/components/Header/components/Select/Select.module.sass';

type SelectProps = {
  title: SelectorType;
  length: number;
  doneOptions?: string[];
  value: string;
  setValue: (value: string) => void;
  currentSelector: SelectorType | null;
  setCurrentSelector: (value: SelectorType | null) => void;
};

const getSelectorText = (title: string, item: string) => {
  return `${title[0].toUpperCase()}${title.slice(1)} ${item}`;
};

const getOptionsArray = (length: number) => {
  const optionsArray = [];
  for (let i = 1; i <= length; i += 1) {
    optionsArray.push(i.toString());
  }
  return optionsArray;
};

const getNewCurrentSelector = (
  activeSelector: SelectorType | null,
  currentSelector: SelectorType | null,
): SelectorType | null => {
  return activeSelector === currentSelector ? null : currentSelector;
};

export const Select = ({
  title,
  length,
  doneOptions,
  value,
  setValue,
  currentSelector,
  setCurrentSelector,
}: SelectProps) => {
  const handleChangeOption = (option: string) => {
    setValue(option);
    setCurrentSelector(null);
  };

  return (
    <div
      className={`${styles.select} ${currentSelector === title ? styles.open : ''}`}
    >
      <div
        className={`${styles.select__value} ${doneOptions?.includes(value) ? styles.done : ''}`}
        onClick={() =>
          setCurrentSelector(getNewCurrentSelector(currentSelector, title))
        }
      >
        {getSelectorText(title, value)}
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
            {getSelectorText(title, option)}
          </li>
        ))}
      </ul>
    </div>
  );
};
