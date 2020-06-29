import * as React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import PageHeaderWithViewToggle from 'component/PageHeaderWithList/PageHeaderWithViewToggle';

import './AuthList.scss';

type IProps = WithTranslation;

const AuthList: React.SFC<IProps> = props => {
    const render = React.useMemo<JSX.Element>(() => (
        <div className={'euphoria-container'}>
            <PageHeaderWithViewToggle
                title={props.t('修理记录')}
                subtitle={props.t('在这里可以看到物品的修理信息')}
                disableChangeView
            />
        </div>
    ), []);

    return render;
};

export default withTranslation()(AuthList);