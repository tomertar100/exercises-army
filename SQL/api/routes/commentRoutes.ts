import express from "express";
import {
  getAllComments,
  getComment,
  createComment,
  upvoteComment,
  downvoteComment,
} from "../actions/commentsActions";
import { authenticateToken, secretKey } from "../main/middleware";
const commentsRouter = express.Router();

commentsRouter.get("/", async (req, res) => {
  const data = await getAllComments();
  res.json(data);
});

commentsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const comment = await getComment(id);
  res.json(comment);
});

commentsRouter.post("/", authenticateToken, async (req, res) => {
  const user_id = req.body.user_id;
  const post_id = req.body.post_id;
  const content = req.body.content;
  await createComment(user_id, post_id, content);

  res.json("comment Created");
});

commentsRouter.put("/upvote/:id", authenticateToken, async (req, res) => {
  const comment_id = req.params.id;
  await upvoteComment(comment_id);
  res.json("upvoted");
});

commentsRouter.put("/downvote/:id", authenticateToken, async (req, res) => {
  const comment_id = req.params.id;
  await downvoteComment(comment_id);
  res.json("downvoted");
});

export default commentsRouter;
