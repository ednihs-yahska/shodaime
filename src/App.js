import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

import Window from './Window';
import Tetris from './tetris';
import Breakout from './breakout/Breakout'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Window} />
              <Route path="/tetris" component={Tetris} />
              <Route path="/breakout" component={Breakout} />
            </Switch>
          </BrowserRouter>
        </header>
      </div>
    );
  }
}

export default App;
