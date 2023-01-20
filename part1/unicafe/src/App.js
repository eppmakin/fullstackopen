import { useState } from 'react'

const App = () => {
  const header = "give feedback"
  const header2 = "statistics"
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

const Header = (props) => {
  return (
    <div>
      <h1>{props.header}</h1>
    </div>
  )
}


  return (
    <><div>
      <Header header={header} />
      <button onClick={() => setGood(good + 1)}>
        good
      </button>
      <button onClick={() => setNeutral(neutral + 1)}>
        neutral
      </button>
      <button onClick={() => setBad(bad + 1)}>
        bad
      </button>
    </div>
    <div>
      <Header header={header2} />
      good {good}
      <br />
      neutral {neutral}
      <br />
      bad {bad}
    </div></>
  )
}


export default App