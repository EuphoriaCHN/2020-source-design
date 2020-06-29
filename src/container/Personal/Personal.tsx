import * as React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import PageHeaderWithViewToggle from 'component/PageHeaderWithList/PageHeaderWithViewToggle';

import './Personal.scss';

type IProps = WithTranslation;

const Personal: React.SFC<IProps> = props => {
    const render = React.useMemo<JSX.Element>(() => (
        <div className={'euphoria-container'}>
            <PageHeaderWithViewToggle
                title={props.t('个人信息')}
                subtitle={props.t('在这里可以修改个人信息')}
                disableChangeView
            />
        </div>
    ), []);

    return render;
};

export default withTranslation()(Personal);