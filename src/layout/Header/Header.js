import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import QuizIcon from '@mui/icons-material/Quiz';
import { useAuth } from 'src/firebase/auth';
import SessionWidget from 'src/layout/SessionWidget/SessionWidget';
import './Header.css';

export default function Header() {
  const { user } = useAuth();
  const [appMenuOpen, setAppMenuOpen] = useState(false);

  const onAppMenuOpen = () => {
    setAppMenuOpen(true);
  };

  const closeAppMenu = () => {
    setAppMenuOpen(false);
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
        <Link to="home">
          <h1>quiz.io</h1>
        </Link>
      </div>

      <div className="nav">
        <Link to="play" className="link">
          Play
        </Link>

        {user && (
          <Link to="create" className="link">
            Create
          </Link>
        )}
      </div>

      <div className="widgets">
        <SessionWidget />
      </div>

      <Drawer
        className="app-menu-drawer"
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
