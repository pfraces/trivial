import simpleVars from 'postcss-simple-vars';
import presetEnv from 'postcss-preset-env';
import { variables } from './src/styles/variables.js';

export default {
  plugins: [simpleVars({ variables }), presetEnv()]
};
