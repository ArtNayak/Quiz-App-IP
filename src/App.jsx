import { useEffect, useState } from 'react'
import allQuestions from './questions.js'

const SECONDS = 15
const ALL = 'All'
const categories = [ALL, ...new Set(allQuestions.map((x) => x.cat))]
const STORE = 'quiz-best'

const loadBest = () => {
  try {
    return JSON.parse(localStorage.getItem(STORE)) || {}
  } catch {
    return {}
  }
}

export default function App() {
  const [cat, setCat] = useState(null)
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [picked, setPicked] = useState(null) // -1 = timed out
  const [left, setLeft] = useState(SECONDS)
  const [best, setBest] = useState(loadBest)
  const [fresh, setFresh] = useState(false) // last run set a new best

  const questions = cat === null ? [] : allQuestions.filter((x) => cat === ALL || x.cat === cat)
  const playing = cat !== null && index < questions.length

  useEffect(() => {
    if (!playing || picked !== null) return
    if (left <= 0) {
      setPicked(-1)
      return
    }
    const t = setTimeout(() => setLeft(left - 1), 1000)
    return () => clearTimeout(t)
  }, [playing, picked, left])

  const start = (c) => {
    setCat(c)
    setFresh(false)
    setIndex(0)
    setScore(0)
    setPicked(null)
    setLeft(SECONDS)
  }

  if (cat === null) {
    return (
      <main className="card">
        <h1>Choose a category</h1>
        <div className="options">
          {categories.map((c) => (
            <button key={c} onClick={() => start(c)}>
              {c} {best[c] !== undefined && <span className="best">best {best[c]}</span>}
            </button>
          ))}
        </div>
      </main>
    )
  }

  if (!playing) {
    const isBest = score > 0 && score === best[cat] && fresh
    return (
      <main className="card">
        <h1>Quiz complete</h1>
        <p className="score">{cat}: {score} / {questions.length}</p>
        {isBest && <p>New best score!</p>}
        <div className="options">
          <button onClick={() => start(cat)}>Play again</button>
          <button onClick={() => setCat(null)}>Change category</button>
        </div>
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
    if (index === questions.length - 1 && score > (best[cat] ?? 0)) {
      const saved = { ...best, [cat]: score }
      setBest(saved)
      setFresh(true)
      try {
        localStorage.setItem(STORE, JSON.stringify(saved))
      } catch {
        // storage unavailable; score just isn't saved
      }
    }
    setIndex(index + 1)
    setPicked(null)
    setLeft(SECONDS)
  }

  return (
    <main className="card">
      <p className="progress">
        {cat} · Question {index + 1} of {questions.length}
        <span className={left <= 5 ? 'timer low' : 'timer'}>{left}s</span>
      </p>
      <h1>{q}</h1>
      {picked === -1 && <p className="wrong-msg">Time's up!</p>}
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
