const isDefined = (value) => value != null && value !== '';

export const required = () => (value) => ({
  name: 'required',
  isValid: isDefined(value),
});

export const createRule = (name, validator) => {
  return (...args) => {
    const validate = validator(...args);

    return (value) => ({
      name,
      isValid: !isDefined(value) || validate(value),
    });
  };
};

export const min = createRule('min', (limit) => (value) => value >= limit);

export const max = createRule('max', (limit) => (value) => value <= limit);

export const minLength = createRule(
  'minLength',
  (limit) => (value) => value.length >= limit
);

export const maxLength = createRule(
  'maxLength',
  (limit) => (value) => value.length <= limit
);
