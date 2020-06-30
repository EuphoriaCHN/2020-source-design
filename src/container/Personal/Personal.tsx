import * as React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { Descriptions, Button } from 'antd';
import { observer } from 'mobx-react';
import Project from 'store/ProjectStore';
import { errHandling } from 'common/utils/util';
import { CHANGE_PASSWORD } from 'api/api';

import ChangePasswordModal from 'component/ChangePasswordModal/ChangePasswordModal';

import './Personal.scss';

type IProps = WithTranslation;

const Personal: React.SFC<IProps> = observer(props => {
  const [changePasswordModalVisible, setChangePasswordModalVisible] = React.useState(false);
  const { user } = Project;

  const handleResetPassword = async (oldPassword: string, newPassword: string): Promise<unknown> =>
    errHandling(CHANGE_PASSWORD, {
      account: user.account,
      oldPassword,
      newPassword,
    }).then((value: string) => {
      setChangePasswordModalVisible(false);
      return value;
    });

  const render = React.useMemo<JSX.Element>(
    () => (
      <React.Fragment>
        <div className={'euphoria-container'}>
          <div className={'container-personal'}>
            <Descriptions title={props.t('用户信息')} layout="vertical" bordered>
              <Descriptions.Item label={props.t('姓名')} className={'user-name'}>
                <span>{user.userName}</span>
              </Descriptions.Item>
              <Descriptions.Item label={props.t('账号')} className={'account'}>
                <span>{user.account}</span>
              </Descriptions.Item>
            </Descriptions>
            <div className={'reset-password-box'}>
              <Button danger type={'default'} onClick={setChangePasswordModalVisible.bind(this, true)}>
                {props.t('修改密码')}
              </Button>
            </div>
          </div>
        </div>
        <ChangePasswordModal
          onOk={handleResetPassword}
          onCancel={setChangePasswordModalVisible.bind(this, false)}
          visible={changePasswordModalVisible}
        />
      </React.Fragment>
    ),
    [user, changePasswordModalVisible]
  );

  return render;
});

export default withTranslation()(Personal);
