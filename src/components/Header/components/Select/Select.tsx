import { SelectorType } from '@/components/Header/components/types';

import styles from '@/components/Header/components/Select/Select.module.sass';

type SelectProps = {
  title: SelectorType;
  length: number;
  completedOptions?: number[];
  value: number;
  // eslint-disable-next-line no-unused-vars
  setValue: (value: number) => void;
  currentSelector: SelectorType | null;
  // eslint-disable-next-line no-unused-vars
  setCurrentSelector: (value: SelectorType | null) => void;
};

const getSelectorText = (title: string, item: number) => {
  return `${title[0].toUpperCase()}${title.slice(1)} ${item}`;
};

const getOptionsArray = (length: number) => {
  const optionsArray = [];
  for (let i = 1; i <= length; i += 1) {
    optionsArray.push(i);
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
  completedOptions,
  value,
  setValue,
  currentSelector,
  setCurrentSelector,
}: SelectProps) => {
  const handleChangeOption = (option: number) => {
    setValue(option);
    setCurrentSelector(null);
  };

  return (
    <div
      className={`${styles.select} ${currentSelector === title ? styles.open : ''}`}
    >
      <div
        className={`${styles.select__value} ${completedOptions?.includes(value) ? styles.done : ''}`}
        onClick={() =>
          setCurrentSelector(getNewCurrentSelector(currentSelector, title))
        }
      >
        {getSelectorText(title, value)}
      </div>
      <ul className={styles.select__options}>
        {getOptionsArray(length).map((option) => (
          <li
            className={`${styles.select__option} ${completedOptions?.includes(option) ? styles.done : ''}`}
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
