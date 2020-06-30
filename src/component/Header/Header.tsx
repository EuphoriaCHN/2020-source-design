import * as React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { ClickParam } from 'antd/lib/menu/index';
import classnames from 'classnames';
import Cookies from 'js-cookie';
import { observer } from 'mobx-react';
import ProjectStore from 'store/ProjectStore';

import { LOCALE } from 'common/constants/locale';

import { Dropdown, Button, Menu, message, Popconfirm } from 'antd';
import { GlobalOutlined, CheckOutlined } from '@ant-design/icons';

// import { LOGOUT } from 'api';
// import { errHandling } from 'common/utils/util';

import './Header.scss';

type IProps = WithTranslation;

const Header: React.SFC<IProps> = observer(props => {
  const _locale: string = props.i18n.language;
  const [localeDropdownVisible, setLocaleDropdownVisible] = React.useState(false);
  const [logoutLoading, setLogoutLoading] = React.useState(false);

  const handleI18n = (param: ClickParam): void => {
    const { key } = param;

    if (key !== _locale) {
      Cookies.set('locale', key);
      props.i18n.changeLanguage(key);
    }
  };

  const menu: React.ReactElement = (
    <Menu>
      {Object.keys(LOCALE).map(
        (language: string): JSX.Element => {
          const activity = _locale === language;
          const classNames = classnames({ 'local-activity': activity });
          return (
            <Menu.Item key={language} onClick={handleI18n}>
              <div className={classNames}>
                {activity ? <CheckOutlined /> : null}
                {LOCALE[language]}
              </div>
            </Menu.Item>
          );
        }
      )}
    </Menu>
  );

  const handleToggleLocaleDropdownVisible = (): void => {
    setLocaleDropdownVisible(!localeDropdownVisible);
  };

  const handleLogOut = async (): Promise<void> => {
    setLogoutLoading(true);
    ProjectStore.setUser(null);
    try {
      // await errHandling(LOGOUT);
      message.success(props.t('登出成功'));
      setLogoutLoading(false);
      setTimeout(() => window.location.reload(), 1000);
    } catch (e) {
      message.error(props.t('糟糕...服务器打瞌睡了...'));
      setLogoutLoading(false);
    }
  };

  const _hasUser = ProjectStore.user && Object.keys(ProjectStore.user).length;

  const getLoginInfo: React.ReactElement = _hasUser ? (
    <React.Fragment>
      <span>{props.t('欢迎！')}</span>
      <span>{ProjectStore.user.userName}</span>
    </React.Fragment>
  ) : (
    <span>{props.t('未登录')}</span>
  );

  const getLogOutButton: React.ReactElement = _hasUser ? (
    <Popconfirm
      title={props.t('确定要登出账号吗？')}
      onConfirm={handleLogOut}
      okText={props.t('确定')}
      cancelText={props.t('取消')}
      okButtonProps={{ loading: logoutLoading }}
    >
      <Button className={'log-out'} type={'link'}>
        {props.t('登出')}
      </Button>
    </Popconfirm>
  ) : null;

  const render: JSX.Element = React.useMemo(
    () => (
      <header className={'header'}>
        <div className={'say-hello'}>{getLoginInfo}</div>
        {getLogOutButton}
        <Dropdown overlay={menu} visible={localeDropdownVisible} onVisibleChange={handleToggleLocaleDropdownVisible}>
          <Button>
            {props.t(LOCALE[_locale])} <GlobalOutlined />
          </Button>
        </Dropdown>
      </header>
    ),
    [props.i18n.language, localeDropdownVisible, _hasUser]
  );

  return render;
});

export default withTranslation()(Header);
