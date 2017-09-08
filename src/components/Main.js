import Component from 'inferno-component';
import AdminBar from './AdminBar';
import Nav from './Nav';
import Footer from './Footer';

class Main extends Component {

  constructor() {
    super();
    this.state = {
      loggedIn: false,
      editMode: false,
      notFound: false
    }
  }

  toggleEdit() {
    this.setState({
      adminActive: !this.state.adminActive
    })
  }

  render() { 
    return (
      <div className="Main">
        {this.state.loggedin ? 
          <AdminBar editMode={ this.state.editMode } toggleEdit={ this.toggleEdit.bind(this) } /> : null
        }
        <Nav /> 
        { this.props.children }
        <Footer />
      </div>
    );
  }
}


export default Main;