import Component from 'inferno-component';
import AdminBar from './AdminBar';
import Nav from './Nav';
import Footer from './Footer';

class Main extends Component {

  constructor() {
    super();
    this.state = {
      loggedIn: true,
      editMode: true,
      notFound: false
    }
  }

  toggleEdit() {
    this.setState({
      adminActive: !this.state.adminActive
    })
  }

  render() {
    const editClass = this.state.editMode ? 'editing' : '' 
    return (
      <div className={ 'Main' + editClass }>
        {this.state.loggedIn ? 
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