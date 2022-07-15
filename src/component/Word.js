import React, { useEffect, useRef } from 'react'

function Word(props) {
  const { text, active, correct } = props

  if (correct === true) {
    return <span className='correct'>{text} </span>
  }

  if (correct === false) {
    return <span className='incorrect'>{text} </span>
  }

  if (active) {
    return <span className='active'>{text} </span>
  }
  return <span>{text} </span>
}

Word = React.memo(Word)

export default Word
