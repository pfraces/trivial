import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigationDrawer } from '@/layout/navigation/navigation';

export default function NavigationDrawerButton() {
  const { openNavigationDrawer } = useNavigationDrawer();

  return (
    <div className="NavigationDrawerButton">
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        onClick={openNavigationDrawer}
      >
        <MenuIcon />
      </IconButton>
    </div>
  );
}
