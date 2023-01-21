import { useState } from 'react'
// Refactor your application so that displaying the statistics is extracted into its own Statistics component.
const Statistics = (props) => {
  // destructure the values for less typing
  const { good, neutral, bad } = props;
  const all = good + neutral + bad
  const average = (good - bad) / all // same as before just written better
  const positive = (good / all) * 100
  return (    
    <>
    <div>
      <StatisticLine text="good"     value = {good}     />
      <StatisticLine text="neutral"  value = {neutral}  />
      <StatisticLine text="bad"      value = {bad}      />
      <StatisticLine text="average"  value = {average}  />
      <StatisticLine text="positive" value = {positive} />
    </div>
    </>
  )
}
// Displaying a single statistics eg. the average score
const StatisticLine = ({text, value}) => {
  return (
    <div>{text} {value}</div>
  )
}
// Defining the buttons used for submitting feedback
const Button = ({handleClick, text}) => {
  return <button onClick={handleClick}>{text}</button>
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
      <Button handleClick={handleGoodClick}    text="good"   />
      <Button handleClick={handleNeutralClick} text="neutral"/>
      <Button handleClick={handleBadClick}     text="bad"    />
      <h1>statistics</h1>
      {feedbackSubmitted ? 
      <Statistics good={good} neutral={neutral} bad={bad}/>
       : 
      <div>No feedback given</div>}
    </div>
  )
}
export default App