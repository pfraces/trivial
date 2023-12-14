import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import QuizIcon from '@mui/icons-material/Quiz';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from 'src/firebase/auth';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [appMenuOpen, setAppMenuOpen] = useState(false);
  const [accountMenuAnchor, setAccountMenuAnchor] = useState(null);

  const onAppMenuOpen = () => {
    setAppMenuOpen(true);
  };

  const closeAppMenu = () => {
    setAppMenuOpen(false);
  };

  const onAccountMenuOpen = (event) => {
    setAccountMenuAnchor(event.currentTarget);
  };

  const closeAccountMenu = () => {
    setAccountMenuAnchor(null);
  };

  const onProfile = () => {
    navigate('profile');
    closeAccountMenu();
  };

  const onLogout = () => {
    closeAccountMenu();
    logout();
  };

  return (
    <div className="Header">
      <div className="app-menu-toggler">
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          onClick={onAppMenuOpen}
        >
          <MenuIcon />
        </IconButton>
      </div>

      <div className="title">
        <h1>quiz.io</h1>
      </div>

      <div className="nav">
        <Link to="home" className="link">
          Home
        </Link>

        <Link to="play" className="link">
          Play
        </Link>

        {user && (
          <Link to="create" className="link">
            Create
          </Link>
        )}
      </div>

      <div className="session">
        {!user && (
          <Link to="login" className="link nowrap">
            Log in
          </Link>
        )}

        {user && (
          <>
            <IconButton
              size="large"
              className="account-menu-toggler"
              onClick={onAccountMenuOpen}
              color="inherit"
            >
              <Avatar className="avatar" />
            </IconButton>

            <Menu
              anchorEl={accountMenuAnchor}
              open={Boolean(accountMenuAnchor)}
              onClose={closeAccountMenu}
              PaperProps={{ className: 'account-menu' }}
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

      <Drawer
        anchor="left"
        open={appMenuOpen}
        onClose={closeAppMenu}
        PaperProps={{ className: 'app-menu' }}
      >
        <div className="app-menu-header">
          <IconButton onClick={closeAppMenu}>
            <ChevronLeftIcon />
          </IconButton>
        </div>

        <Divider />

        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="home" onClick={closeAppMenu}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="play" onClick={closeAppMenu}>
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary="Play" />
            </ListItemButton>
          </ListItem>

          {user && (
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="create"
                onClick={closeAppMenu}
              >
                <ListItemIcon>
                  <QuizIcon />
                </ListItemIcon>
                <ListItemText primary="Create" />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Drawer>
    </div>
  );
}

export default Header;
