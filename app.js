import express from 'express';
import morgan from 'morgan';
import { list, find } from './postBank.js';
import timeAgo from 'node-time-ago';
import postDetails from './postDetails.js';
import postList from './postList.js';
import html from 'html-template-tag'

const app = express();
app.use(morgan('dev'));
app.use(express.static('public'))

app.get("/", (req, res) => {
  const posts = list();
  res.send(
    postList(posts)
  )
});

app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = find(id);

  if (!post.id) {
    throw new Error('Not Found');
  } else {
    res.status(200).send(
      postDetails(post)
    )
  }

})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(404).send(`
  <!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <header><img src="/logo.png"/>Wizard News</header>
    <div class="not-found">
      <p>404: Page Not Found</p>
    </div>
  </body>
  </html>
  `)
})


const { PORT = 1337 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
