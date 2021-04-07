import React, { useContext } from 'react';
import AlertContext from '../../contexts/alert/alertContext';

const Alert = () => {
  const alertContext = useContext(AlertContext);
  const { alert } = alertContext;
  return (
    alert && (
      <div className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle" />
        {alert.msg}
      </div>
    )
  );
};

export default Alert;
