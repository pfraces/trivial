import { createContext, useContext, useState } from 'react';
import { isFunction } from 'lodash';

const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
  const [dialog, setDialog] = useState(null);

  return (
    <DialogContext.Provider value={{ dialog, setDialog }}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialogContext = () => useContext(DialogContext);

export const useDialog = () => {
  const { setDialog } = useDialogContext();

  const defaultActions = [
    { type: 'cancel', label: 'Cancel' },
    { type: 'confirm', label: 'Confirm' },
  ];

  const dialog = ({
    severity = 'success',
    title,
    description = '',
    actions = defaultActions,
  }) => {
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

    setDialog({
      severity,
      title,
      description,
      actions,
      confirm,
      cancel,
    });

    return promise;
  };

  return dialog;
};
