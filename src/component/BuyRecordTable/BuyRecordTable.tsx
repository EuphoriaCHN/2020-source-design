import * as React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Table, message, Tag } from 'antd';
import { GET_BUY_LIST } from 'api/api';
import { errHandling } from 'common/utils/util';
import { GET_RES_WITH_ROWS, BUY } from 'common/interfaces/project';
import { TablePaginationConfig } from 'antd/lib/table/Table';
import dateformat from 'dateformat';

import { SyncOutlined, CloseCircleOutlined } from '@ant-design/icons';

import './BuyRecordTable.scss';

type IProps = WithTranslation;

export enum BuyStatus {
  AUTH = 0, // 审核中
  RESOLVE = 1, // 购买成功
  REJECT = 2, // 审核未通过
}

const BuyRecordTable: React.SFC<IProps> = props => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<Array<BUY>>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);

  const loadData = React.useCallback<(_pagesize?: number, _currentPage?: number) => void>(
    (_pagesize, _currentPage) => {
      setLoading(true);
      const limit: number = _pagesize || pageSize;
      const offset: number = ((_currentPage || currentPage) - 1) * limit;

      errHandling(GET_BUY_LIST, { limit, offset, searchName: '' })
        .then(
          (value: GET_RES_WITH_ROWS<BUY>) => {
            setData(value.rows);
            setTotal(value.count);
          },
          reason => {
            message.error(props.t('糟糕...服务器打瞌睡了...'));
            console.error(reason);
          }
        )
        .finally(setLoading.bind(this, false));
    },
  [pageSize, currentPage]
  );

  React.useEffect(() => {
    loadData();
  }, []);

  const renderBuyStatus = React.useCallback<(status: number) => JSX.Element>(status => {
    let element: JSX.Element = null;
    switch (status) {
      case BuyStatus.RESOLVE:
        element = <Tag color={'green'}>{props.t('已购买')}</Tag>;
        break;
      case BuyStatus.REJECT:
        element = <Tag color={'red'}>{props.t('拒绝购买')}</Tag>;
        break;
      case BuyStatus.AUTH:
        element = (
          <Tag icon={<SyncOutlined spin />} color={'processing'}>
            {props.t('审核中')}
          </Tag>
        );
        break;
      default:
        element = <Tag icon={<CloseCircleOutlined />} color={'error'} />;
    }
    return element;
  }, []);

  const renderSimpleString = React.useCallback<(value: string) => string>(value => value, []);

  const renderUpdateTime = React.useCallback<(updateTime: number) => string>(
    updateTime => {
      const format = {
        zh: 'yyyy 年 mm 月 dd 日 hh:MM:ss',
        en: 'mmm dd yyyy hh:MM:ss',
      }[props.i18n.language === 'zh-CN' ? 'zh' : 'en'];
      return dateformat(new Date(updateTime), format);
    },
  [props.i18n.language]
  );

  const _columns = React.useMemo(
    () => [
      { title: props.t('申请人'), dataIndex: 'creator', key: 'creator', render: renderSimpleString },
      { title: props.t('审核人'), dataIndex: 'auther', key: 'auther', render: renderSimpleString },
      { title: props.t('物品名称'), dataIndex: 'projectName', key: 'projectName', render: renderSimpleString },
      { title: props.t('更新时间'), dataIndex: 'updateTime', key: 'updateTime', render: renderUpdateTime },
      { title: props.t('当前状态'), dataIndex: 'status', key: 'status', render: renderBuyStatus },
    ],
    [props.i18n.language]
  );

  const handlePaginate = React.useCallback<(page: number, pageSize: number) => void>((page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
    loadData(pageSize, page);
  }, []);

  const renderPaginationTotal = React.useCallback<(total: number, range: [number, number]) => React.ReactNode>(
    (total, range) => (
      <span>
        {props.t('第 {{start}} 到 {{end}} 条，共 {{total}} 条', {
          start: range[0],
          end: range[1],
          total,
        })}
      </span>
    ),
  []
  );

  const _pagination = React.useMemo<TablePaginationConfig>(
    () => ({
      total,
      pageSize,
      current: currentPage,
      showTotal: renderPaginationTotal,
      defaultCurrent: 1,
      defaultPageSize: 10,
      onChange: handlePaginate,
      showSizeChanger: false, // TODO: AntD 使用感--
    }),
    [currentPage, pageSize, total]
  );

  const render = React.useMemo<JSX.Element>(
    () => <Table loading={loading} columns={_columns} dataSource={data} pagination={_pagination} />,
    [loading, data, _pagination, props.i18n.language]
  );

  return render;
};

export default withTranslation()(BuyRecordTable);
