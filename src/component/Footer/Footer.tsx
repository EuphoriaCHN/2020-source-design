import * as React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import ProjectStore from 'store/ProjectStore';

import './Footer.scss';

type IProps = WithTranslation;

function Footer(props: IProps) {
  React.useEffect(() => {
    ProjectStore.documentTitle = null;
  }, []);

  const render: JSX.Element = React.useMemo(
    () => (
      <footer className={'footer'}>
        <span>Copyright &copy; 2020 </span>
        <span>Wang Qinhong, Bao Haijin, Sun Zhanling, Yan Zhuang.</span>
        <span>All Rights Reserved.</span>
      </footer>
    ),
    [props.i18n.language]
  );

  return render;
}

export default withTranslation()(Footer);
