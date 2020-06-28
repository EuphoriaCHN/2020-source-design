import * as React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { History } from 'history';

import { Empty, Button } from 'antd';

import ProjectStore from 'store/ProjectStore';

import './PermissionDenied.scss';

interface IProps extends WithTranslation {
  history: History;
}

const EmptyDescription: React.FC<IProps> = (props): React.ReactElement => (
  <span className={'permission-denied-description'}>{props.t('想看？等你成为了管理员你就能看了')}</span>
);

const PermissionDenied: React.FC<IProps> = (props): React.ReactElement => {
  const handleReturnPlatform = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    ProjectStore.setPageTitle('documentTitle', null);
    props.history.push('/question');
  };
  const imageStyle = { height: 200 };

  ProjectStore.setPageTitle('documentTitle', props.t('Permission Denied'));

  return (
    <Empty
      className={'permission-denied'}
      image={Empty.PRESENTED_IMAGE_DEFAULT}
      imageStyle={imageStyle}
      description={<EmptyDescription {...props} />}
    >
      <div className={'permission-denied-button-list'}>
        <Button type="primary" onClick={handleReturnPlatform} ghost>
          {props.t('返回主页')}
        </Button>
      </div>
    </Empty>
  );
};

export default withTranslation()(PermissionDenied);
