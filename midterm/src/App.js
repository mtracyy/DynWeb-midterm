import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

import ColorChoice from './components/ColorChoice';
import Home from './pages/Home';

function App() {
  return (
    <div className="SiteWrapper">
        <ColorChoice/>
        <Router>
            <Switch>
                <Route path="/">
                   <Home/>
                </Route>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
