import * as React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import PageHeaderWithViewToggle from 'component/PageHeaderWithList/PageHeaderWithViewToggle';
import DestoryRecordTable from 'component/DestoryRecordTable/DestoryRecordTable';

import './DestoryRecord.scss';

type IProps = WithTranslation;

const DestoryRecord: React.SFC<IProps> = props => {
  const render = React.useMemo<JSX.Element>(
    () => (
      <div className={'euphoria-container'}>
        <PageHeaderWithViewToggle
          title={props.t('报废记录')}
          subtitle={props.t('在这里可以看到物品的报废信息')}
          disableChangeView
        />
        <DestoryRecordTable />
      </div>
    ),
    [props.i18n.language]
  );

  return render;
};

export default withTranslation()(DestoryRecord);
