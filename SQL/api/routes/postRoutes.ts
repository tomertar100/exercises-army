import express from "express";
import {
  getAllPosts,
  getPost,
  createPost,
  upvotePost,
  downvotePost,
} from "../actions/postsActions";

const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  const data = await getAllPosts();
  res.json(data);
});

postRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const post = await getPost(id);
  res.json(post);
});

postRouter.post("/", async (req, res) => {
  const user_id = req.body.user_id;
  const content = req.body.content;
  await createPost(user_id, content);
  res.json("post Created");
});

postRouter.put("/upvote/:id", async (req, res) => {
  const post_id = req.params.id;
  await upvotePost(post_id);
  res.json("upvoted");
});

postRouter.put("/downvote/:id", async (req, res) => {
  const post_id = req.params.id;
  await downvotePost(post_id);
  res.json("downvoted");
});
export default postRouter;
