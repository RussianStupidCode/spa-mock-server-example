/**
 * модуль для создания заглушек обращений по api через axios
 * имитация бэкенда на фронте
 *
 * Нужен для более удобной отладки ui до подклчения к бэку
 * !!! для написания тестов (юнит) лучше использовать MockAdapter напрямую (без MockServer)
 * @module
 */

import axios from 'axios';

import { MockServer, RouteCallback } from './MockServer';

const examleMockServer = async (): Promise<void> => {
  // инстанс который будет мокаться
  const axiosInstance = axios.create();

  // имитация задержки в 300мс
  const mockServer = new MockServer(axiosInstance, { delayResponse: 300 });

  // мокается только этот роут, а остальные не трогаются
  mockServer.addMockRoute('/project/{project_id}', 'GET', context => {
    const { dynamicUrlParams } = context;

    // значение строка и если надо, то не забыть скастить
    const projectId = dynamicUrlParams.project_id;

    // формат ответа - код ответа и тело ответа
    return [200, Number(projectId)];
  });

  const { data } = await axiosInstance.get<number>('/project/12');

  // должно быть равно 12 тк это projectId в колбеке
  // eslint-disable-next-line
  console.log(data); 
};

// eslint-disable-next-line import/no-unused-modules
export { MockServer, examleMockServer };
export type { RouteCallback };
