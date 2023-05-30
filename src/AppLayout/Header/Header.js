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
  ListSubheader,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import DashboardIcon from '@mui/icons-material/Dashboard';
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
        <h1>Trivial Puessi</h1>
      </div>

      <div className="nav">
        <Link to="home" className="link">
          Home
        </Link>

        <Link to="quiz" className="link">
          Quiz
        </Link>

        {user?.role === 'admin' && (
          <Link to="admin" className="link">
            Admin
          </Link>
        )}
      </div>

      <div className="session">
        {!user && (
          <Link to="login" className="link">
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
            <ListItemButton component={Link} to="quiz" onClick={closeAppMenu}>
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary="Quiz" />
            </ListItemButton>
          </ListItem>
        </List>

        {user?.role === 'admin' && (
          <List subheader={<ListSubheader>Admin</ListSubheader>}>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="admin"
                onClick={closeAppMenu}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="admin/questions"
                onClick={closeAppMenu}
              >
                <ListItemIcon>
                  <QuizIcon />
                </ListItemIcon>
                <ListItemText primary="Questions" />
              </ListItemButton>
            </ListItem>
          </List>
        )}
      </Drawer>
    </div>
  );
}

export default Header;
