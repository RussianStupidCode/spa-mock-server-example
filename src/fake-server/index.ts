/**
 * этот слой создан как имитация бекенда, для тестирования поведения фронтенда без бекенда
 * при перезагрузке страницы сбрасывается т.к. данные сохраняются в памяти
 */

import { MockServer } from './mockapi';
import { mockRoutes } from './routes';
import * as middlewares from './middlewares';

class MockServerWithMiddlewares extends MockServer {
  constructor(...args: ConstructorParameters<typeof MockServer>) {
    super(...args);

    const options = args[1];

    this.addMiddleWare(middlewares.randomErrorGenerate(options?.random500ErrorProbability));
  }
}

export { mockRoutes, MockServerWithMiddlewares as MockServer };
