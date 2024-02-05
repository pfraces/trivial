import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '@/firebase/auth.jsx';
import './SessionWidget.css';

export default function SessionWidget() {
  const [sessionMenuAnchor, setSessionMenuAnchor] = useState(null);
  const navigate = useNavigate();
  const { loading, user, logout } = useAuth();

  const onSessionMenuOpen = (event) => {
    setSessionMenuAnchor(event.currentTarget);
  };

  const closeSessionMenu = () => {
    setSessionMenuAnchor(null);
  };

  const onProfile = () => {
    navigate('profile');
    closeSessionMenu();
  };

  const onLogout = () => {
    closeSessionMenu();
    logout();
  };

  if (loading) {
    return null;
  }

  return (
    <div className="SessionWidget">
      {!user && (
        <Link to="login" className="link nowrap">
          Log in
        </Link>
      )}

      {user && (
        <>
          <IconButton
            size="large"
            className="session-menu-toggler"
            onClick={onSessionMenuOpen}
            color="inherit"
          >
            <Avatar className="avatar" />
          </IconButton>

          <Menu
            anchorEl={sessionMenuAnchor}
            open={Boolean(sessionMenuAnchor)}
            onClose={closeSessionMenu}
            slotProps={{
              paper: { className: 'session-menu' }
            }}
          >
            <MenuItem onClick={onProfile}>
              <ListItemIcon>
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>

            <Divider />

            <MenuItem onClick={onLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </>
      )}
    </div>
  );
}
