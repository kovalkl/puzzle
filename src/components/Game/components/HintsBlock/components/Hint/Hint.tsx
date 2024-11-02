import styles from '@/components/Game/components/HintsBlock/components/Hint/Hint.module.sass';

type HintProps = {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

export const Hint = ({ isActive, onClick, children }: HintProps) => {
  return (
    <div
      className={`${styles.hint} ${isActive ? styles.active : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
