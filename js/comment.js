const express = require('express');
const app = express();
app.use(express.json());

let comments = [];  // In-memory store for comments, replace with a database in real apps

// Create a new comment
app.post('/posts/:post_id/comments', (req, res) => {
    const { post_id } = req.params;
    const { author, content } = req.body;
    const newComment = {
        id: comments.length + 1,
        post_id: parseInt(post_id),
        author,
        content,
        created_at: new Date().toISOString(),
    };
    comments.push(newComment);
    res.status(201).json(newComment);
});

// Retrieve all comments for a specific post
app.get('/posts/:post_id/comments', (req, res) => {
    const { post_id } = req.params;
    const postComments = comments.filter(comment => comment.post_id == post_id);
    res.json(postComments);
});

// Retrieve a specific comment by ID
app.get('/posts/:post_id/comments/:comment_id', (req, res) => {
    const { post_id, comment_id } = req.params;
    const comment = comments.find(c => c.post_id == post_id && c.id == comment_id);
    if (comment) {
        res.json(comment);
    } else {
        res.status(404).json({ error: "Comment not found" });
    }
});

// Update a specific comment
app.put('/posts/:post_id/comments/:comment_id', (req, res) => {
    const { post_id, comment_id } = req.params;
    const { content } = req.body;
    const comment = comments.find(c => c.post_id == post_id && c.id == comment_id);
    if (comment) {
        comment.content = content;
        comment.updated_at = new Date().toISOString();
        res.json(comment);
    } else {
        res.status(404).json({ error: "Comment not found" });
    }
});

// Delete a specific comment
app.delete('/posts/:post_id/comments/:comment_id', (req, res) => {
    const { post_id, comment_id } = req.params;
    comments = comments.filter(c => !(c.post_id == post_id && c.id == comment_id));
    res.status(204).send();
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});