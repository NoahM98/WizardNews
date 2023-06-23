import timeAgo from 'node-time-ago';

const postDetails = (post) => {
  return (
    `<!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <div class="news-list">
        <header><img src="/logo.png"/>Wizard News</header>
          <div class='news-item'>
            <p>
              ${post.title} ${timeAgo(post.date)}
              <small>(by ${post.name})</small>
            </p>
            <p>${post.content}</p>
          </div>
      </div>
    </body>
  </html>`
  )
}

export default postDetails;
