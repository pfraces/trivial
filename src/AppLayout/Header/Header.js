import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useAuth } from 'src/firebase/auth';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const onMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const onProfile = () => {
    navigate('profile');
    closeMenu();
  };

  const onLogout = () => {
    closeMenu();
    logout();
  };

  return (
    <div className="Header">
      <div className="title">
        <h1>Trivial Puessi</h1>
      </div>

      <div className="nav">
        <Link to="home" className="link">
          Home
        </Link>

        <Link to="quiz" className="link">
          Quiz
        </Link>

        <Link to="admin" className="link">
          Admin
        </Link>
      </div>

      <div className="session">
        {!user && (
          <Link to="login" className="link">
            Log in
          </Link>
        )}

        {user && (
          <>
            <IconButton size="large" onClick={onMenuOpen} color="inherit">
              <AccountCircle />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={closeMenu}
            >
              <MenuItem onClick={onProfile}>Profile</MenuItem>
              <MenuItem onClick={onLogout}>Logout</MenuItem>
            </Menu>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
