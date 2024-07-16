import { useReducer } from 'react';

const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  console.log(state, action);

  switch (action.type) {
    case 'inc':
      return { ...state, count: state.count + state.step }; // Increment count by step
    case 'dec':
      return { ...state, count: state.count - state.step }; // Decrement count by step
    case 'setCount':
      return { ...state, count: action.payload }; // Set count to the value provided in payload
    case 'setStep':
      return { ...state, step: action.payload }; // Set step to the value provided in payload
    case 'reset':
      return initialState; // Reset state to initial state
    default:
      throw new Error('Unknown action');
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + count); // Add count to the date

  const dec = function () {
    dispatch({ type: 'dec' }); // Dispatch decrement action
  };

  const inc = function () {
    dispatch({ type: 'inc' }); // Dispatch increment action
  };

  const defineCount = function (e) {
    dispatch({ type: 'setCount', payload: Number(e.target.value) }); // Dispatch setCount action with value from input
  };

  const defineStep = function (e) {
    dispatch({ type: 'setStep', payload: Number(e.target.value) }); // Dispatch setStep action with value from input
  };

  const reset = function () {
    dispatch({ type: 'reset' }); // Dispatch reset action
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
