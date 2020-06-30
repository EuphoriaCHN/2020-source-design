import * as React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { FieldData } from 'rc-field-form/lib/interface';
import { LOGOUT, CHECK_LOGIN } from 'api/api';

import { Modal, Form, Input, message } from 'antd';
import { errHandling } from 'common/utils/util';
import projectStore from 'store/ProjectStore';
import { STATUS_CODE } from 'common/constants/constants';

interface IProps extends WithTranslation {
  visible: boolean;
  onOk: (oldPassword: string, newPassword: string) => Promise<unknown>;
  onCancel?: () => void;
}

const ChangePasswordModal: React.FC<IProps> = props => {
  const [loading, setLoading] = React.useState(false);
  const { t } = props;

  const _fields = {
    oldPassword: '',
    newPassword: '',
    againNewPassword: '',
  };

  const validateMessages = {
    required: t('${label}是必填字段'),
  };

  const onFinish = async () => {
    const { oldPassword, newPassword, againNewPassword } = _fields;
    if (!newPassword || newPassword !== againNewPassword) {
      message.error(props.t('两次输入的新密码不一致！'));
      return;
    }
    setLoading(true);
    props.onOk(oldPassword, newPassword).then(
      async (value: string) => {
        setLoading(false);
        if (value.toUpperCase() !== 'SUCCESS') {
          message.error(props.t('旧密码输入错误！'));
          return;
        }
        message.success(props.t('密码修改成功，请重新登录'));
        await errHandling(LOGOUT); // 注销，后台清空 Redis 相关
        projectStore.setUser(null); // 清空 Store
        window.location.reload(); // 强刷
      },
      reason => {
        message.error(JSON.stringify(reason));
      }
    );
  };

  const onFieldsChange = (changedFileds: Array<FieldData>, allFields: Array<FieldData>) => {
    allFields.forEach(fields => {
      _fields[fields.name[0]] = fields.value;
    });
  };

  const render: React.ReactElement = React.useMemo(
    () => (
      <Modal
        title={props.t('修改密码')}
        okButtonProps={{ type: 'default', danger: true, loading }}
        visible={props.visible}
        onOk={onFinish}
        onCancel={props.onCancel}
      >
        <Form layout={'vertical'} validateMessages={validateMessages} onFieldsChange={onFieldsChange}>
          <Form.Item label={t('旧密码')} name="oldPassword" rules={[{ required: true, max: 12 }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item label={t('新密码')} name="newPassword" rules={[{ required: true, max: 12 }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item label={t('确认密码')} name="againNewPassword" rules={[{ required: true, max: 12 }]}>
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    ),
    [props.visible, loading]
  );

  return render;
};

export default withTranslation()(ChangePasswordModal);
