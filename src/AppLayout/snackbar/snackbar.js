import { createContext, useContext, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

const SnackbarContext = createContext({});

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState(null);

  return (
    <SnackbarContext.Provider value={{ snackbar, setSnackbar }}>
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const { setSnackbar } = useContext(SnackbarContext);
  return setSnackbar;
};

export const SnackbarContainer = () => {
  const { snackbar, setSnackbar } = useContext(SnackbarContext);

  const onSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar(null);
  };

  return (
    <div className="SnackbarContainer">
      {snackbar !== null && (
        <Snackbar
          autoHideDuration={5000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={true}
          onClose={onSnackbarClose}
        >
          <Alert
            elevation={6}
            variant="filled"
            onClose={onSnackbarClose}
            severity={snackbar.severity}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};
