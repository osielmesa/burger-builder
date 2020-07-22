import React from 'react';
import PropTypes from 'prop-types'

import classes from './BuildControls.module.css'
import BuilControl from './BuildControl/BuildControl'

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'},
];

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
      {controls.map(control => (
        <BuilControl
          key={control.label}
          label={control.label}
          added = {() => props.ingredientAdded(control.type)}
          removed = {() => props.ingredienRemoved(control.type)}
          disabled = {props.disabled[control.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}
      >ORDER NOW</button>
    </div>
  );
}

buildControls.propTypes = {
  ingredientAdded: PropTypes.func.isRequired,
  ingredienRemoved: PropTypes.func.isRequired,
  disabled: PropTypes.object.isRequired,
  price: PropTypes.number.isRequired,
  purchasable: PropTypes.bool.isRequired,
  ordered: PropTypes.func.isRequired
}

export default buildControls;
