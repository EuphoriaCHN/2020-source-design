import * as React from 'react';

import { CHECK_LOGIN } from 'api/api';
import { errHandling } from 'common/utils/util';
import ProjectStore from 'store/ProjectStore';

interface IProps {}

function LoginWrapper(Component: typeof React.Component | React.FC): (props: IProps) => React.ReactElement {
  function Login(props: IProps): React.ReactElement {
    const login = async (): Promise<unknown> => errHandling(CHECK_LOGIN).then(
      (value: any) => {
        if (value && typeof value === 'object') {
          ProjectStore.setUser(value);
        }
      },
      (reason: any) => {
        window.location.hash = 'login';
      }
    );

    React.useEffect(() => {
      login();
    }, []);

    return <Component {...props} />;
  }

  return Login;
}

export default LoginWrapper;
