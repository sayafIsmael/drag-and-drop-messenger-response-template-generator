import { combineReducers } from 'redux';
import TemplateReducer from './TemplateReducer';

export default combineReducers({
  data: TemplateReducer,
});