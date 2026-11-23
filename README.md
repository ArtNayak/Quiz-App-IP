# Quiz App

A multiple-choice quiz built with React and Vite. Pick a category (HTML & CSS, JavaScript, React or All), answer within 15 seconds per question, and get a final score. Your best score per category is saved in the browser (localStorage).

## Run
```
npm install
npm run dev
```
Other scripts: `npm run build`, `npm run lint`, `npm run preview`.

## Add questions
Edit `src/questions.js`. Each entry is `{ cat, q, options, answer }`, where `answer` is the index of the correct option.
