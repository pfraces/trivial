import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from 'src/firebase/auth';
import { useSnackbar } from 'src/AppLayout/snackbar/snackbar';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { snackbar } = useSnackbar();

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

    login(email, password)
      .then(() => {
        navigate('/home');
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
                autoComplete="current-password"
                className="form-field"
                placeholder="Password"
                value={password}
                onChange={onPasswordChange}
              />

              <div className="actions">
                <button type="submit" className="button large blue">
                  Log in
                </button>
              </div>
            </div>
          </form>

          <div className="footer">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </article>
    </div>
  );
}

export default Login;
