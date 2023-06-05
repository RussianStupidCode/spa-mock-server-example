import { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";

import {
  MockAdapterCallback,
  MockAdapterFunctions,
  MockServerMethod,
  MockServerOptions,
  RequestMatcherFunc,
  RouteCallback,
} from "./types";
import { dynamicRouteUrlToRegexp, getDynamicParameters } from "./url-paser";

const MethodToFuncName: Record<MockServerMethod, MockAdapterFunctions> = {
  DELETE: "onDelete",
  POST: "onPost",
  PATCH: "onPatch",
  GET: "onGet",
  PUT: "onPut",
};

class MockServer {
  protected mockAdapter: MockAdapter;

  constructor(axiosInstance: AxiosInstance, options?: MockServerOptions) {
    this.mockAdapter = new MockAdapter(axiosInstance, options);
  }

  /**
   * если надо пользоваться стандартным адаптером
   * @returns
   */
  getRawMockAdapter(): MockAdapter {
    return this.mockAdapter;
  }

  /**
   * принимает url в формате /route/{route_param} и ищет по регулярке /route/(\\w+)
   * @param url
   * @param callback
   */
  addMockRoute(
    url: string,
    method: MockServerMethod,
    callback: RouteCallback
  ): void {
    const regexpRoute = new RegExp(`^${dynamicRouteUrlToRegexp(url)}$`);

    const funcName = MethodToFuncName[method];

    // вытащить параметры из урла в контекст
    const wrappedReply: RouteCallback = (context) => {
      const contextUrl = context.url ?? "";

      const params = getDynamicParameters(contextUrl, url);

      context.dynamicUrlParams = params;

      return callback(context);
    };

    // т.к. контекст включает доп поле
    this.mockAdapter[funcName](regexpRoute).reply(
      wrappedReply as MockAdapterCallback
    );
  }

  /**
   * Добавить обертки перед вызовом самих обработчиков маршрутов
   * !!!Важно добавлять до использования addMockRoute (иначе работать будет некорректно)
   * @param middleware
   * @returns
   */
  addMiddleWare(middleware: (arg: RouteCallback) => RouteCallback) {
    // функция, которая генерирует обертку по имени метода
    const wrapper = (method: MockServerMethod) => {
      const functionName = MethodToFuncName[method];

      const oldMethod = this.mockAdapter[functionName].bind(this.mockAdapter);

      // обернуть колбэк в вызове addMockRoute
      this.mockAdapter[functionName] = (
        matcher: Parameters<RequestMatcherFunc>[0]
      ) => {
        const handler = oldMethod(matcher);

        const oldReply = handler.reply.bind(handler);

        handler.reply = (arg: RouteCallback | number, ...rest) => {
          // изменяется только reply от колбэка (по номеру ответа не используется)
          if (typeof arg === "number") {
            return oldReply(arg, ...rest);
          }

          // проблема из-за изменения контекста (добавление переменной)
          return oldReply(middleware(arg) as MockAdapterCallback);
        };

        return handler;
      };
    };

    const methods: MockServerMethod[] = [
      "DELETE",
      "GET",
      "PATCH",
      "POST",
      "PUT",
    ];

    // сгенерировать обертки для всех методов
    methods.forEach((method) => {
      wrapper(method);
    });
  }
}

export { MockServer };
export type { RouteCallback };
