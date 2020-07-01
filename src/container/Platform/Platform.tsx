import * as React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import PageHeaderWithViewToggle, { VIEWS } from 'component/PageHeaderWithList/PageHeaderWithViewToggle';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddProjectModal from 'component/AddProjectModal/AddProjectModal';

import PlatformTable from 'component/PlatformTable/PlatformTable';
import PlatformCard from 'component/PlatformCard/PlatformCard';

import './Platform.scss';

type IProps = WithTranslation;

const Platform: React.SFC<IProps> = props => {
  const [views, setViews] = React.useState<VIEWS>('list');
  const [addProjectModalVisible, setAddProjectModalVisible] = React.useState<boolean>(false);

  const renderDifferentChildComponents = React.useMemo<JSX.Element>(
    () => (views === 'list' ? <PlatformTable /> : <PlatformCard />),
    [views]
  );

  const render = React.useMemo(
    () => (
      <React.Fragment>
        <div className={'euphoria-container platform-container'}>
          <PageHeaderWithViewToggle
            title={props.t('物品列表')}
            subtitle={props.t('在这里可以看到物品的详细信息')}
            onViewChange={setViews.bind(this)}
            disableChangeView
          />
          <div className={'add-project'}>
            <Button onClick={setAddProjectModalVisible.bind(this, true)} type={'primary'} icon={<PlusOutlined />}>
              {props.t('添加物品')}
            </Button>
          </div>
          {renderDifferentChildComponents}
        </div>
        <AddProjectModal visible={addProjectModalVisible} onCancel={setAddProjectModalVisible.bind(this, false)} />
      </React.Fragment>
    ),
    [props.i18n.language, views, addProjectModalVisible]
  );

  return render;
};

export default withTranslation()(Platform);
