import { useState } from 'react'
// Refactor your application so that displaying the statistics is extracted into its own Statistics component.
const Statistics = (props) => {
  // destructure the values for less typing
  const { good, neutral, bad } = props
  const all = good + neutral + bad
  const average = (good - bad) / all // same as before just written better
  const positive = (good / all) * 100 + "%"
  return (    
    <table>
      <tbody>
        <StatisticLine text="good"     value = {good}     />
        <StatisticLine text="neutral"  value = {neutral}  />
        <StatisticLine text="bad"      value = {bad}      />
        <StatisticLine text="all"      value = {all}      />
        <StatisticLine text="average"  value = {average}  />
        <StatisticLine text="positive" value = {positive} />
      </tbody>
    </table>
  )
}
// Displaying a single statistics eg. the average score
const StatisticLine = ({text, value}) => {
  return (
    // HTML table
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}
// Defining the buttons used for submitting feedback
const Button = ({handleClick, text}) => {
  return <button onClick={handleClick}>{text}</button>
}
// The state of the application remains in the App root component.
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  // tracking previously selected anecdote
  const [previousSelected, setPreviousSelected] = useState(null)
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  // new state to keep track if feedback is submitted
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  // good click
  const handleGoodClick = () => {
    setGood(good + 1)
    setFeedbackSubmitted(true)
  }
  // neutral click
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setFeedbackSubmitted(true)
  }
  // bad click
  const handleBadClick = () => {
    setBad(bad + 1)
    setFeedbackSubmitted(true)
  }
  // choosing a random anecdote
  const handleAnecdote = () => {
    let i = Math.floor(Math.random() * anecdotes.length)
    while (i == previousSelected) {
      i = Math.floor(Math.random() * anecdotes.length)
    }
    // making it so next anecdote is always a different anecdote
    setPreviousSelected(i)
    setSelected(i)
  }
  return (
    <div>
      {anecdotes[selected]}
      <br />
      <Button handleClick={handleAnecdote} text="next anecdote"/>
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