import React, { useState, useEffect } from 'react'

function Timer(props) {
  const { correctWords, startCounting } = props
  const [timeElapsed, setTimeElapsed] = useState(0)

  useEffect(() => {
    let id
    if (startCounting) {
      id = setInterval(() => {
        setTimeElapsed((oldTime) => oldTime + 1)
      }, 1000)
    }
    return () => {
      clearInterval(id)
    }
  }, [startCounting])

  const minutes = timeElapsed / 60

  return (
    <div>
      <p>Time: {timeElapsed.toFixed(3)}</p>
      <p>Best time: {(correctWords / minutes || 0).toFixed(2)}</p>
    </div>
  )
}

export default Timer
