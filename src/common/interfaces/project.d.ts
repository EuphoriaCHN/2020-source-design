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