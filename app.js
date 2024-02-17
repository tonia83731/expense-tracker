import express from 'express'
const app = express()

const port = 3000


app.get("/", (req, res) => {
  res.send('This is my NodeJs + Express project')
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
