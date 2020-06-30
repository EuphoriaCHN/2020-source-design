import * as React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import PageHeaderWithViewToggle from 'component/PageHeaderWithList/PageHeaderWithViewToggle';
import RepairRecordTable from 'component/RepairRecordTable/RepairRecordTable';

import './RepairRecord.scss';

type IProps = WithTranslation;

const RepairRecord: React.SFC<IProps> = props => {
  const render = React.useMemo<JSX.Element>(
    () => (
      <div className={'euphoria-container'}>
        <PageHeaderWithViewToggle
          title={props.t('修理记录')}
          subtitle={props.t('在这里可以看到物品的修理信息')}
          disableChangeView
        />
        <RepairRecordTable />
      </div>
    ),
    []
  );

  return render;
};

export default withTranslation()(RepairRecord);
