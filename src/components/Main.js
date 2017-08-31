import Component from 'inferno-component';
import AdminBar from './AdminBar';
import Nav from './Nav';
import Footer from './Footer';

class Main extends Component {

  constructor() {
    super();
    this.state = {
      adminActive: false,
      notFound: false
    }
  }

  render() { 
    return (
      <div className="Main">
        { this.state.adminActive ? <AdminBar /> : null }
        <Nav /> 
        { this.props.children }
        <Footer />
      </div>
    );
  }
}


export default Main;