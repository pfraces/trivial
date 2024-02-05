import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { scope } from './InputPassword.module.css';

export default function InputPassword(props) {
  const [type, setType] = useState('password');

  const ShowPasswordIcon =
    type === 'password' ? VisibilityIcon : VisibilityOffIcon;

  const onClick = () => {
    setType((type) => (type === 'password' ? 'text' : 'password'));
  };

  return (
    <div className={scope}>
      <input type={type} {...props} />
      <ShowPasswordIcon className="show-password-button" onClick={onClick} />
    </div>
  );
}
