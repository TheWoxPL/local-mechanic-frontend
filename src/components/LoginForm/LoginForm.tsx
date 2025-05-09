import styles from './LoginForm.module.scss';
import GoogleLogoSVG from 'src/assets/svgs/google-logo.svg';
import { UserAuth } from 'src/context';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .regex(/[a-zA-Z0-9]/, { message: 'Password must be alphanumeric' }),
});

export const LoginForm = ({ onSwitchToRegister }) => {
  const { login, loginWithEmailAndPassword } = UserAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    loginWithEmailAndPassword(data.email, data.password)
      .then(() => {
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.log('error:', error);
        console.log(error);
        if (error.code === 'auth/wrong-password') {
          setFormError('password', {
            type: 'manual',
            message: 'Invalid password',
          });
        }
        if (error.code === 'auth/user-not-found') {
          setFormError('email', {
            type: 'manual',
            message: 'Email not found',
          });
        }
        setIsSubmitting(false);
      });
  };

  const errorContainerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: {
      opacity: 0,
      height: 0,
      y: -10,
      marginBottom: 0,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email"></label>
        <div className={styles.inputContainer}>
          <input
            type="email"
            id="email"
            className={`${styles.email} ${errors.email ? styles.inputError : ''}`}
            placeholder="johndoe@mail.com"
            autoComplete="email"
            {...register('email')}
          />
          <AnimatePresence>
            {errors.email && (
              <motion.div
                className={styles.errorContainer}
                variants={errorContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className={styles.errorIcon}>!</div>
                <p className={styles.errorText}>{errors.email.message}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <label htmlFor="password"></label>
        <div className={styles.inputContainer}>
          <input
            type="password"
            id="password"
            className={`${styles.password} ${errors.password ? styles.inputError : ''}`}
            placeholder="******"
            autoComplete="new-password"
            {...register('password')}
          />
          <AnimatePresence>
            {errors.password && (
              <motion.div
                className={styles.errorContainer}
                variants={errorContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className={styles.errorIcon}>!</div>
                <p className={styles.errorText}>{errors.password.message}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.1 }}
          animate={{ opacity: isSubmitting ? 0.6 : 1 }}
        >
          <input
            type="submit"
            className={styles.loginButton}
            value={isSubmitting ? 'Loading...' : 'Login'}
            disabled={isSubmitting}
          />
        </motion.div>
      </form>

      <span className={styles.orContinueWithText}> Or continue with</span>

      <motion.button
        className={styles.googleButton}
        onClick={login}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.1 }}
      >
        <img src={GoogleLogoSVG} alt="Google logo" />
        Google
      </motion.button>

      <span className={styles.createAccountText}>
        Don't have account? &nbsp;
        <span onClick={onSwitchToRegister} className={styles.createAccountLink}>
          Create now
        </span>
      </span>
    </div>
  );
};
