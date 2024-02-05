import { useState } from 'react';
import clsx from 'clsx';
import { useAuth } from '@/firebase/auth.jsx';
import { useSnackbar } from '@/layout/snackbar/snackbar.jsx';
import { useForm } from '@/form/form.js';
import { minLength, required } from '@/form/rules.js';
import InputPassword from '@/components/InputPassword/InputPassword.jsx';
import { scope } from './Profile.module.css';

export default function Profile() {
  const { updatePassword } = useAuth();
  const snackbar = useSnackbar();

  const { form, validate } = useForm([required(), minLength(6)]);
  const [password, setPassword] = useState('');

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const { isValid } = validate(password);

    if (!isValid) {
      snackbar({ severity: 'error', message: 'Form validation failed' });
      return;
    }

    updatePassword(password)
      .then(() => {
        snackbar({ message: 'Password updated' });
      })
      .catch((err) => {
        snackbar({ severity: 'error', message: err.message });
      })
      .finally(() => {
        setPassword('');
      });
  };

  return (
    <div className={scope}>
      <article className="page-container">
        <div className="card">
          <div className="card-header">
            <h1>Profile</h1>
          </div>

          <form
            noValidate
            className={clsx('form', { error: form && !form.isValid })}
            onSubmit={onSubmit}
          >
            <div className="field">
              <p className="label">New password</p>

              <div className="row">
                <InputPassword
                  name="password"
                  autoComplete="new-password"
                  placeholder="New password"
                  value={password}
                  onChange={onPasswordChange}
                />

                <button type="submit" className="button update-password">
                  Update
                </button>
              </div>

              {form?.errors.required && (
                <p role="alert" className="helper">
                  Password is required
                </p>
              )}

              {form?.errors.minLength && (
                <p role="alert" className="helper">
                  Password should be at least 6 characters
                </p>
              )}
            </div>
          </form>
        </div>
      </article>
    </div>
  );
}
