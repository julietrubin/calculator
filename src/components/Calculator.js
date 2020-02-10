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

const computeEquation = (equation) => {
  let num1 = parseFloat(equation[0]);
  let num2 = parseFloat(equation[2]);
  let operator = equation[1];

  if (operator === MINUS) {
    return num1 - num2;
  } else if (operator === PLUS) {
    return num1 + num2;
  } else if (operator === DIVID) {
    return num1 / num2;
  } else if (operator === REMAINDER) {
    return num1 % num2;
  } else if (operator === MULTIPLY) {
    return num1 * num2;
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {equation: [], output: ""};
  }

  handleClick(value) {
    let equation = this.state.equation;
    let output = this.state.output;

    if (value === DOT || value === PLUS_MINUS|| isADigit(value)) {
      // the first valid button click since clearing
      let num;
      if (equation.length === 0) {
        output = computeNumber("", value);
        equation = [output];
      } else {
        const currentNum = equation.slice(-1)[0];
        // the last button clicked was not involved in creating a number
        if (isNaN(currentNum)) {
          output = computeNumber("", value)
          equation.push(output);
        } else {
          output = computeNumber(currentNum, value)
          equation.pop()
          equation.push(output);
        }
      }
    } else if (value === CLEAR) {
      equation = [];
      output = "";
    } else if ([MINUS, PLUS, DIVID, REMAINDER, MULTIPLY].includes(value)) { // TODO: this should do something when equation is ready to compute
      // validation check
      // the last value must be a number
      if (equation.length > 0 && !isNaN(equation.slice(-1)[0])) {
        if (equation.length >= 3) {
          // compute as we go
          output = computeEquation(equation);
          equation = [output, value];
        } else {
          equation.push(value);
        }
      }
    } else if (value === EQUALS) {
      // validation check
      // we something to compute
      if (equation.length >= 3) {
        output = computeEquation(equation);
        equation = [output];
      }
    }
    console.log(equation.join(" "));
    this.setState({ equation, output });
  }

  render() {
    return (
      <div className={styles.calculator}> 
        <div className={styles.output_container}><div className={styles.output_text}>{this.state.output}</div></div>
        <Button onClick={this.handleClick} value={CLEAR}></Button>
        <Button onClick={this.handleClick} value={PLUS_MINUS}></Button>
        <Button onClick={this.handleClick} value={REMAINDER}></Button>
        <Button onClick={this.handleClick} value={DIVID}></Button>

        <Button onClick={this.handleClick} value="7"></Button>
        <Button onClick={this.handleClick} value="8"></Button>
        <Button onClick={this.handleClick} value="9"></Button>
        <Button onClick={this.handleClick} value={MULTIPLY}></Button>

        <Button onClick={this.handleClick} value="4"></Button>
        <Button onClick={this.handleClick} value="5"></Button>
        <Button onClick={this.handleClick} value="6"></Button>
        <Button onClick={this.handleClick} value={MINUS}></Button>

        <Button onClick={this.handleClick} value="1"></Button>
        <Button onClick={this.handleClick} value="2"></Button>
        <Button onClick={this.handleClick} value="3"></Button>
        <Button onClick={this.handleClick} value={PLUS}></Button>

        <Button onClick={this.handleClick} wide_button={true} value="0"></Button>
        <Button onClick={this.handleClick} value={DOT}></Button>
        <Button onClick={this.handleClick} value={EQUALS}></Button>
    </div>
    );
  }
}

export default Calculator
