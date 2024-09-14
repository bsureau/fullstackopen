import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


const Title = ({ title }) => <h2>{title}</h2>
const Button = ({ eventHandler, text }) => <button onClick={eventHandler}>{text}</button>
const dataFormat = {
  number: '',
  percent: '%'
}
const StatisticLine = ({ text, stat, format }) => <p>{text} {stat} {dataFormat[format]}</p>
const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return <p>No feedback given</p>
  } else {
    return (
      <>
        <StatisticLine text='Good' stat={good} format='number' />
        <StatisticLine text='Neutral' stat={neutral} format='number' />
        <StatisticLine text='Bad' stat={bad} format='number' />
        <StatisticLine text='All' stat={good + neutral + bad} format='number' />
        <StatisticLine text='Average' stat={(good + bad * -1) / (good + neutral + bad)} format='number' />
        <StatisticLine text='Positive' stat={good / (good + neutral + bad)} format='percent' />
      </>
    )
  }
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <>
      <Title title="give feedback" />
      <Button eventHandler={handleGoodClick} text="good" />
      <Button eventHandler={handleNeutralClick} text="neutral" />
      <Button eventHandler={handleBadClick} text="bad" />
      <Title title="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
