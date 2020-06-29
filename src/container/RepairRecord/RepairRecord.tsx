import * as React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import PageHeaderWithViewToggle, { VIEWS } from 'component/PageHeaderWithList/PageHeaderWithViewToggle';

import './RepairRecord.scss';

type IProps = WithTranslation;

const RepairRecord: React.SFC<IProps> = props => {
    const [views, setViews] = React.useState<VIEWS>('list');

    const renderDifferentChildComponents = React.useMemo<JSX.Element>(
        () => (views === 'list' ? null : null),
        [views]
    );

    const render = React.useMemo<JSX.Element>(() => (
        <div className={'euphoria-container'}>
            <PageHeaderWithViewToggle
                title={props.t('修理记录')}
                subtitle={props.t('在这里可以看到物品的修理信息')}
                onViewChange={setViews.bind(this)}
            />
            {renderDifferentChildComponents}
        </div>
    ), []);

    return render;
};

export default withTranslation()(RepairRecord);