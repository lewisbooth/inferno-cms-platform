import Component from 'inferno-component'
import { cloneElement } from 'inferno-compat'
import AdminBar from './AdminBar'
import Nav from './Nav'
import Footer from './Footer'

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
      editMode: !this.state.editMode
    })
  }

  render() {
    // Clones children to pass down the editMode state 
    const currentPage = cloneElement(this.props.children, { editMode: this.state.editMode })
    const editClass = this.state.editMode ? 'editing' : '' 
    return (
      <div className={ 'Main' + editClass }>
        {this.state.loggedIn ? 
          <AdminBar editMode={ this.state.editMode } toggleEdit={ this.toggleEdit.bind(this) } /> : null
        }
        <Nav /> 
        { currentPage }
        <Footer />
      </div>
    );
  }
}

export default Main;