import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useAuth } from 'src/firebase/auth';
import { useSnackbar } from 'src/layout/snackbar/snackbar';
import { useDialog } from 'src/layout/dialog/dialog';
import { useForm } from 'src/form/form';
import { email, required } from 'src/form/rules';

export default function ResetPassword() {
  const navigate = useNavigate();
  const { sendPasswordResetEmail } = useAuth();
  const snackbar = useSnackbar();
  const dialog = useDialog();

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
        snackbar({ message: 'Password reset email sent' });

        return dialog({
          title: 'Password reset email sent',
          description: [
            'Check your email for a link to reset your password. If it doesn’t',
            'appear within a few minutes, check your spam folder.'
          ].join(' '),
          actions: [{ type: 'confirm', label: 'Return to login' }]
        }).catch(() => {});
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
