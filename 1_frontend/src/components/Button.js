import React from 'react';
import style from '../styles/Button.module.css';

const Button = ({ text, action }) => {
  return (
    <button className={style.button} onClick={action}>
      {text}
    </button>
  );
};

export default Button;
