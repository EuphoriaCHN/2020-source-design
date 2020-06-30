import * as React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';

import { errHandling } from 'common/utils/util';
import { LOGIN } from 'api/api';

import ProjectStore from 'store/ProjectStore';

import { Form, Input, Button, Tooltip, message } from 'antd';

import './Login.scss';
import { USER } from 'common/interfaces/user';

type IProps = WithTranslation;
interface IFormFinishFailed {
  outOfDate: boolean;
  values: {
    [k: string]: string | undefined;
  }[];
  errorFields: {
    name: string[];
    errors: string[];
  }[];
}

const LoginHeader: React.FC<IProps> = props => {
  const render = React.useMemo(
    () => (
      <header>
        <h1>{props.t('登录您的账号')}</h1>
      </header>
    ),
    []
  );
  return render;
};

const Login: React.SFC<IProps> = props => {
  const [loading, setLoading] = React.useState(false);
  const { t } = props;
  const validateMessages = {
    required: t('${label}是必填字段'),
  };

  const onFinish = ({ account, password }): void => {
    setLoading(true);
    errHandling(LOGIN, { account, password })
      .then((value: USER) => {
        // 登录成功
        ProjectStore.setUser(value);
        message.success(t('登录成功'));
        setTimeout(() => (window.location.hash = ''), 1000);
      })
      .finally(setLoading.bind(this, false));
  };

  const onFinishFailed = (error: IFormFinishFailed) => {
    error.errorFields.forEach(err => {
      err.errors.forEach(v => message.error(v));
    });
  };

  const render = React.useMemo(
    () => (
      <div className={'login-page'}>
        <div className={'login-page-box'}>
          <LoginHeader {...props} />
          <Form
            layout={'vertical'}
            validateMessages={validateMessages}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item label={t('账号')} name="account" rules={[{ required: true, max: 12 }]}>
              <Input />
            </Form.Item>
            <Form.Item label={t('密码')} name="password" rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                {t('登录')}
              </Button>
              <Tooltip title={t('请联系管理员进行修改密码')}>
                <Button type="link" htmlType="button">
                  {t('忘记密码')}
                </Button>
              </Tooltip>
            </Form.Item>
          </Form>
        </div>
      </div>
    ),
    [loading]
  );
  return render;
};

export default withTranslation()(Login);
