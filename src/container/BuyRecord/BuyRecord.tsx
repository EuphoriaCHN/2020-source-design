import * as React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import PageHeaderWithViewToggle from 'component/PageHeaderWithList/PageHeaderWithViewToggle';
import BuyRecordTable from 'component/BuyRecordTable/BuyRecordTable';

import './BuyRecord.scss';

type IProps = WithTranslation;

const BuyRecord: React.SFC<IProps> = props => {
  const render = React.useMemo<JSX.Element>(
    () => (
      <div className={'euphoria-container'}>
        <PageHeaderWithViewToggle
          title={props.t('购买记录')}
          subtitle={props.t('在这里可以看到物品的购买信息')}
          disableChangeView
        />
        <BuyRecordTable />
      </div>
    ),
    [props.i18n.language]
  );

  return render;
};

export default withTranslation()(BuyRecord);
