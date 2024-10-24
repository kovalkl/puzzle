import { Select } from '@/components/Header/components/Select/Select';
import { Logout } from '@/components/UI/Icons/Logout';
import { useAppSelector } from '@/store/hooks';

import styles from '@/components/Header/Header.module.sass';

const mockSelect = [
  'Round 1',
  'Round 2',
  'Round 3',
  'Round 4',
  'Round 5',
  'Round 6',
  'Round 7',
  'Round 8',
  'Round 9',
  'Round 10',
  'Round 11',
  'Round 12',
  'Round 13',
];

const doneOptions = ['Round 1', 'Round 3'];

export const Header = ({ isGreetingPage }: { isGreetingPage?: boolean }) => {
  const { userName } = useAppSelector((state) => state.userProgress);

  return (
    <header className={styles.header}>
      <div className={`${styles.header__wrapper} container`}>
        <a className={styles.header__title}>English Puzzle</a>
        {!isGreetingPage && (
          <Select options={mockSelect} doneOptions={doneOptions} />
        )}
        <div className={styles.header__user}>
          <span>{userName || 'Mock User'}</span>
          <Logout />
        </div>
      </div>
    </header>
  );
};
