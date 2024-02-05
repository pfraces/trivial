import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useAuth } from '@/firebase/auth.jsx';
import { useSnackbar } from '@/layout/snackbar/snackbar.jsx';
import { useDialog } from '@/layout/dialog/dialog.jsx';
import { useForm } from '@/form/form.js';
import { email, required } from '@/form/rules.js';

export default function ResetPassword() {
  const navigate = useNavigate();
  const { sendPasswordResetEmail } = useAuth();
  const snackbar = useSnackbar();
  const dialog = useDialog();
  const ignoreDialogCancellationError = () => {};

  const { form, validate } = useForm([required(), email()]);
  const [userEmail, setUserEmail] = useState('');

  const onEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const { isValid } = validate(userEmail);

    if (!isValid) {
      snackbar({ severity: 'error', message: 'Form validation failed' });
      return;
    }

    sendPasswordResetEmail(userEmail)
      .then(() => {
        snackbar({ message: `Password reset email sent to ${userEmail}` });

        return dialog({
          title: 'Reset your password',
          description: [
            <>
              We have sent a link to reset your password to{' '}
              <strong>{userEmail}</strong>.
            </>,
            <>
              <em>You might need to check your spam folder.</em>
            </>
          ],
          actions: [{ type: 'confirm', label: 'Return to login' }]
        }).catch(ignoreDialogCancellationError);
      })
      .then(() => {
        navigate('/login');
      })
      .catch((err) => {
        snackbar({ severity: 'error', message: err.message });
      });
  };

  return (
    <div className="ResetPassword">
      <article className="page-container">
        <div className="card">
          <div className="card-header">
            <h1>Reset Password</h1>
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
                value={userEmail}
                onChange={onEmailChange}
              />

              {form?.errors.required && (
                <p role="alert" className="helper">
                  Email is required
                </p>
              )}

              {form?.errors.email && (
                <p role="alert" className="helper">
                  Invalid email format
                </p>
              )}
            </div>

            <div className="actions">
              <button type="submit" className="button large blue">
                Send password reset email
              </button>
            </div>
          </form>
        </div>
      </article>
    </div>
  );
}
