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
    // freezeNumber: prevents adding digits to a computed number. 
    // highlighted: highlights the current operator button
    this.state = {equation: [], output: "", highlighted: "", freezeNumber: false};
  }

  handleClick(value) {
    let equation = this.state.equation;
    let output = this.state.output;
    let highlighted = "";
    let freezeNumber = false;

    if (value === DOT || value === PLUS_MINUS || isADigit(value)) {
      if (this.state.freezeNumber && (value === DOT || isADigit(value))) {
        // reset the current number because we don't want to add digits to a computed number
        equation = [];
      }
      // the first valid button click since clearing
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
    } else if ([MINUS, PLUS, DIVID, REMAINDER, MULTIPLY].includes(value)) {
      if (equation.length > 0) {
        const currentOperator = equation.slice(-1)[0];
        if ([MINUS, PLUS, DIVID, REMAINDER, MULTIPLY].includes(currentOperator)) {
          // replace the currentOperator with new one
          equation.pop();
          equation.push(value);
        } else if (equation.length >= 3) {
          // compute as we go
          output = computeEquation(equation);
          equation = [output, value];
          freezeNumber = true;
        } else {
          equation.push(value);
        }
        highlighted = value;
      }
    } else if (value === EQUALS) {
      // validation check
      // we something to compute
      if (equation.length >= 3) {
        output = computeEquation(equation);
        equation = [output];
        freezeNumber = true;
      }
    }
    console.log(equation.join(" "));
    this.setState({ equation, output, highlighted, freezeNumber });
  }

  render() {
    return (
      <div className={styles.calculator}> 
        <div className={styles.output_container}><div className={styles.output_text}>{this.state.output}</div></div>
        <Button onClick={this.handleClick} value={CLEAR}></Button>
        <Button onClick={this.handleClick} value={PLUS_MINUS}></Button>
        <Button onClick={this.handleClick} value={REMAINDER} 
          highlighted={this.state.highlighted === REMAINDER}></Button>
        <Button onClick={this.handleClick} 
          highlighted={this.state.highlighted === DIVID} value={DIVID}></Button>

        <Button onClick={this.handleClick} value="7"></Button>
        <Button onClick={this.handleClick} value="8"></Button>
        <Button onClick={this.handleClick} value="9"></Button>
        <Button onClick={this.handleClick} 
        highlighted={this.state.highlighted === MULTIPLY} value={MULTIPLY}></Button>

        <Button onClick={this.handleClick} value="4"></Button>
        <Button onClick={this.handleClick} value="5"></Button>
        <Button onClick={this.handleClick} value="6"></Button>
        <Button onClick={this.handleClick} 
          highlighted={this.state.highlighted === MINUS} value={MINUS}></Button>

        <Button onClick={this.handleClick} value="1"></Button>
        <Button onClick={this.handleClick} value="2"></Button>
        <Button onClick={this.handleClick} value="3"></Button>
        <Button onClick={this.handleClick} 
          highlighted={this.state.highlighted === PLUS} value={PLUS}></Button>

        <Button onClick={this.handleClick} wide={true} value="0"></Button>
        <Button onClick={this.handleClick} value={DOT}></Button>
        <Button onClick={this.handleClick} value={EQUALS}></Button>
    </div>
    );
  }
}

export default Calculator
