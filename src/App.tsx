import * as React from 'react';
import { ConfigProvider, Layout } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import * as H from 'history';

// Antd 组件国际化
import antdLocale from './common/constants/antdLocale';

import Header from './component/Header/Header';
import Router from './Router';
import Footer from './component/Footer/Footer';
import Sider from './component/Sider/Sider';
// import LoginWrapper from './component/LoginWrapper/LoginWrapper';

type IProps = H.History;

const App: React.FC<IProps> = (props: IProps): React.ReactElement => (
  <ConfigProvider locale={antdLocale}>
    <BrowserRouter>
      <Layout>
        <Sider />
        <Layout className={'container'}>
          <Header />
          <Router />
          <Footer />
        </Layout>
      </Layout>
    </BrowserRouter>
  </ConfigProvider>
);

// export default LoginWrapper(App);
export default App;
