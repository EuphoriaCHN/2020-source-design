import * as React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';

import './Platform.scss';

interface IProps extends WithTranslation { }

const Platform: React.SFC<IProps> = props => {
  const render = React.useMemo(() => (
    <div>1</div>
  ), []);

  return render;
};

export default withTranslation()(Platform);