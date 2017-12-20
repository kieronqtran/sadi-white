
// Copyright 2004-present Facebook. All Rights Reserved.

/* eslint-disable no-unused-vars */

import React from 'react';
import FieldArrayForm from './fieldArrayForm'
import { reducer as formReducer } from 'redux-form'
import { createStore, combineReducers } from 'redux'
import {Provider} from 'react-redux'
import {Button} from 'react-bootstrap';

import renderer from 'react-test-renderer';

const reducer = combineReducers({
  form: formReducer,
})

const store = createStore(reducer)

describe('fieldArrayForm', () => {
  it('should render', () => {
    const form = renderer
      .create(<Provider store={store}><FieldArrayForm/></Provider>)
      .toJSON();

    expect(form).toMatchSnapshot();
  });
})
