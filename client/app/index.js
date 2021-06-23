import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import NotFound from './components/App/NotFound';

import Home from './components/Home/Home';
import Repos from './components/Repos/Repos';
import Commits from './components/Commits/Commits';

import HelloWorld from './components/HelloWorld/HelloWorld';

import './styles/styles.scss';

import 'bootstrap/dist/css/bootstrap.min.css';

render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/repos/:login" component={Repos} />
        <Route exact path="/commits/:login/:repo" component={Commits} />
        <Route path="/helloworld" component={HelloWorld} />
        <Route component={NotFound} />
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));
