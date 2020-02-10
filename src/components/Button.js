import React from "react"
import PropTypes from "prop-types"

import classNames from 'classnames';
import styles from "./calculator.module.css"

// TODO: debounce

const Button = ({value, wide_button, onClick}) => (
  <button onClick={onClick}
    className={classNames({[styles.button]: true, [styles.wide_button]: wide_button})}>{value} </button>
)

Button.propTypes = {
  value: PropTypes.string.isRequired,
}

export default Button
