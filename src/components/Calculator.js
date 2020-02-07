import React from "react"

import Button from "./Button"

import styles from "./calculator.module.css"


const Calculator = () => (
  <div className={styles.container}> 
    <div className={styles.calculator}> 
        <div className={styles.output_container}><div className={styles.output_text}>$1,000</div></div>
        <Button value="C"></Button>
        <Button value="+/="></Button>
        <Button value="%"></Button>
        <Button value="÷"></Button>

        <Button value="7"></Button>
        <Button value="8"></Button>
        <Button value="9"></Button>
        <Button value="x"></Button>

        <Button value="4"></Button>
        <Button value="5"></Button>
        <Button value="6"></Button>
        <Button value="-"></Button>


        <Button value="1"></Button>
        <Button value="2"></Button>
        <Button value="3"></Button>
        <Button value="+"></Button>


        <Button wide_button={true} value="0"></Button>
        <Button value="."></Button>
        <Button value="="></Button>

    </div>
  </div>
)

export default Calculator
