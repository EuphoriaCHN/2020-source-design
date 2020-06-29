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

  onViewChange?: (view: VIEWS) => boolean | undefined;
}

const PageHeaderWithViewToggle: React.SFC<IProps> = props => {
  const viewHobbyDispatcher = React.useCallback<(state: VIEWS, action: RadioChangeEvent | VIEWS) => VIEWS>(
    (state, action) => {
      let value: VIEWS;
      if (typeof action === 'string') {
        value = action;
      } else {
        value = action.target.value;
      }
      Cookie.set('view', value);
      if (props.onViewChange) {
        props.onViewChange(value);
      }
      return value;
    },
  [props.onViewChange]
  );
  const [viewHobby, setViewHobby] = React.useReducer(viewHobbyDispatcher, 'list');

  React.useEffect(() => {
    const view = Cookie.get('view') || 'list';
    setViewHobby(view);
  }, []);

  const render = React.useMemo<JSX.Element>(
    () => (
      <header className={'page-header-with-view-toggle'}>
        <PageHeader title={props.title} subTitle={props.subtitle || ''} />
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
      </header>
    ),
    [props.title, props.subtitle, props.i18n.language, viewHobby]
  );

  return render;
};

export default withTranslation()(PageHeaderWithViewToggle);
