import React from 'react';
import PropTypes from 'prop-types'

import classes from './Button.module.css'

const button = (props) => {
  return (
    <button className={[classes.Button, classes[props.btnType]].join(' ')} onClick={props.clicked}>
      {props.children}
    </button>
  );
}

button.propTypes = {
  btnType: PropTypes.string.isRequired,
  clicked: PropTypes.func.isRequired
}

export default button;
