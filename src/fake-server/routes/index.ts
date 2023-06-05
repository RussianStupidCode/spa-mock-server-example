/**
 * модуль для обработки запросов по маршрутам
 * @module
 */

import { MockServer } from "../mockapi";
import mockPostsRoutes from "./posts";

const mockRoutes = (mockServer: MockServer): void => {
  mockPostsRoutes(mockServer);
};

export { mockRoutes };
