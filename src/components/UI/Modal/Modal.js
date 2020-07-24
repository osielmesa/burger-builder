import React, {memo} from 'react';
import PropTypes from 'prop-types'

import classes from './Modal.module.css'
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import Backdrop from '../Backdrop/Backdrop'

const modal = (props) => {
  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.modalClosed}/>
      <div className={classes.Modal} style={{transform: props.show ? 'translateY(0)' : "translateY(-100vh)", opacity:props.show ? '1' : '0'}}>
        {props.children}
      </div>
    </Aux>
  );
}

modal.propTypes = {
  show: PropTypes.bool.isRequired,
  modalClosed: PropTypes.func.isRequired
}

const areEqual = (prevProps, nextProps) => {
  return prevProps.show === nextProps.show
}

export default memo(modal, areEqual);
