import React, { useEffect, useState } from "react";
import { postsApi } from "src/shared/api";
import type { PostResponse } from "src/shared/api";
import { styled } from "styled-components";

const PostsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const App: React.FC = () => {
  const [posts, setPosts] = useState<PostResponse[]>([]);

  const refetchPosts = async () => {
    const { data } = await postsApi.getPosts();

    setPosts(data);
  };

  useEffect(() => {
    refetchPosts();
  }, []);

  const onDelete = async (id: PostResponse["id"]) => {
    await postsApi.deletePost(id);
    refetchPosts();
  };

  return (
    <>
      <h1>Посты</h1>
      <PostsContainer>
        {posts.map((post) => (
          <div>
            <div>{post.id}</div>
            <div>{post.author}</div>
            <div>{post.likeCount}</div>
            <button onClick={() => onDelete(post.id)}>удалить</button>
          </div>
        ))}
      </PostsContainer>
    </>
  );
};

export default App;
