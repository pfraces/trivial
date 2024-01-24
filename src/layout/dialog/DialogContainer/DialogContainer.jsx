import { forwardRef } from 'react';
import { map } from 'lodash';
import clsx from 'clsx';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDialogContext } from 'src/layout/dialog/dialog';
import './DialogContainer.css';

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

Transition.displayName = 'Transition';

export const DialogContainer = () => {
  const { dialog, setDialog } = useDialogContext();
  const paragraphs = dialog ? [].concat(dialog.description) : [];

  const closeDialog = () => {
    setDialog(null);
  };

  const confirm = () => {
    closeDialog();
    dialog.confirm();
  };

  const cancel = (reason) => {
    closeDialog();
    dialog.cancel(reason);
  };

  const actionClickHandler = (type) => () => {
    if (type === 'confirm') {
      confirm();
      return;
    }

    if (type === 'cancel') {
      cancel('cancelButtonClick');
      return;
    }

    cancel('unknownActionType');
  };

  return (
    <Dialog
      className="DialogContainer"
      fullWidth
      TransitionComponent={Transition}
      open={Boolean(dialog)}
      onClose={(event, reason) => {
        cancel(reason);
      }}
    >
      <DialogTitle>
        {dialog?.title}

        <IconButton
          className="close-dialog-button"
          onClick={() => {
            cancel('closeButtonClick');
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {paragraphs.map((paragraph, index) => (
          <DialogContentText key={index} gutterBottom>
            {paragraph}
          </DialogContentText>
        ))}
      </DialogContent>

      <DialogActions>
        {map(dialog?.actions || [], ({ type, label }) => {
          return (
            <button
              key={label}
              type="button"
              className={clsx(
                'button large',
                type === 'confirm' && {
                  blue: dialog?.severity === 'success',
                  red: dialog?.severity === 'error'
                }
              )}
              autoFocus={type === 'confirm'}
              onClick={actionClickHandler(type)}
            >
              {label}
            </button>
          );
        })}
      </DialogActions>
    </Dialog>
  );
};
