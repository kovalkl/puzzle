import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { loginSchema } from '@/components/Login/loginSchema';
import Button from '@/components/UI/Button/Button';
import TextInput from '@/components/UI/TextInput/TextInput';
import { paths } from '@/constants/paths';
import { useAppDispatch } from '@/store/hooks';
import { addUser } from '@/store/userProgressSlice';
import { UserType } from '@/types/types';
import { yupResolver } from '@hookform/resolvers/yup';

import styles from '@/components/Login/Login.module.sass';

export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ resolver: yupResolver(loginSchema), mode: 'onChange' });

  const onSubmit = (data: UserType) => {
    dispatch(addUser(`${data.firstName} ${data.surname}`));
    navigate(`/${paths.GREETING}`);
  };

  return (
    <div className={`${styles.container} container`}>
      <section className={styles.login}>
        <div className={styles.login__wrapper}>
          <h1 className={styles.login__title}>user login</h1>
          <form
            className={styles.login__form}
            onSubmit={handleSubmit(onSubmit)}
          >
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
