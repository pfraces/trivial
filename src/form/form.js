/**
 * `schema` can be:
 *
 * - a rule (i.e. `required()`)
 * - a ruleset (i.e. `[required(), min(3)]`)
 * - a rulemap (i.e. `{ label: required() }`)
 *
 * Ruleset values must be rules
 *
 * Rulemap values can be rules, rulesets, or rulemaps
 *
 * Valid data must pass schema validation. Non-validated data is considered
 * valid.
 */

import { useState } from 'react';
import { map, reduce, every } from 'lodash';

const isFunction = (value) => typeof value === 'function';
const isArray = Array.isArray;

const validateValue = (schema, value) => {
  if (isArray(value)) {
    const validations = map(value, (item) => validateValue(schema, item));
    const isValid = every(validations, ({ isValid }) => isValid);
    const errors = map(validations, ({ errors }) => errors);
    return { isValid, errors };
  }

  if (isFunction(schema)) {
    const rule = schema;
    const { name, isValid } = rule(value);
    return { isValid, errors: { [name]: !isValid } };
  }

  if (isArray(schema)) {
    return reduce(
      schema,
      (acc, rule) => {
        const { name, isValid } = rule(value);

        return {
          isValid: acc.isValid && isValid,
          errors: { ...acc.errors, [name]: !isValid }
        };
      },
      { isValid: true, errors: null }
    );
  }

  return reduce(
    schema,
    (acc, node, key) => {
      const { isValid, errors } = validateValue(node, value && value[key]);

      return {
        isValid: acc.isValid && isValid,
        errors: { ...acc.errors, [key]: errors }
      };
    },
    { isValid: true, errors: null }
  );
};

const createValidator = (schema) => (data) => validateValue(schema, data);

export const useForm = (schema) => {
  const [form, setForm] = useState(null);
  const validateData = createValidator(schema);

  const validate = (data) => {
    const validation = validateData(data);
    setForm(validation);
    return validation;
  };

  const reset = () => {
    setForm(null);
  };

  return { form, validate, reset };
};
