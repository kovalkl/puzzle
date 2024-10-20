import styles from '@/components/UI/Icons/Icon.module.sass';

export const Logout = () => {
  return (
    <div className={styles.wrapper}>
      <svg
        width='25'
        height='22'
        viewBox='0 0 25 22'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          className={styles.icon}
          d='M20.4167 12.2222H5.95238V9.77778H20.4167L18.5714 7.88333L20.2381 6.11111L25 11L20.2381 15.8889L18.5714 14.1167L20.4167 12.2222ZM14.2857 7.33333V2.44444H2.38095V19.5556H14.2857V14.6667H16.6667V19.5556C16.6667 20.2278 16.4335 20.8032 15.9673 21.2819C15.501 21.7606 14.9405 22 14.2857 22H2.38095C1.72619 22 1.16567 21.7606 0.699405 21.2819C0.233135 20.8032 0 20.2278 0 19.5556V2.44444C0 1.77222 0.233135 1.19676 0.699405 0.718056C1.16567 0.239352 1.72619 0 2.38095 0H14.2857C14.9405 0 15.501 0.239352 15.9673 0.718056C16.4335 1.19676 16.6667 1.77222 16.6667 2.44444V7.33333H14.2857Z'
        />
      </svg>
    </div>
  );
};
