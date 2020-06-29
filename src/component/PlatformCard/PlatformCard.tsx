import * as React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';

import './PlatformCard.scss';

type IProps = WithTranslation;

const PlatformCard: React.SFC<IProps> = props => {
  const render = React.useMemo<JSX.Element>(() => <h1>PlatformCard</h1>, []);

  return render;
};

export default withTranslation()(PlatformCard);
