import { createContext, forwardRef, useContext, useState } from 'react';
import { isFunction } from 'lodash';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@mui/material';

const DialogContext = createContext({});

export const DialogProvider = ({ children }) => {
  const [dialog, setDialog] = useState(null);

  return (
    <DialogContext.Provider value={{ dialog, setDialog }}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const { setDialog } = useContext(DialogContext);

  const dialog = (settings) => {
    let resolvePromiseInProgress = null;
    let rejectPromiseInProgress = null;

    const confirm = () => {
      if (isFunction(resolvePromiseInProgress)) {
        resolvePromiseInProgress();
      }
    };

    const cancel = (reason) => {
      if (isFunction(rejectPromiseInProgress)) {
        rejectPromiseInProgress(
          new Error(`Dialog canceled (reason: ${reason})`)
        );
      }
    };

    const promise = new Promise((resolve, reject) => {
      resolvePromiseInProgress = resolve;
      rejectPromiseInProgress = reject;
    }).finally(() => {
      resolvePromiseInProgress = null;
      rejectPromiseInProgress = null;
    });

    setDialog({ ...settings, confirm, cancel });

    return promise;
  };

  return { dialog };
};

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const DialogContainer = () => {
  const { dialog, setDialog } = useContext(DialogContext);

  const closeDialog = () => {
    setDialog(null);
  };

  const cancel = (reason) => {
    closeDialog();
    dialog.cancel(reason);
  };

  const confirm = () => {
    closeDialog();
    dialog.confirm();
  };

  return (
    <div className="DialogContainer">
      <Dialog
        fullWidth
        TransitionComponent={Transition}
        open={dialog}
        onClose={(event, reason) => {
          cancel(reason);
        }}
      >
        <DialogTitle>{dialog?.title}</DialogTitle>

        <DialogContent>
          <DialogContentText>{dialog?.message}</DialogContentText>
        </DialogContent>

        <DialogActions>
          <button
            type="button"
            className="button large"
            onClick={() => {
              cancel('cancelButtonClick');
            }}
          >
            Cancel
          </button>

          <button
            type="button"
            className="button large red"
            onClick={() => {
              confirm();
            }}
            autoFocus
          >
            Confirm
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
