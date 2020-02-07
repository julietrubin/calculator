import React from "react"
import PropTypes from "prop-types"

import classNames from 'classnames';
import styles from "./calculator.module.css"


const Button = (props) => (
  <div className={classNames({[styles.button]: true, [styles.wide_button]: props.wide_button})}>{props.value} </div>
  // <div className={classNames({[styles.button]: true})}>{props.value} </div>

)

Button.propTypes = {
  value: PropTypes.string.isRequired,
}

export default Button
