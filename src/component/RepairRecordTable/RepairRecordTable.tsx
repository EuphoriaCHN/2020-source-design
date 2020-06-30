import * as React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Table, message } from 'antd';
import { GET_REPAIR_LIST } from 'api/api';
import { errHandling } from 'common/utils/util';
import { REPAIR, GET_RES_WITH_ROWS } from 'common/interfaces/project';
import { TablePaginationConfig } from 'antd/lib/table/Table';
import dateformat from 'dateformat';

import './RepairRecordTable.scss';

export enum RepairStatus {
  AUTHING = 0, // 审核中
  RESOLVE = 1, // 审核通过
  REJECT = 2, // 审核不通过
}

type IProps = WithTranslation;

const RepairRecordTable: React.SFC<IProps> = props => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<Array<REPAIR>>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);

  const loadData = React.useCallback<(_pagesize?: number, _currentPage?: number) => void>(
    (_pagesize, _currentPage) => {
      setLoading(true);
      const limit: number = _pagesize || pageSize;
      const offset: number = ((_currentPage || currentPage) - 1) * limit;

      errHandling(GET_REPAIR_LIST, { limit, offset, searchName: '' })
        .then(
          (value: GET_RES_WITH_ROWS<REPAIR>) => {
            setData(value.rows);
            console.log(value.rows);
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
      { title: 'ID', dataIndex: 'id', key: 'id', render: renderSimpleString },
      { title: props.t('维修物品'), dataIndex: 'name', key: 'name', render: renderSimpleString },
      { title: props.t('报废原因'), dataIndex: 'reason', key: 'reason', render: renderSimpleString },
      { title: props.t('更新时间'), dataIndex: 'updateTime', key: 'updateTime', render: renderUpdateTime },
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

export default withTranslation()(RepairRecordTable);