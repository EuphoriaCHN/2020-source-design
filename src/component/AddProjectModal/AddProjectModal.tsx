import * as React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Modal, Form, Input, message } from 'antd';
import { errHandling } from 'common/utils/util';
import { ADD_PROJECT } from 'api/api';

import './AddProjectModal.scss';

interface IProps extends WithTranslation {
  visible: boolean;
  onCancel: () => void;
}

const AddProjectModal: React.SFC<IProps> = props => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const _form = Form.useForm()[0];

  const handleOk = React.useCallback<() => void>(() => {
    setLoading(true);
    const projectName = _form.getFieldValue('projectName');

    errHandling(ADD_PROJECT, { projectName })
      .then(() => {
        message.success(props.t('申请成功！可以前往【购买记录】中查看'));
        props.onCancel();
      })
      .finally(setLoading.bind(this, false));
  }, []);

  const render = React.useMemo<JSX.Element>(
    () => (
      <Modal
        okButtonProps={{ loading }}
        cancelButtonProps={{ loading }}
        title={props.t('购买物品')}
        visible={props.visible}
        onOk={handleOk}
        onCancel={props.onCancel}
      >
        <Form layout={'vertical'} form={_form}>
          <Form.Item
            label={props.t('物品名称')}
            name={'projectName'}
            rules={[{ required: true, message: props.t('物品名称是必填项！') }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    ),
    [props.i18n.language, props.visible]
  );

  return render;
};

export default withTranslation()(AddProjectModal);
