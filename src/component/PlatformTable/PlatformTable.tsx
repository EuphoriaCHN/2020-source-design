import * as React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Table, Tag, message } from 'antd';
import { observer } from 'mobx-react';
import Project from 'store/ProjectStore';
import { GET_PROJECT_LIST } from 'api/api';
import { errHandling } from 'common/utils/util';
import { GET_PROJECT_RES } from 'common/interfaces/project';
import { TablePaginationConfig } from 'antd/lib/table/Table';
import dateformat from 'dateformat';

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

  const loadData = React.useCallback<(pagesize?: number, currentPage?: number) => void>((pagesize, currentPage) => {
    setLoading(true);
    const limit: number = pagesize || Project.globalPageSize;
    const offset: number = ((currentPage || Project.globalCurrentPage) - 1) * limit;

    errHandling(GET_PROJECT_LIST, { limit, offset, searchName: '' })
      .then(
        (value: GET_PROJECT_RES) => {
          Project.setProjects(value.rows, value.count);
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

  const renderUpdateTime = React.useCallback<(updateTime: number) => string>(updateTime => {
    const format = {
      zh: 'yyyy 年 mm 月 dd 日 hh:MM:ss',
      en: 'mmm dd yyyy hh:MM:ss'
    }[props.i18n.language === 'zh-CN' ? 'zh' : 'en'];
    return dateformat(new Date(updateTime), format);
  }, [props.i18n.language]);

  const _columns = React.useMemo(
    () => [
      { title: 'ID', dataIndex: 'id', key: 'id', render: renderSimpleString },
      { title: props.t('物品名称'), dataIndex: 'name', key: 'name', render: renderSimpleString },
      { title: props.t('状态'), dataIndex: 'status', key: 'status', render: renderProjectStatus },
      { title: props.t('更新时间'), dataIndex: 'updateTime', key: 'updateTime', render: renderUpdateTime },
      { title: props.t('操作'), key: 'action', render: renderMoreOperation },
    ],
    [props.i18n.language]
  );

  const handlePaginate = React.useCallback<(page: number, pageSize: number) => void>((page, pageSize) => {
    Project.setCurrentPage(page);
    Project.setPageSize(pageSize);
    loadData(pageSize, page);
  }, []);

  const renderPaginationTotal = React.useCallback<
    (total: number, range: [number, number]) => React.ReactNode
  >((total, range) => (
    <span>{props.t('第 {{start}} 到 {{end}} 条，共 {{total}} 条', {
      start: range[0],
      end: range[1],
      total
    })}</span>
  ), []);

  const _pagination = React.useMemo<TablePaginationConfig>(() => ({
    total: Project.projectsTotalCount,
    pageSize: Project.globalPageSize,
    current: Project.globalCurrentPage,
    showTotal: renderPaginationTotal,
    defaultCurrent: 1,
    defaultPageSize: 10,
    onChange: handlePaginate,
    showSizeChanger: false, // TODO: AntD 使用感--
  }), [Project.projects, Project.globalCurrentPage, Project.globalPageSize, Project.projectsTotalCount]);

  const render = React.useMemo<JSX.Element>(
    () => <Table loading={loading} columns={_columns} dataSource={Project.projects} pagination={_pagination} />,
    [loading, Project.projects, _pagination, props.i18n.language]
  );

  return render;
});

export default withTranslation()(PlatformTable);
