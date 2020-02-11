import React from "react"

import styles from "./calculator.module.css"
import Button from "./Button"

const CLEAR = "C";
const PLUS_MINUS = "+/-";
const MINUS = "-";
const PLUS = "+";
const EQUALS = "=";
const DIVID = "÷";
const REMAINDER = "%";
const MULTIPLY = "x";
const DOT = ".";

/*
TODO: make sure output displays when it should
*/

const isADigit = (value) => {
  return (value >= '0' && value <= '9');
};

/*
Takes the current number being typed and modifies it based on new button click
Returns a string

examples : 
  computeNumber("12", "3") => "123"
  computerNumber("12", PLUS_MINUS) => "-12"
  computerNumber("12", PLUS_MINUS) => "12"
  computerNumber("12", ".") => "12."
*/
const computeNumber = (currentNum, buttonValue) => {
  if (buttonValue === PLUS_MINUS) {
    if (currentNum.length === 0) {
       return "-0";
    } else if (currentNum.length > 0 && currentNum[0] === "-") {
      // turns negative number into a positive one
      return currentNum.substr(1);
    } else {
      // turns positive number into negative one
      return "-" + currentNum;
    }
  }

  if (buttonValue === DOT) {
    if (currentNum.length === 0) { 
      return "0.";
    } else if (currentNum.indexOf(DOT) !== -1) { // validation check
      // there is already a dot so do nothing
      return currentNum;
    } else {
      return currentNum + ".";
    }
  }

  // the leading zero is not needed anymore
  if (currentNum === "-0") {
    return "-" + buttonValue;
  } else if (currentNum === "0") {
    return buttonValue;
  }

  // add digit to number
  return currentNum + buttonValue;
}

const computeEquation = (num1, num2, operator) => {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);

  if (operator === MINUS) {
    return (num1 - num2).toString();
  } else if (operator === PLUS) {
    return (num1 + num2).toString();
  } else if (operator === DIVID) {
    return (num1 / num2).toString();
  } else if (operator === REMAINDER) {
    return (num1 % num2).toString();
  } else if (operator === MULTIPLY) {
    return (num1 * num2).toString();
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    // freezeNumber: prevents adding digits to the end of a computed number. 
    this.state = {num1: "", num2: "", operator: "", output: "", freezeNumber: false};
  }

  isOperatorClick(value) {
    return [MINUS, PLUS, DIVID, REMAINDER, MULTIPLY].includes(value);
  }

  isNumberClicked(value) {
    return value === DOT || value === PLUS_MINUS || isADigit(value);
  }

  shouldHighlightOperator(value) {
    return this.state.operator === value && this.state.num2 === "";
  }

  handleClick(value) {
    let num1 = this.state.num1;
    let num2 = this.state.num2; 
    let output = "";
    let operator = this.state.operator;
    let freezeNumber = false;

    if (this.isNumberClicked(value)) {
      if (this.state.freezeNumber && (value === DOT || isADigit(value))) {
        // do not add digits or decimal to a frozenNumber
        num1 = "";
      }

      if (num2 !== "" || operator) {
        // the second number in the equation is being typed
        output = computeNumber(num2, value);
        num2 = output;
      } else {
        // the first number in the equation is being typed
        output = computeNumber(num1, value);
        num1 = output;
      }
    } else if (value === CLEAR) {
      num1 = "";
      num2 = "";
      operator = "";
    } else if (this.isOperatorClick(value)) {
      if (num1 !== "") {
        if (num2 !== "") {
          // compute as we go
          output = computeEquation(num1, num2, operator);
          num1 = output;
          num2 = "";
        } else {
          output = num1; 
        }
        operator = value;
      }

    } else if (value === EQUALS) {
        // validation check
        // we need something to compute
        if (num1 !== "" && num2 !== "" && operator !== "") {
          output = computeEquation(num1, num2, operator);
          freezeNumber = true;
          num1 = output;
          num2 = "";
          operator = "";
        }
    }

    console.log({ num1, operator, num2, output, freezeNumber })
    console.log()
    this.setState({ num1, num2, output, operator, freezeNumber });
  }

  render() {
    return (
      <div className={styles.calculator}> 
        <div className={styles.output_container}><div className={styles.output_text}>{this.state.output}</div></div>
        <Button onClick={this.handleClick} value={CLEAR}></Button>
        <Button onClick={this.handleClick} value={PLUS_MINUS}></Button>
        <Button onClick={this.handleClick} value={REMAINDER} 
          operator={this.state.operator === REMAINDER}></Button>
        <Button onClick={this.handleClick} 
          highlighted={this.shouldHighlightOperator(DIVID)} value={DIVID}></Button>

        <Button onClick={this.handleClick} value="7"></Button>
        <Button onClick={this.handleClick} value="8"></Button>
        <Button onClick={this.handleClick} value="9"></Button>
        <Button onClick={this.handleClick} 
        highlighted={this.shouldHighlightOperator(MULTIPLY)} value={MULTIPLY}></Button>

        <Button onClick={this.handleClick} value="4"></Button>
        <Button onClick={this.handleClick} value="5"></Button>
        <Button onClick={this.handleClick} value="6"></Button>
        <Button onClick={this.handleClick} 
          highlighted={this.shouldHighlightOperator(MINUS)} value={MINUS}></Button>

        <Button onClick={this.handleClick} value="1"></Button>
        <Button onClick={this.handleClick} value="2"></Button>
        <Button onClick={this.handleClick} value="3"></Button>
        <Button onClick={this.handleClick} 
          highlighted={this.shouldHighlightOperator(PLUS)} value={PLUS}></Button>

        <Button onClick={this.handleClick} wide={true} value="0"></Button>
        <Button onClick={this.handleClick} value={DOT}></Button>
        <Button onClick={this.handleClick} value={EQUALS}></Button>
    </div>
    );
  }
}

export default Calculator
