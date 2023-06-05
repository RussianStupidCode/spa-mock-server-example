import { AxiosRequestConfig, Method } from 'axios';
import type { RequestHandler } from 'axios-mock-adapter';
import MockAdapter from 'axios-mock-adapter';

/**
 * delayResponse - задержка перед ответом в мс (постоянная)
 * random500ErrorProbability - вероятность выдать ошибку 500 (для тестов на обработку ошибок)
 */
type MockServerOptions = {
  delayResponse: number;
  random500ErrorProbability?: number;
};

type MockServerRequestContext = AxiosRequestConfig & {
  dynamicUrlParams: Record<string, string>;
};

type MockAdapterCallback = Exclude<Parameters<RequestHandler['reply']>[0], number>;
type CallbackReturn = ReturnType<MockAdapterCallback>;

// callback для роутингов мок сервера
type RouteCallback = (context: MockServerRequestContext) => CallbackReturn;

// имена методов у мок адаптера для роутинга
type MockAdapterFunctions = 'onGet' | 'onPost' | 'onDelete' | 'onPut' | 'onPatch';

// Имена методов axios в верхенм регистре
type MockServerMethod = Extract<Method, 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH'>;

type RequestMatcherFunc = typeof MockAdapter.prototype.onAny;

export type {
  MockServerRequestContext,
  MockServerOptions,
  RouteCallback,
  MockAdapterFunctions,
  MockServerMethod,
  RequestMatcherFunc,
  MockAdapterCallback
};
