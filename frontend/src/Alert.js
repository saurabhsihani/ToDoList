import React, { useEffect } from 'react'

const Alert = ({alertClass, message, removeAlert, list}) => {
  useEffect(() => {
    let timer = setTimeout(() => {
      removeAlert();
    }, 3000);

    return () => clearTimeout(timer);
  }, [list, removeAlert]);

  return (
    <p className={"alert " + alertClass}>{message}</p>
  );
}

export default Alert
