import * as React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import PageHeaderWithViewToggle from 'component/PageHeaderWithList/PageHeaderWithViewToggle';
import AuthListTable from 'component/AuthListTable/AuthListTable';

import './AuthList.scss';

type IProps = WithTranslation;

const AuthList: React.SFC<IProps> = props => {
  const render = React.useMemo<JSX.Element>(
    () => (
      <div className={'euphoria-container'}>
        <PageHeaderWithViewToggle
          title={props.t('审批清单')}
          subtitle={props.t('审核物品购买记录')}
          disableChangeView
        />
        <AuthListTable />
      </div>
    ),
    [props.i18n.language]
  );

  return render;
};

export default withTranslation()(AuthList);
