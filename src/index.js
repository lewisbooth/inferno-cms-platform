import Inferno from 'inferno';
import { Router, Route, IndexRoute } from 'inferno-router';
import createBrowserHistory from 'history/createBrowserHistory';
import Main from './components/Main';
import Home from './components/Home';
import Contact from './components/Contact';
import Gallery from './components/Gallery';
import Menus from './components/Menus';
import './styles.css';

const browserHistory = createBrowserHistory();

const routes = (
  <Router history={ browserHistory }>
    <Route component={ Main }>
        <IndexRoute component={ Home }/>
        <Route path="menus" component={ Menus }/>
        <Route path="gallery" component={ Gallery }/>
        <Route path="contact" component={ Contact }/>
        <Route path="*" component={ Home }/> 
    </Route>
  </Router>
);
 
Inferno.render(routes, document.getElementById('app'));