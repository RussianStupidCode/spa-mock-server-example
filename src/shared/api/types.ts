interface PostRequest {
  likeCount: number;
  author: string;
}

interface PostResponse extends PostRequest {
  id: number;
}

export type { PostResponse, PostRequest };
