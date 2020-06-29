import { observable, action } from 'mobx';

import * as IUSER from 'common/interfaces/user';
import * as IPROJECT from 'common/interfaces/project';

class ProjectStore {
  // 标题
  @observable documentTitle = '西安科技大学校软件实验室';
  @observable pageName: string | null = null;
  @action.bound
  setPageTitle(attribute: string, value: string | null): void {
    if (attribute !== 'documentTitle' && attribute !== 'pageName') {
      throw new Error('ProjectStort setPageTitle: 错误的参数 attribute');
    }
    this[attribute] = value;
  }

  // 初始化项目
  async init(): Promise<void> {
    const promiseList: Array<Promise<void>> = [];
    await Promise.all(promiseList);
  }

  // 用户信息
  // @observable user: IUSER.USER = null;
  @observable user: IUSER.USER = {
    userName: '王钦弘',
    account: 'wqh610106',
  };
  @action.bound
  setUser(user: IUSER.USER) {
    if (!user) {
      user = null;
    }
    this.user = Object.assign({}, user);
  }

  // 展示的物品信息（当前页面
  @observable projects: Array<IPROJECT.PROJECT> = [];
  @action.bound
  setProjects(projects: Array<IPROJECT.PROJECT>) {
    this.projects = Object.assign([], projects);
  }

  // 全局 currentPage & pageSize
  @observable globalCurrentPage = 1;
  @observable globalPageSize = 10;
  @action.bound
  setCurrentPage(currentPage: number) {
    this.globalCurrentPage = currentPage;
  }
  @action.bound
  setPageSize(pageSize: number) {
    this.globalPageSize = pageSize;
  }
}

const projectStore = new ProjectStore();
projectStore.init();

export default projectStore;
