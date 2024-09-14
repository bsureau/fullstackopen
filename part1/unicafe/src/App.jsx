import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


const Title = ({ title }) => <h2>{title}</h2>
const Button = ({ eventHandler, text }) => <button onClick={eventHandler}>{text}</button>
const Stat = ({ text, stat }) => <p>{text} {stat}</p>

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
      <Stat text='Good' stat={good} />
      <Stat text='Neutral' stat={neutral} />
      <Stat text='Bad' stat={bad} />
    </>
  )
}

export default App
