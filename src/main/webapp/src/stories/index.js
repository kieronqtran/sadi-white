import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { Provider } from 'react-redux'
import { Button, Welcome } from '@storybook/react/demo';

import { createStore, applyMiddleware } from 'redux'

import { composeWithDevTools } from 'redux-devtools-extension'

import thunk from 'redux-thunk'

import FieldArrayForm from "../containers/AdminTest/components/fieldArrayForm";
import combinedReducer from "../reducers/index";


import '../assets/css/bootstrap.min.css'
import '../assets/css/animate.min.css'
import '../assets/sass/light-bootstrap-dashboard.css'
import '../assets/css/demo.css'
import '../assets/css/pe-icon-7-stroke.css'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

  const store = createStore(
    combinedReducer,
    composeWithDevTools(applyMiddleware(thunk)),
  )

storiesOf('Admin Test', module)
  .add('create a Test', () => <Provider store={store}><FieldArrayForm/></Provider>)
