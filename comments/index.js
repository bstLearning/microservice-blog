const express = require("express");
const { randomBytes } = require("crypto");

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

/**
 *  '35p5[j' : [ { id: 'j325', content: 'great post' }, ... ]
 *  ^^^ID of a post        ^^^ID of a comment
 */
const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentID = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentID, content });

  commentsByPostId[req.params.id] = comments;

  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
