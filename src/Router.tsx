import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { observer } from 'mobx-react';
import DocumentTitle from 'react-document-title';

import Platform from 'container/Platform/Platform';
import About from 'container/About/About';
import RepairRecord from 'container/RepairRecord/RepairRecord';

import NoMatch from 'component/NoMatch/NoMatch';
import PermissionDenied from 'component/PermissionDenied/PermissionDenied';

import RootStore from 'store/RootStore';

interface IProps { }

const routerStyle: React.CSSProperties = {
    height: 'calc(100vh - 98px)',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
};

const Router: React.FC<IProps> = observer(() => (
    <div style={routerStyle}>
        <DocumentTitle title={RootStore.docTitle}>
            <Switch>
                <Route path="/platform" component={Platform} />
                <Route path="/permission-denied" component={PermissionDenied} />
                <Route path="/repair-record" component={RepairRecord} />
                <Route path="/about" component={About} />
                <Route exact path="/" component={Platform} />
                <Route component={NoMatch} />
            </Switch>
        </DocumentTitle>
    </div>
));

export default Router;
