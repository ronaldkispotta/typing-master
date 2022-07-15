import { useState, useRef } from 'react'
import { act } from 'react-dom/test-utils'
import './App.css'
import Timer from './component/Timer'
import Word from './component/Word'

const getCloud = () =>
  `A B C D E F G H I J K L M N O P Q R S T`
    .split(' ')
    .sort(() => (Math.random() > 0.5 ? 1 : -1))

function App() {
  const [userInput, setUserInput] = useState('')
  const [activeWord, setActiveWord] = useState(0)
  const [correctWordArray, setCorrectWordArray] = useState([])
  const [startCounting, setStartCounting] = useState(false)

  const cloud = useRef(getCloud())

  function processInput(value) {
    if (!startCounting) {
      setStartCounting(true)
    }

    if (value.endsWith(' ')) {
      if (activeWord === cloud.current.length - 1) {
        setStartCounting(false)
        setUserInput('Completed')
        return
      }

      setActiveWord((index) => index + 1)
      setUserInput('')

      setCorrectWordArray((data) => {
        const word = value.trim()
        const newResult = [...data]
        newResult[activeWord] = word === cloud.current[activeWord]
        return newResult
      })
    } else {
      setUserInput(value)
    }
  }

  return (
    <div className='App'>
      <h1>Type The Alphabet</h1>
      <p>Typing game to see how fast you type. Timer starts when you do</p>
      <div className='container-content'>
        <p>
          {cloud.current.map((word, index) => {
            return (
              <Word
                text={word}
                active={index === activeWord}
                correct={correctWordArray[index]}
              />
            )
          })}
        </p>
      </div>
      <div>
        <Timer
          startCounting={startCounting}
          correctWords={correctWordArray.filter(Boolean).length}
        />
      </div>
      <div className='input'>
        <input
          type='text'
          value={userInput}
          onChange={(e) => processInput(e.target.value)}
        />
      </div>
    </div>
  )
}

export default App
