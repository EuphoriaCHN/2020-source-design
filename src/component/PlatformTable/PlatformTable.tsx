import * as React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Table, Tag, message } from 'antd';
import { observer } from 'mobx-react';
import Project from 'store/ProjectStore';
import { GET_PROJECT_LIST } from 'api/api';
import { errHandling } from 'common/utils/util';
import { PROJECT } from 'common/interfaces/project';

import { SyncOutlined, CloseCircleOutlined } from '@ant-design/icons';

import './PlatformTable.scss';

export enum ProjectStatus {
  HEALTHY = 0, // 健康
  BUYING = 1, // 购入中
  DISTORYED = 2, // 报废
}

type IProps = WithTranslation;

const PlatformTable: React.SFC<IProps> = observer(props => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const loadData = React.useCallback<() => void>(() => {
    setLoading(true);
    const limit: number = Project.globalPageSize;
    const offset: number = (Project.globalCurrentPage - 1) * Project.globalPageSize;

    errHandling(GET_PROJECT_LIST, { limit, offset, searchName: '' })
      .then(
        (value: Array<PROJECT>) => {
          Project.setProjects(value);
        },
        reason => {
          message.error(props.t('糟糕...服务器打瞌睡了...'));
          console.error(reason);
        }
      )
      .finally(setLoading.bind(this, false));
  }, [Project.globalCurrentPage, Project.globalPageSize]);

  React.useEffect(() => {
    loadData();
  }, []);

  const renderSimpleString = React.useCallback<(value: string) => string>(value => value, []);

  const renderProjectStatus = React.useCallback<(status: number) => JSX.Element>(status => {
    let element: JSX.Element = null;
    switch (status) {
      case ProjectStatus.HEALTHY:
        element = <Tag color={'green'}>{props.t('崭新出厂')}</Tag>;
        break;
      case ProjectStatus.DISTORYED:
        element = <Tag color={'red'}>{props.t('破旧不堪')}</Tag>;
        break;
      case ProjectStatus.BUYING:
        element = (
          <Tag icon={<SyncOutlined spin />} color={'processing'}>
            {props.t('购入中')}
          </Tag>
        );
        break;
      default:
        element = <Tag icon={<CloseCircleOutlined />} color={'error'} />;
    }
    return element;
  }, []);

  const renderMoreOperation = React.useCallback<() => JSX.Element>(() => <a>{props.t('更多操作')}</a>, []);

  const _columns = React.useMemo(
    () => [
      { title: 'ID', dataIndex: 'id', key: 'id', render: renderSimpleString },
      { title: props.t('物品名称'), dataIndex: 'name', key: 'name', render: renderSimpleString },
      { title: props.t('状态'), dataIndex: 'status', key: 'status', render: renderProjectStatus },
      { title: props.t('操作'), key: 'action', render: renderMoreOperation },
    ],
    [props.i18n.language]
  );

  const render = React.useMemo<JSX.Element>(
    () => <Table loading={loading} columns={_columns} dataSource={Project.projects} />,
    [Project.projects, Project.globalCurrentPage, Project.globalPageSize, loading]
  );

  return render;
});

export default withTranslation()(PlatformTable);
