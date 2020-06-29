import { ProjectStatus } from 'component/PlatformTable/PlatformTable';

export type PROJECT = {
  id: string;
  name: string;
  status: ProjectStatus;
};

export type GET_PROJECT_RES = {
  rows: Array<PROJECT>;
  count: number;
};