# Quiz App

A small multiple-choice quiz built with React and Vite. Pick an answer to see whether it was right, move through the questions, and get a final score with a restart option.

## Run
```
npm install
npm run dev
```
Other scripts: `npm run build`, `npm run lint`, `npm run preview`.

## Add questions
Edit `src/questions.js`. Each entry is `{ q, options, answer }`, where `answer` is the index of the correct option.
