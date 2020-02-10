import React from "react"
import PropTypes from "prop-types"

import classNames from 'classnames';
import styles from "./calculator.module.css"

// TODO: debounce

const Button = ({value, wide, highlighted, onClick}) => (
  <button onClick={() => onClick(value)}
    className={classNames({[styles.button]: true, [styles.wide_button]: wide, [styles.highlighted_button]: highlighted})}>{value}</button>
)

Button.propTypes = {
  value: PropTypes.string.isRequired,
}

export default Button
