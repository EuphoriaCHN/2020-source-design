import * as React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Table, message, Tag, Space, Popconfirm } from 'antd';
import { GET_AUTH_LIST, PROMISE_SOME_AUTH_REQUEST } from 'api/api';
import { errHandling } from 'common/utils/util';
import { GET_RES_WITH_ROWS, BUY } from 'common/interfaces/project';
import { TablePaginationConfig } from 'antd/lib/table/Table';
import dateformat from 'dateformat';
import { BuyStatus } from 'component/BuyRecordTable/BuyRecordTable';

import { SyncOutlined, CloseCircleOutlined } from '@ant-design/icons';

import './AuthListTable.scss';

type IProps = WithTranslation;

const AuthListTable: React.SFC<IProps> = props => {
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

      errHandling(GET_AUTH_LIST, { limit, offset, searchName: '' })
        .then(
          (value: GET_RES_WITH_ROWS<BUY>) => {
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

  const handlePromiseSomeAuthRequest = React.useCallback<(id: number, status: boolean) => void>((id, status) => {
    setLoading(true);

    errHandling(PROMISE_SOME_AUTH_REQUEST, { id, reason: status })
      .then(
        () => {
          message.success(`${status ? '确定' : '拒绝'}审批成功`);
          loadData();
        },
        reason => {
          console.error(reason);
          message.error(`${status ? '确定' : '拒绝'}审批失败`);
        }
      )
      .finally(setLoading.bind(this, false));
  }, []);

  const renderMoreOperation = React.useCallback<(record: BUY) => JSX.Element>(record => {
    if (record.status === BuyStatus.AUTH) {
      // 进行中，可以进行审核
      return (
        <Space>
          <Popconfirm
            title={props.t('确定要通过 {{$name}} 的购买审核？', { $name: record.projectName })}
            onConfirm={handlePromiseSomeAuthRequest.bind(this, record.id, true)}
            okText={props.t('确定')}
            cancelText={props.t('取消')}
          >
            <a>{props.t('通过')}</a>
          </Popconfirm>
          <Popconfirm
            title={props.t('确定要拒绝 {{$name}} 的购买审核？', { $name: record.projectName })}
            onConfirm={handlePromiseSomeAuthRequest.bind(this, record.id, false)}
            okText={props.t('确定')}
            cancelText={props.t('取消')}
          >
            <a>{props.t('拒绝')}</a>
          </Popconfirm>
        </Space>
      );
    }
    // 审核完成，返回结果
    if (record.status === BuyStatus.RESOLVE) {
      // 通过
      return <Tag color={'default'}>{props.t('已通过')}</Tag>;
    }
    return <Tag color={'default'}>{props.t('已拒绝')}</Tag>;
  }, []);

  const _columns = React.useMemo(
    () => [
      { title: props.t('申请人'), dataIndex: 'creator', key: 'creator', render: renderSimpleString },
      { title: props.t('物品名称'), dataIndex: 'projectName', key: 'projectName', render: renderSimpleString },
      { title: props.t('更新时间'), dataIndex: 'updateTime', key: 'updateTime', render: renderUpdateTime },
      { title: props.t('当前状态'), dataIndex: 'status', key: 'status', render: renderBuyStatus },
      { title: props.t('操作'), key: 'operate', render: renderMoreOperation },
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

export default withTranslation()(AuthListTable);
