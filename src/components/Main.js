import { Link, IndexLink } from 'inferno-router';
import Component from 'inferno-component';
import Footer from './Footer';

class Main extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2> 
            <IndexLink>Inferno Boilerplate</IndexLink>
          </h2>
          <ul className="menu">
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/portfolio'>Portfolio</Link>
            </li>
          </ul>
        </div>
        <div className="Page-container">
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Main;