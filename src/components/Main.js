import { Link, IndexLink } from 'inferno-router';
import Component from 'inferno-component';
import Footer from './Footer';

class Main extends Component {

  constructor(props, context) {
    super(props, context) 
    var navImage = this.context.router.location.pathname.replace('/', '-')
    if (navImage === '-') navImage = '';
    this.state = {
      navImage
    }
  }

  componentDidUpdate() {
    var newNavImage = this.context.router.location.pathname.replace('/', '-')
    if (newNavImage === '-') newNavImage = '';
    if (newNavImage !== this.state.navImage) {
      this.setState({ navImage: newNavImage })
    }
  }

  render() {
 
    return (
      <div className="Main">
        <div className="Nav" style={ `background-image: url('/images/nav-background${this.state.navImage}.jpg')` }>
          <IndexLink>
            <img src="/images/orange-tree-logo.jpg" alt="Orange Tree Logo" className="Nav__main-logo"/>
          </IndexLink>
          <ul className="Nav__menu">
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/gallery'>Gallery</Link>
            </li>
            <li>
              <Link to='/contact'>Contact</Link>
            </li>
          </ul>
        </div>
        { this.props.children }
        <Footer />
      </div>
    );
  }
}


export default Main;