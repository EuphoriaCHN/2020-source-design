import { ProjectStatus } from 'component/PlatformTable/PlatformTable';

export type PROJECT = {
  id: string;
  name: string;
  status: ProjectStatus;
  createTime: string;
  updateTime: string;
};

export type REPAIR = {
  id: string;
  name: string;
  reason: string;
  createTime: string;
  updateTime: string;
};

export type DESTORY = {
  projectId: string;
  name: string;
  createTime: string;
  reason: string;
};

export type GET_RES_WITH_ROWS<T> = {
  rows: Array<T>;
  count: number;
};
