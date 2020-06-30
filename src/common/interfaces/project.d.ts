import { ProjectStatus } from 'component/PlatformTable/PlatformTable';

export type PROJECT = {
  id: string;
  name: string;
  status: ProjectStatus;
  createTime: string;
  updateTime: string;
};

export type GET_PROJECT_RES = {
  rows: Array<PROJECT>;
  count: number;
};

export type REPAIR = {
  id: string;
  name: string;
  reason: string;
  createTime: string;
  updateTime: string;
};

export type GET_RES_WITH_ROWS<T> = {
  rows: Array<T>;
  count: number;
};
