import { createContext, useContext, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

const SnackbarContext = createContext({});

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({ open: false });

  return (
    <SnackbarContext.Provider value={{ snackbar, setSnackbar }}>
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const { setSnackbar } = useContext(SnackbarContext);

  const notify = ({ message }) => {
    setSnackbar((snackbar) => ({
      ...snackbar,
      open: true,
      message: message,
    }));
  };

  return { notify };
};

export const SnackbarContainer = () => {
  const { snackbar, setSnackbar } = useContext(SnackbarContext);

  const onSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar((snackbar) => ({
      ...snackbar,
      open: false,
      message: null,
    }));
  };

  return (
    <div className="SnackbarContainer">
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={snackbar.open}
        onClose={onSnackbarClose}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={onSnackbarClose}
          severity="success"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};
