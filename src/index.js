import Inferno from 'inferno';
import { Router, Route, IndexRoute } from 'inferno-router';
import createBrowserHistory from 'history/createBrowserHistory';
import Main from './components/Main';
import Home from './components/Home';
import Contact from './components/Contact';
import Portfolio from './components/Portfolio';
import './styles.css';

const browserHistory = createBrowserHistory();

const routes = (
  <Router history={ browserHistory }>
    <Route component={ Main }>
        <IndexRoute component={ Home }/>
        <Route path="portfolio" component={ Portfolio }/>
        <Route path="contact" component={ Contact }/>
        <Route component={ Home }/>
    </Route>
  </Router>
);
 
// Render HTML on the browser 
Inferno.render(routes, document.getElementById('app'));