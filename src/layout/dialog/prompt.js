import { createContext, forwardRef, useContext, useState } from 'react';
import { isFunction, map } from 'lodash';
import clsx from 'clsx';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'src/form/form';
import { required } from 'src/form/rules';
import { useSnackbar } from 'src/layout/snackbar/snackbar';

const PromptContext = createContext({});

export const PromptProvider = ({ children }) => {
  const [prompt, setPrompt] = useState(null);

  return (
    <PromptContext.Provider value={{ prompt, setPrompt }}>
      {children}
    </PromptContext.Provider>
  );
};

export const usePrompt = () => {
  const { setPrompt } = useContext(PromptContext);

  const defaultActions = [
    { type: 'cancel', label: 'Cancel' },
    { type: 'confirm', label: 'Confirm' },
  ];

  const prompt = ({
    severity = 'success',
    title,
    inputLabel = '',
    actions = defaultActions,
  }) => {
    let resolvePromiseInProgress = null;
    let rejectPromiseInProgress = null;

    const confirm = (message) => {
      if (isFunction(resolvePromiseInProgress)) {
        resolvePromiseInProgress(message);
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

    setPrompt({
      severity,
      title,
      inputLabel,
      actions,
      confirm,
      cancel,
    });

    return promise;
  };

  return prompt;
};

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const PromptContainer = () => {
  const { prompt, setPrompt } = useContext(PromptContext);
  const snackbar = useSnackbar();
  const { form, validate, reset } = useForm(required());
  const [inputValue, setInputValue] = useState('');

  const onInputValueChange = (event) => {
    setInputValue(event.target.value);
  };

  const closePrompt = () => {
    setPrompt(null);
    setInputValue('');
    reset();
  };

  const confirm = () => {
    const { isValid } = validate(inputValue);

    if (!isValid) {
      snackbar({ severity: 'error', message: 'Form validation failed' });
      return;
    }

    closePrompt();
    prompt.confirm(inputValue);
  };

  const cancel = (reason) => {
    closePrompt();
    prompt.cancel(reason);
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

  const onSubmit = (event) => {
    event.preventDefault();
    confirm();
  };

  // TODO: Replace `sx` prop with CSS

  return (
    <Dialog
      className="PromptContainer"
      fullWidth
      disableRestoreFocus
      TransitionComponent={Transition}
      open={Boolean(prompt)}
      onClose={(event, reason) => {
        cancel(reason);
      }}
    >
      <DialogTitle>
        {prompt?.title}

        <IconButton
          onClick={() => {
            cancel('closeButtonClick');
          }}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <form noValidate className="form" onSubmit={onSubmit}>
          <div className={clsx('field', { error: form?.errors.required })}>
            {prompt?.inputLabel && (
              <p className="label">{prompt?.inputLabel}</p>
            )}

            <input
              type="text"
              placeholder={prompt?.inputLabel}
              value={inputValue}
              onChange={onInputValueChange}
              autoFocus
            />

            {form?.errors.required && (
              <p role="alert" className="helper">
                {prompt?.inputLabel} is required
              </p>
            )}
          </div>
        </form>
      </DialogContent>

      <DialogActions>
        {map(prompt?.actions || [], ({ type, label }) => {
          return (
            <button
              key={label}
              type="button"
              className={clsx(
                'button large',
                type === 'confirm' && {
                  blue: prompt?.severity === 'success',
                  red: prompt?.severity === 'error',
                }
              )}
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
