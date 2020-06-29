import axios from 'axios';

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      return error.response.data;
    }
    return error.toJSON();
  }
);

const prefix: string = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:9091/mock/9';

const request = {
  async get(url: string, query?: any) {
    return axios({
      method: 'get',
      url: `${prefix}${url}`,
      params: query,
    });
  },

  post(url: string, body?: any) {
    return axios({
      method: 'post',
      url: `${prefix}${url}`,
      data: body,
    });
  },
};

/**
 * 获取物品列表
 */
export const GET_PROJECT_LIST = async (query: { limit: number; offet: number; searchName: string }) =>
  request.get('/project/getProjectList', query);
