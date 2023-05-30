import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from 'src/firebase/auth';
import { useSnackbar } from 'src/AppLayout/snackbar/snackbar';
import './Signup.css';

function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { notify } = useSnackbar();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    signup(email, password)
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        notify({ severity: 'error', message: err.message });
      });
  };

  return (
    <div className="Signup">
      <article className="page-container">
        <div className="card">
          <div className="card-header">
            <h1>Sign up</h1>
          </div>

          <form onSubmit={onSubmit}>
            <div className="form-fields">
              <input
                type="email"
                name="email"
                autoComplete="email"
                className="form-field"
                placeholder="Email"
                value={email}
                onChange={onEmailChange}
              />

              <input
                type="password"
                name="password"
                autoComplete="new-password"
                className="form-field"
                placeholder="Password"
                value={password}
                onChange={onPasswordChange}
              />
            </div>

            <div className="actions">
              <button type="submit" className="button large blue">
                Sign up
              </button>
            </div>
          </form>

          <div className="footer">
            Already have an account? <Link to="/login">Log in</Link>
          </div>
        </div>
      </article>
    </div>
  );
}

export default Signup;
