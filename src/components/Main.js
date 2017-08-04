import { Link, IndexLink } from 'inferno-router';
import Component from 'inferno-component';
import Footer from './Footer';

class Main extends Component {

  render() {
 
    return (
      <div className="App">
        <div className="Nav" style='background-image: '>
          <h2> 
            <IndexLink>Inferno Router Boilerplate</IndexLink>
          </h2>
          <ul className="menu">
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/portfolio'>Portfolio</Link>
            </li>
            <li>
              <Link to='/contact'>Contact</Link>
            </li>
          </ul>
        </div>
        <div className="page-container">
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default Main;