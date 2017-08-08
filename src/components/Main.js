import { Link, IndexLink } from 'inferno-router';
import Component from 'inferno-component';
import Footer from './Footer';

class Main extends Component {

  render() {
 
    return (
      <div className="App">
        <div className="Nav">
          <h1> 
            <IndexLink>Inferno CMS</IndexLink>
          </h1>
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
        <Footer />
      </div>
    );
  }
}

export default Main;