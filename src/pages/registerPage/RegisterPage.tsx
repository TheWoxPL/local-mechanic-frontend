import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
// TypeScript may show an error here, but everything works fine in runtime.
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './registerPage.module.scss';
import { UserAuth } from 'src/context';
import { useNavigate } from 'react-router';

const formSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' })
      .regex(/[a-zA-Z0-9]/, { message: 'Password must be alphanumeric' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export default function RegisterPage() {
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { registerWithEmailAndPassword, user } = UserAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFormError,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    setIsSubmitting(true);
    setError('');

    registerWithEmailAndPassword(data.email, data.password)
      .then(() => {
        setIsSubmitting(false);
        navigate('/profile');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          setFormError('email', {
            type: 'manual',
            message: 'Email already in use',
          });
        }
        setIsSubmitting(false);
      });
  };

  if (user) {
    navigate('/profile');
    return <div></div>;
  }

  return (
    <div className={styles.registerPageContainer}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>Register</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="johndoe@mail.com"
            autoComplete="email"
            {...register('email')}
            className={errors.email ? styles.inputError : ''}
          />
          {errors.email && (
            <span className={styles.error}>
              {errors.email.message as string}
            </span>
          )}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="******"
            autoComplete="new-password"
            {...register('password')}
            className={errors.password ? styles.inputError : ''}
          />
          {errors.password && (
            <span className={styles.error}>
              {errors.password.message as string}
            </span>
          )}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="******"
            autoComplete="new-password"
            {...register('confirmPassword')}
            className={errors.confirmPassword ? styles.inputError : ''}
          />
          {errors.confirmPassword && (
            <span className={styles.error}>
              {errors.confirmPassword.message as string}
            </span>
          )}
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <button
          className={styles.submitButton}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
        <div className={styles.loginLink}>
          Already have an account? <a href="/login">Login</a>
        </div>
      </form>
    </div>
  );
}
