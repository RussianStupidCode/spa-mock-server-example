// типы импортируются из shared/api т.к. на фронте обычно прописанны файлы интерфейсов ответа
import { PostRequest } from "src/shared/api/types";
import postsDB from "./posts-db";

const getAllPosts = () => {
  return postsDB;
};

const getPostById = (id: number) => {
  const post = getAllPosts().find((post) => post.id === id);

  if (!post) {
    throw new Error(`post with id = ${id} not found`);
  }

  return post;
};

const deletePostById = (id: number) => {
  const postIndex = postsDB.findIndex((post) => post.id === id);

  if (postIndex === -1) {
    throw new Error(`post with id = ${id} not found`);
  }

  postsDB.splice(postIndex, 1);

  return null;
};

const createPost = (post: PostRequest) => {
  const maxId = Math.max(...postsDB.map(({ id }) => id));

  const newId = maxId + 1;

  postsDB.push({ ...post, id: newId });
};

export { createPost, deletePostById, getAllPosts, getPostById };
