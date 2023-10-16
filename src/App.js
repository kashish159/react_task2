import React, { Component } from 'react';
import './App.css';


class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      display: '0',
      currentInput: '',
      operator: null,
      prevInput: null,
      waitingForOperand: false,
    };
  }

  handleNumberClick = (number) => {
    if (this.state.waitingForOperand) {
      this.setState({
        display: number,
        currentInput: number,
        waitingForOperand: false,
      });
    } else {
      this.setState((prevState) => ({
        display: prevState.currentInput === '0' ? number : prevState.currentInput + number,
        currentInput: prevState.currentInput === '0' ? number : prevState.currentInput + number,
      }));
    }
  };

  handleOperatorClick = (operator) => {
    if (this.state.prevInput !== null) {
      this.handleEqualClick();
    }
    this.setState({
      operator,
      prevInput: this.state.currentInput,
      waitingForOperand: true,
    });
  };

  handleEqualClick = () => {
    if (this.state.prevInput !== null) {
      const { prevInput, currentInput, operator } = this.state;
      const num1 = parseFloat(prevInput);
      const num2 = parseFloat(currentInput);
      let result = 0;

      switch (operator) {
        case '+':
          result = num1 + num2;
          break;
        case '-':
          result = num1 - num2;
          break;
        case '*':
          result = num1 * num2;
          break;
        case '/':
          result = num1 / num2;
          break;
        default:
          result = num2;
      }

      this.setState({
        display: result.toString(),
        currentInput: result.toString(),
        prevInput: null,
        waitingForOperand: true,
      });
    }
  };

  handleClear = () => {
    this.setState({
      display: '0',
      currentInput: '',
      operator: null,
      prevInput: null,
      waitingForOperand: false,
    });
  };

  render() {
    return (
      <div className="calculator">
        <div className="display">{this.state.display}</div>
        <div className="buttons">
          <button onClick={() => this.handleNumberClick('7')}>7</button>
          <button onClick={() => this.handleNumberClick('8')}>8</button>
          <button onClick={() => this.handleNumberClick('9')}>9</button>
          <button onClick={() => this.handleOperatorClick('+')}>+</button>
          <button onClick={() => this.handleNumberClick('4')}>4</button>
          <button onClick={() => this.handleNumberClick('5')}>5</button>
          <button onClick={() => this.handleNumberClick('6')}>6</button>
          <button onClick={() => this.handleOperatorClick('-')}>-</button>
          <button onClick={() => this.handleNumberClick('1')}>1</button>
          <button onClick={() => this.handleNumberClick('2')}>2</button>
          <button onClick={() => this.handleNumberClick('3')}>3</button>
          <button onClick={() => this.handleOperatorClick('*')}>*</button>
          <button onClick={() => this.handleNumberClick('0')}>0</button>
          <button onClick={() => this.handleClear()}>C</button>
          <button onClick={() => this.handleEqualClick()}>=</button>
          <button onClick={() => this.handleOperatorClick('/')}>/</button>
        </div>
      </div>
    );
  }
}


export default Calculator;