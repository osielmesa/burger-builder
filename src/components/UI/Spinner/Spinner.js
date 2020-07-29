import React from "react";
import classes from './Spinner.module.css'

const spinner = () => {
  return (
      <div className={classes.Loader}>Loading...</div>
  )
}

spinner.propTypes = {

}

export default spinner