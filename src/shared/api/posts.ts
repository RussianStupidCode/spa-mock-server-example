import { AxiosResponse } from "axios";
import { PostRequest, PostResponse } from ".";
import { axiosInstance } from "./base";

const BASE_URL = "/posts";

const getPosts = async (): Promise<AxiosResponse<PostResponse[]>> => {
  const response = await axiosInstance.get(BASE_URL);

  return response;
};

const getPost = async (
  id: PostResponse["id"]
): Promise<AxiosResponse<PostResponse>> => {
  const url = `${BASE_URL}/${id}`;

  const response = await axiosInstance.get(url);

  return response;
};

const deletePost = async (
  id: PostResponse["id"]
): Promise<AxiosResponse<PostResponse>> => {
  const url = `${BASE_URL}/${id}`;

  const response = await axiosInstance.delete(url);

  return response;
};

const createPost = async (post: PostRequest) => {
  const response = await axiosInstance.post(BASE_URL, { body: post });

  return response;
};

export { createPost, deletePost, getPost, getPosts };
