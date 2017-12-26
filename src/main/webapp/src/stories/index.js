import React from 'react';

import {
  Grid,
  Row,
  Col,
  Table,
  Button,
  Modal,
  OverlayTrigger,
  Tab,
  Nav,
  NavItem,
  FormGroup,
  Radio,
  FormControl,
  ControlLabel,
  InputGroup
} from "react-bootstrap";
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { Provider } from 'react-redux'

import { createStore, applyMiddleware, combineReducers } from 'redux'
import { reducer as formReducer } from "redux-form";

import { composeWithDevTools } from 'redux-devtools-extension'

import thunk from 'redux-thunk'

import FieldArrayForm from "../containers/TestManagement/components/fieldArrayForm";
import combinedReducer from "../reducers/index";
import Countdown from "../views/Test/components/Countdown";

import '../assets/css/bootstrap.min.css'
import '../assets/css/animate.min.css'
import '../assets/sass/light-bootstrap-dashboard.css'
import '../assets/css/demo.css'
import '../assets/css/pe-icon-7-stroke.css'
import CountDown from '../views/Test/components/Countdown';

const store = createStore(
  combineReducers({form: formReducer}),
  composeWithDevTools(applyMiddleware(thunk)),
)

storiesOf('Admin Test', module)
  .add('create a Test', () =>
  <Provider store={store}>
    <Row>
      <Col md={12}>
        <Modal show={true} dialogClassName="custom-modal">
          <Modal.Header>
            <Modal.Title>Test form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FieldArrayForm/>
          </Modal.Body>
        </Modal>
      </Col>
    </Row>
  </Provider>)

storiesOf('Countdown', module)
  .add('countdown component', () => {
    let countdownCom = {};
    return (<div>
              <button onClick={() => countdownCom.startTimer()}>Start Timer</button>
              <CountDown
                ref={instance => {countdownCom = instance;}}
                seconds={60}
                onTick={(timeLeft) => console.log('Timeleft: ', timeLeft)}
                onComplete={() => console.log('done')}/>
            </div>)})
