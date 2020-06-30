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
 * 报废某个物品
 */
export const DESTORY_PROJECT_BY_ID = async (query: { id: number }) => request.get('/project/destoryProjectById', query);

/**
 * 修复某个物品
 */
export const REPAIR_PROJECTS_BY_ID = async (query: { id: number }) => request.get('/project/repairProjectById', query);

/**
 * 获取购买列表
 */
export const GET_BUY_LIST = async (query: PAGINATE) => request.get('/project/getBuyList', query);

/**
 * 获取审批列表
 */
export const GET_AUTH_LIST = async (query: PAGINATE) => request.get('/project/getAuthList', query);

/**
 * 通过 / 拒绝某个审核
 */
export const PROMISE_SOME_AUTH_REQUEST = async (query: { id: number; reason: boolean }) =>
  request.get('/project/getAuthList', query);

/**
 * 鉴权
 */
export const CHECK_LOGIN = async () => request.get('/auth/checkLogin', {});

/**
 * 登录
 */
export const LOGIN = async (query: { userName: string; password: string }) => request.post('/auth/login', query);

/**
 * 登出
 */
export const LOGOUT = async () => request.get('/auth/logout', {});

/**
 * 修改用户密码
 */
export const CHANGE_PASSWORD = async (body: {
  id: number;
  oldPassword: string;
  account: string;
  newPassword: string;
}) => request.post('/user/changePassword', body);
