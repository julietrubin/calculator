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

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {equation: [], output: ""};
  }

  handleClick(value) {
    let equation = this.state.equation;
    if (value === DOT || value === PLUS_MINUS|| isADigit(value)) {
      // the first valid button click since clearing
      let num;
      if (equation.length === 0) {
        num = computeNumber("", value);
        equation = [num];
      } else {
        const currentNum = equation.slice(-1)[0];
        // the last button clicked was not involved in creating a number
        if (isNaN(currentNum)) {
          num = computeNumber("", value)
          equation.push(num);
        } else {
          num = computeNumber(currentNum, value)
          equation.pop()
          equation.push(num);
        }
      }
      this.setState({ equation, output: num });
      //console.log("Number click " + value + " equation " + equation.join(" "))
    } else if (value === CLEAR) {
      this.setState({ equation: [], output: "" });

    } else if (value === PLUS_MINUS) {
    } else if (value === MINUS) {
    } else if (value === PLUS) {
    } else if (value === EQUALS) {
    } else if (value === DIVID) {
    } else if (value === REMAINDER) {
    } else if (value === MULTIPLY) {
    } else {
      console.log("clicked " + value);
    }
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
