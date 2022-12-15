const App = () => {
  const course = 'Half Stack application development'

  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    { 
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  const Header = (props) => {
    return (
      <div>
        <h1>{props.course}</h1>
      </div>
    )
  }

  const Part = (props) => {
    return (
      <div>
        <b>{props.part.name} - {props.part.exercises}</b>
      </div>
    )
  }

  const Content = (props) => {
    return (
      <div>
        <Part part={props.parts[0]}/>
        <Part part={props.parts[1]}/>
        <Part part={props.parts[2]}/>
      </div>
    )
  }
  
  const Total = (props) => {
    let total = 0;
    for (let i = 0; i < props.parts.length; i++) {
      total += props.parts[i].exercises
    }
    return (
      <div>
        <p>Number of exercises: {total}</p>
      </div>
    )
  }
  

  return (
    <div>
      <Header  course={course}/>
      <Content parts={parts}/>
      <Total   parts={parts}/>
    </div>
  )
}


export default App