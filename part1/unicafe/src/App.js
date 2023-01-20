import { useState } from 'react'
// Refactor your application so that displaying the statistics is extracted into its own Statistics component.
const Statistics = (props) => {
  // destructure the values for less typing
  const { good, neutral, bad } = props;
  return (    
    <div>
      good {good}
      <br />
      neutral {neutral}
      <br />
      bad {bad}
      <br />
      all {good + neutral + bad}
      <br />
      average {(good + neutral * 0 + bad * -1) / (good + neutral + bad)}
      <br />
      positive {good / (good + neutral + bad) * 100} %
    </div>
  )
}
// The state of the application remains in the App root component.
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  // new state to keep track if feedback is submitted
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  // good click
  const handleGoodClick = () => {
    setGood(good + 1)
    setFeedbackSubmitted(true);
  }
  // neutral click
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setFeedbackSubmitted(true);
  }
  // bad click
  const handleBadClick = () => {
    setBad(bad + 1)
    setFeedbackSubmitted(true);
  }
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <h1>statistics</h1>
      {feedbackSubmitted ? <Statistics good={good} neutral={neutral} bad={bad}/> : <div>No feedback given</div>}
    </div>
    //TODO: continue from part 1.10 next time
  )
}

export default App