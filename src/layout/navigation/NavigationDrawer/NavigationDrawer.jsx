import { Link } from 'react-router-dom';
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import QuizIcon from '@mui/icons-material/Quiz';
import { useAuth } from '@/firebase/auth';
import { useNavigationDrawer } from '@/layout/navigation/navigation';
import './NavigationDrawer.css';

export default function NavigationDrawer() {
  const { user } = useAuth();
  const { navigationDrawerOpen, closeNavigationDrawer } = useNavigationDrawer();

  return (
    <Drawer
      className="NavigationDrawer"
      anchor="left"
      open={navigationDrawerOpen}
      onClose={closeNavigationDrawer}
      PaperProps={{ className: 'menu' }}
    >
      <div className="header">
        <IconButton onClick={closeNavigationDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </div>

      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/"
            onClick={closeNavigationDrawer}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="play"
            onClick={closeNavigationDrawer}
          >
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
              onClick={closeNavigationDrawer}
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
  );
}
