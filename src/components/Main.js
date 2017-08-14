import Component from 'inferno-component';
import Nav from './Nav';
import Footer from './Footer';

class Main extends Component {

  render() {
 
    return (
      <div className="Main">
        <Nav /> 
        { this.props.children }
        <Footer />
      </div>
    );
  }
}


export default Main;