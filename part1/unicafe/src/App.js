import { useState } from 'react'


const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

const StatisticLine = (props) => {return (
  <tr>
    <td>{props.text} {props.value}</td>
  </tr>
)}


const Statistics = (props) => {

  
  if(props.good === 0 && props.neutral === 0 && props.bad === 0){
    
    return <p>No feedback given</p>
    
  }

  const all = props.good + props.neutral + props.bad;
  const average = (props.good - props.bad) / all;
  const positive = props.good / all;
  

  return(
    <table>
      <tbody>
        <StatisticLine text="good" value = {props.good}/>
        <StatisticLine text="neutral" value = {props.neutral}/>
        <StatisticLine text="bad" value = {props.bad}/>
        <StatisticLine text="all" value = {all}/>
        <StatisticLine text="average" value = {average*100}/>
        <StatisticLine text="positive" value = {positive*100 + " %"}/>
      </tbody>
    </table>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good+1);
  }
  const handleNeutral = () => setNeutral(neutral+1);
  const handleBad = () => setBad(bad+1);

  return (
    <div>
      <h1>give feedback</h1>

      <Button text="good" onClick = {handleGood}/>
      <Button text="neutral" onClick = {handleNeutral}/>
      <Button text="bad" onClick = {handleBad}/>

      <h1>statistics</h1>

      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

export default App