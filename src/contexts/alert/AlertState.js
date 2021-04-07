import { useReducer } from 'react';
import { SHOW_ALERT, REMOVE_ALERT } from '../types';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';

const AlertState = ({ children }) => {
  const [state, dispatch] = useReducer(AlertReducer, null);

  const showAlert = (msg, type) => {
    dispatch({ type: SHOW_ALERT, payload: { msg, type } });
    setTimeout(() => dispatch({ type: REMOVE_ALERT }), 3000);
  };

  return (
    <AlertContext.Provider
      value={{
        alert: state,
        showAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertState;
