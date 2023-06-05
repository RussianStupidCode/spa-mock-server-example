// типы импортируются из shared/api т.к. на фронте обычно прописанны файлы интерфейсов ответа
import { PostResponse } from "src/shared/api/types";

const postsDB: PostResponse[] = [
  {
    id: 1,
    author: "Harry Potter",
    likeCount: 53,
  },
  {
    id: 2,
    author: "Batman",
    likeCount: 666,
  },
  {
    id: 3,
    author: "Jogn Cena",
    likeCount: 1,
  },
];

export default postsDB;
