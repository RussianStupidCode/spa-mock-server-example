import type { PostRequest } from "src/shared/api";
import { MockServer } from "../mockapi";
import { postsService } from "../services";

const mockPostsRoutes = (mockServer: MockServer): void => {
  mockServer.addMockRoute("/posts", "GET", () => {
    const response = postsService.getAllPosts();

    return [200, JSON.stringify(response)];
  });

  mockServer.addMockRoute("/posts/{id}", "GET", (context) => {
    const id = Number(context.dynamicUrlParams.id);
    const response = postsService.getPostById(id);

    return [200, JSON.stringify(response)];
  });

  mockServer.addMockRoute("/posts/{id}", "DELETE", (context) => {
    const id = Number(context.dynamicUrlParams.id);

    postsService.deletePostById(id);

    return [200, JSON.stringify(null)];
  });

  mockServer.addMockRoute("/posts", "POST", (context) => {
    const body = JSON.parse(context.data as string) as PostRequest;

    const response = postsService.createPost(body);

    return [200, JSON.stringify(response)];
  });
};

export default mockPostsRoutes;
