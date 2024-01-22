import { createContext, useContext, useState } from 'react';
import { isFunction } from 'lodash';

const PromptContext = createContext();

export const PromptProvider = ({ children }) => {
  const [prompt, setPrompt] = useState(null);

  return (
    <PromptContext.Provider value={{ prompt, setPrompt }}>
      {children}
    </PromptContext.Provider>
  );
};

export const usePromptContext = () => useContext(PromptContext);

export const usePrompt = () => {
  const { setPrompt } = usePromptContext();

  const defaultActions = [
    { type: 'cancel', label: 'Cancel' },
    { type: 'confirm', label: 'Confirm' }
  ];

  const prompt = ({
    severity = 'success',
    title,
    inputLabel = '',
    actions = defaultActions
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
      cancel
    });

    return promise;
  };

  return prompt;
};
