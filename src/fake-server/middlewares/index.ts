import { RouteCallback } from "fake-server/mockapi";

/**
 * Обертка для случайной выдачи ошибки сервера
 * @param probability
 * @returns
 */
const randomErrorGenerate =
  (probability?: number) =>
  (callback: RouteCallback): RouteCallback => {
    if (!probability) {
      return callback;
    }

    return (config) => {
      if (Math.random() < probability) {
        return [500, JSON.stringify(null)];
      }

      return callback(config);
    };
  };

export { randomErrorGenerate };
