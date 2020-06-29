import * as React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import PageHeaderWithViewToggle, { VIEWS } from 'component/PageHeaderWithList/PageHeaderWithViewToggle';

import PlatformTable from 'component/PlatformTable/PlatformTable';
import PlatformCard from 'component/PlatformCard/PlatformCard';

import './Platform.scss';

type IProps = WithTranslation;

const Platform: React.SFC<IProps> = props => {
  const [views, setViews] = React.useState<VIEWS>('list');

  const renderDifferentChildComponents = React.useMemo<JSX.Element>(
    () => (views === 'list' ? <PlatformTable /> : <PlatformCard />),
    [views]
  );

  const render = React.useMemo(
    () => (
      <div className={'euphoria-container'}>
        <PageHeaderWithViewToggle
          title={'物品列表'}
          subtitle={'在这里可以看到物品的详细信息'}
          onViewChange={setViews.bind(this)}
        />
        {renderDifferentChildComponents}
      </div>
    ),
    [props.i18n.language, views]
  );

  return render;
};

export default withTranslation()(Platform);
