import { MockServerRequestContext } from './types';

/**
 * для парсинга url и вытаскивания из него динамических параметров. Имя параметров должно быть уникальным в рамках урла
 * @param url - пример /projects/12
 * @param urlRegexp - пример /projects/{project_id}
 * @returns
 */
const getDynamicParameters = (url: string, urlRegexp: string): MockServerRequestContext['dynamicUrlParams'] => {
  const parameterNames: string[] = [];

  const parameters: MockServerRequestContext['dynamicUrlParams'] = {};

  // замена /project/{project_id} на /project/(\\w+) чтобы можно было вытащить данные из реального урла
  const rawRegexpUrl = urlRegexp.replace(/({\w+})/g, matchStr => {
    // убрать фигурки
    const parameterName = matchStr.slice(1, matchStr.length - 1);

    parameterNames.push(parameterName);

    return '(\\w+)';
  });

  const matchGroups = url.match(new RegExp(rawRegexpUrl));

  if (!matchGroups) {
    return parameters;
  }

  parameterNames.forEach((name, index) => {
    // т.к. 0 сама подстрока, то значения в группах с 1
    const value = matchGroups[index + 1];

    if (value === undefined) {
      return;
    }

    parameters[name] = value;
  });

  return parameters;
};

/**
 *
 * @param url в виде /project/{project_id}
 * @returns в виде /project/(\\w+)
 */
const dynamicRouteUrlToRegexp = (url: string): string => url.replace(/({\w+})/g, '(\\w+)');

export { getDynamicParameters, dynamicRouteUrlToRegexp };
