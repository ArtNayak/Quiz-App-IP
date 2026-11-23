import { useState } from 'react'
import questions from './questions.js'

export default function App() {
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [picked, setPicked] = useState(null)
  const done = index >= questions.length

  const restart = () => {
    setIndex(0)
    setScore(0)
    setPicked(null)
  }

  if (done) {
    return (
      <main className="card">
        <h1>Quiz complete</h1>
        <p className="score">You scored {score} / {questions.length}</p>
        <button onClick={restart}>Restart</button>
      </main>
    )
  }

  const { q, options, answer } = questions[index]

  const choose = (i) => {
    if (picked !== null) return
    setPicked(i)
    if (i === answer) setScore(score + 1)
  }

  const next = () => {
    setIndex(index + 1)
    setPicked(null)
  }

  return (
    <main className="card">
      <p className="progress">Question {index + 1} of {questions.length}</p>
      <h1>{q}</h1>
      <div className="options">
        {options.map((o, i) => {
          let cls = ''
          if (picked !== null) cls = i === answer ? 'correct' : i === picked ? 'wrong' : ''
          return (
            <button key={o} className={cls} disabled={picked !== null} onClick={() => choose(i)}>
              {o}
            </button>
          )
        })}
      </div>
      <button className="next" disabled={picked === null} onClick={next}>
        {index === questions.length - 1 ? 'Finish' : 'Next'}
      </button>
    </main>
  )
}
