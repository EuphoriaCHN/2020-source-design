import * as React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import * as H from 'history';
import { observer } from 'mobx-react';

import { Layout, Menu, Tooltip } from 'antd';
import { ClickParam } from 'antd/lib/menu/index';
import {
  UserOutlined,
  ProfileOutlined,
  TeamOutlined,
  HddOutlined,
  MenuOutlined,
  PlusOutlined,
  BarsOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';

import './Sider.scss';
import projectStore from 'store/ProjectStore';

export interface SIDER_DATA {
  k: string;
  icon: React.ReactElement;
  value?: string;
  title?: string;
  auth?: Array<number>;
  children?: Array<SIDER_DATA>;
}

const Sider: React.SFC<WithTranslation> = observer(props => {
  const [collapsed, setCollapsed] = React.useState(false);
  const _history: H.History<H.LocationState> = useHistory();
  const _defaultMenuKey = window.location.pathname.slice(1);

  const getTitle: null | React.ReactNode = collapsed ? (
    <div className={'collapsed-title'} />
  ) : (
      <Tooltip title={props.t('实验室物品管理后台')}>
        <h3 className={'title'}>{props.t('实验室物品管理后台')}</h3>
      </Tooltip>
    );

  const handleChangeRoute = (param: ClickParam): void => {
    const { key } = param;
    _history.push(`/${key}`);
  };

  const siderData: Array<SIDER_DATA> = [
    { k: 'platform', icon: <MenuOutlined />, value: props.t('物品列表') },
    {
      k: '',
      icon: <HddOutlined />,
      title: props.t('设备记录'),
      children: [
        { k: 'repair-record', icon: <ProfileOutlined />, value: props.t('修理记录') },
        { k: 'destory-record', icon: <BarsOutlined />, value: props.t('报废记录') },
        { k: 'buy-record', icon: <PlusOutlined />, value: props.t('购买记录') },
      ],
    },
    { k: 'auth-list', icon: <TeamOutlined />, value: props.t('审批清单') },
    { k: 'personal', icon: <UserOutlined />, value: props.t('个人信息') },
    { k: 'about', icon: <QuestionCircleOutlined />, value: props.t('关于') },
  ];

  const getSiderItem = (item: SIDER_DATA) => {
    if (item.k && item.k.length) {
      return (
        <Menu.Item key={item.k} icon={item.icon} onClick={handleChangeRoute}>
          {item.value}
        </Menu.Item>
      );
    }
    return (
      <Menu.SubMenu icon={item.icon} title={item.title}>
        {item.children.map(getSiderItem)}
      </Menu.SubMenu>
    );
  };

  const render: JSX.Element = React.useMemo(
    () => (
      <Layout.Sider className={'sider'} collapsed={collapsed} onCollapse={setCollapsed} collapsible>
        {getTitle}
        <Menu theme={'dark'} defaultSelectedKeys={[_defaultMenuKey]} mode={'inline'}>
          {siderData.map(getSiderItem)}
        </Menu>
      </Layout.Sider>
    ),
    [collapsed, props.i18n.language, projectStore.user.id]
  );

  return render;
});

export default withTranslation()(Sider);
