const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

// Quick Eaxple
// posts === {
//   'j123j24': {
//     id: 'j123j24',
//     title: 'post title', 
//     comments: [
//       { id: 'klj3kl', content: 'commet!' }
//     ]
//   }
// }
const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, title } = data;
    
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated' ) {
    const { id, content, postId } = data;

    const post = posts[postId]
    post.comments.push({ id, content });
  }

  console.log(posts)

  res.send({});
});

app.listen(4002, () => {
  console.log("Listening on 4002");
});
