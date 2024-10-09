import { useForm } from 'react-hook-form';

import { loginSchema } from '@/components/Login/loginSchema';
import Button from '@/components/UI/Button/Button';
import TextInput from '@/components/UI/TextInput/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';

import styles from '@/components/Login/Login.module.sass';

export const Login = () => {
  const {
    register,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(loginSchema), mode: 'onChange' });
  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className={`${styles.container} container`}>
      <section className={styles.login}>
        <div className={styles.login__wrapper}>
          <h1 className={styles.login__title}>user login</h1>
          <form className={styles.login__form} onSubmit={submitForm}>
            <TextInput
              label='First Name'
              {...register('firstName')}
              errorText={errors.firstName?.message}
            />
            <TextInput
              label='Surname'
              {...register('surname')}
              errorText={errors.surname?.message}
            />
            <Button type='submit' disabled={!isValid}>
              Login
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};
