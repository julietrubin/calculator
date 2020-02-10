import React from "react"

import styles from "./calculator.module.css"
import Button from "./Button"


class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {equation: ""};

  }

  handleClick() {
    console.log("clicked");
  }

  render() {
    return (
      <div className={styles.calculator}> 
        <div className={styles.output_container}><div className={styles.output_text}>$1,000</div></div>
        <Button onClick={this.handleClick} value="C"></Button>
        <Button onClick={this.handleClick} value="+/="></Button>
        <Button onClick={this.handleClick} value="%"></Button>
        <Button onClick={this.handleClick} value="÷"></Button>

        <Button onClick={this.handleClick} value="7"></Button>
        <Button onClick={this.handleClick} value="8"></Button>
        <Button onClick={this.handleClick} value="9"></Button>
        <Button onClick={this.handleClick} value="x"></Button>

        <Button onClick={this.handleClick} value="4"></Button>
        <Button onClick={this.handleClick} value="5"></Button>
        <Button onClick={this.handleClick} value="6"></Button>
        <Button onClick={this.handleClick} value="-"></Button>

        <Button onClick={this.handleClick} value="1"></Button>
        <Button onClick={this.handleClick} value="2"></Button>
        <Button onClick={this.handleClick} value="3"></Button>
        <Button onClick={this.handleClick} value="+"></Button>

        <Button onClick={this.handleClick} wide_button={true} value="0"></Button>
        <Button onClick={this.handleClick} value="."></Button>
        <Button onClick={this.handleClick} value="="></Button>
    </div>
    );
  }
}

export default Calculator
