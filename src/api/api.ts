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

const prefix: string = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:9091/mock/25';

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

type PAGINATE = {
  limit: number;
  offet: number;
};

interface PAGINATE_VS_SEARCH extends PAGINATE {
  searchName?: string;
}

/**
 * 获取物品列表
 */
export const GET_PROJECT_LIST = async (query: PAGINATE_VS_SEARCH) => request.get('/project/getProjectList', query);

/**
 * 获取维修列表
 */
export const GET_REPAIR_LIST = async (query: PAGINATE) => request.get('/project/getRepairList', query);

/**
 * 获取报废列表
 */
export const GET_DESTORY_LIST = async (query: PAGINATE) => request.get('/project/getDestoryList', query);

/**
 * 获取购买列表
 */
export const GET_BUY_LIST = async (query: PAGINATE) => request.get('/project/getBuyList', query);
