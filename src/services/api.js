import axios from 'axios';
import changeObjectCase from 'change-object-case';
import _ from 'lodash';

const CHANGECASE_OPTIONS = {
  arrayRecursive: true,
  recursive: true,
  throwOnDuplicate: true
};

const apiService = {
  changeCase(data, toCase) {
    const type = _.isArray(data) ? 'Array' : 'Keys';

    return changeObjectCase[`${toCase}${type}`](data, CHANGECASE_OPTIONS);
  },

  create() {
    const api = axios.create({
      baseURL: 'http://localhost:3000/api/v1'
    });

    api.interceptors.request.use(apiService.transformRequest);
    api.interceptors.response.use(apiService.transformResponse);

    return api;
  },

  transformRequest(config) {
    config.headers = {
      ...config.headers,
      'Content-Type': 'application/json'
    };

    if (config.data) {
      config.data = apiService.changeCase(config.data, 'snake');
    }

    if (config.params) {
      config.params = apiService.changeCase(config.params, 'snake');
    }

    return config;
  },

  transformResponse(response) {
    response.data = apiService.changeCase(response.data, 'camel');

    console.log(response);

    return response;
  }
};

export {
  apiService,
  CHANGECASE_OPTIONS
};
export default apiService.create();
