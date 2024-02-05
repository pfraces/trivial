import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useAuth } from '@/firebase/auth';
import { useSnackbar } from '@/layout/snackbar/snackbar';
import { useDialog } from '@/layout/dialog/dialog.jsx';
import { useForm } from '@/form/form';
import { email, minLength, required } from '@/form/rules';
import InputPassword from '@/components/InputPassword/InputPassword';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const { login, resendEmailVerification } = useAuth();
  const snackbar = useSnackbar();
  const dialog = useDialog();
  const ignoreDialogCancellationError = () => {};

  const { form, validate } = useForm({
    email: [required(), email()],
    password: [required(), minLength(6)]
  });

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const onEmailChange = (event) => {
    setUser((user) => ({ ...user, email: event.target.value }));
  };

  const onPasswordChange = (event) => {
    setUser((user) => ({ ...user, password: event.target.value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const { isValid } = validate(user);

    if (!isValid) {
      snackbar({ severity: 'error', message: 'Form validation failed' });
      return;
    }

    login(user)
      .then(({ user }) => {
        if (!user.emailVerified) {
          snackbar({ severity: 'error', message: 'Email not verified' });

          return dialog({
            title: 'Verify your email',
            description: [
              <>
                We have sent a verification link to{' '}
                <strong>{user.email}</strong>.
              </>,
              <>Click on the link to complete the verification process.</>,
              <>
                <em>You might need to check your spam folder.</em>
              </>
            ],
            actions: [
              { type: 'cancel', label: 'Cancel' },
              { type: 'confirm', label: 'Resend email verification' }
            ]
          }).then(() => {
            return resendEmailVerification(user).then(() => {
              snackbar({ message: `Verification email sent to ${user.email}` });
            });
          }, ignoreDialogCancellationError);
        }

        snackbar({ message: 'Access granted' });
        navigate('/');
      })
      .catch((err) => {
        snackbar({ severity: 'error', message: err.message });
      });
  };

  return (
    <div className="Login">
      <article className="page-container">
        <div className="card">
          <div className="card-header">
            <h1>Log in</h1>
          </div>

          <form
            noValidate
            className={clsx('form', { error: form && !form.isValid })}
            onSubmit={onSubmit}
          >
            <div className="field">
              <p className="label">Email</p>

              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Email"
                value={user.email}
                onChange={onEmailChange}
              />

              {form?.errors.email.required && (
                <p role="alert" className="helper">
                  Email is required
                </p>
              )}

              {form?.errors.email.email && (
                <p role="alert" className="helper">
                  Invalid email format
                </p>
              )}
            </div>

            <div className="password field">
              <div className="label">
                <p>Password</p>

                <Link to="/reset-password" className="forgot-password">
                  Forgot password?
                </Link>
              </div>

              <InputPassword
                name="password"
                autoComplete="current-password"
                placeholder="Password"
                value={user.password}
                onChange={onPasswordChange}
              />

              {form?.errors.password.required && (
                <p role="alert" className="helper">
                  Password is required
                </p>
              )}

              {form?.errors.password.minLength && (
                <p role="alert" className="helper">
                  Password should be at least 6 characters
                </p>
              )}
            </div>

            <div className="actions">
              <button type="submit" className="button large blue">
                Log in
              </button>
            </div>
          </form>

          <div className="footer">
            {`Don't have an account?`} <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </article>
    </div>
  );
}
