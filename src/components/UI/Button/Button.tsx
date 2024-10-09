import styles from '@/components/UI/button/Button.module.sass';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button disabled className={styles.button} {...props}>
      {children}
    </button>
  );
};

export default Button;
