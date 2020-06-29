import * as React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import Cookie from 'js-cookie';
import { RadioChangeEvent } from 'antd/lib/radio/interface';

import { PageHeader, Radio, Tooltip } from 'antd';
import { UnorderedListOutlined, FolderOutlined } from '@ant-design/icons';

import './PageHeaderWithViewToggle.scss';

export type VIEWS = 'card' | 'list';

interface IProps extends WithTranslation {
  title: string;
  subtitle?: string;
  disableChangeView?: boolean;

  onViewChange?: (view: VIEWS) => boolean | undefined;
}

const viewHobbyDispatcher = (state: VIEWS, action: RadioChangeEvent | VIEWS) => {
  let value: VIEWS;
  if (typeof action === 'string') {
    value = action;
  } else {
    value = action.target.value;
  }
  Cookie.set('view', value);
  return value;
}

const PageHeaderWithViewToggle: React.SFC<IProps> = props => {
  const [viewHobby, setViewHobby] = React.useReducer(viewHobbyDispatcher, 'list');

  React.useEffect(() => {
    const view = Cookie.get('view') || 'list';
    setViewHobby(view);
  }, []);

  React.useEffect(() => {
    if (props.onViewChange) {
      props.onViewChange(viewHobby);
    }
  }, [viewHobby]);

  const renderChangeViewButtons = React.useMemo<JSX.Element>(() => (
    props.disableChangeView ? null : (
      <div className={'radio-box'}>
        <Radio.Group className={'radios'} onChange={setViewHobby.bind(this)} buttonStyle={'solid'} value={viewHobby}>
          <Tooltip title={props.t('列表视图')}>
            <Radio.Button value={'list'}>
              <UnorderedListOutlined />
            </Radio.Button>
          </Tooltip>
          <Tooltip title={props.t('卡片视图')}>
            <Radio.Button value={'card'}>
              <FolderOutlined />
            </Radio.Button>
          </Tooltip>
        </Radio.Group>
      </div>
    )
  ), [props.disableChangeView, viewHobby]);

  const render = React.useMemo<JSX.Element>(
    () => (
      <header className={'page-header-with-view-toggle'}>
        <PageHeader title={props.title} subTitle={props.subtitle || ''} />
        {renderChangeViewButtons}
      </header>
    ),
    [props.title, props.subtitle, props.i18n.language, viewHobby]
  );

  return render;
};

export default withTranslation()(PageHeaderWithViewToggle);
