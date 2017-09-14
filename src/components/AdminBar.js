import Component from 'inferno-component';

class AdminBar extends Component {

  constructor() {
    super()
    this.state = {
      collapsed: false
    }
  }

  render() {
    const { editMode } = this.props
    const editClass = editMode ? 'editing' : ''
    return (
      <div className={ 'AdminBar ' + editClass }>
        <button className="Button__main AdminBar__toggle-edit" onClick={ this.props.toggleEdit }>
          { editMode ? 'Finish Editing ✓' : 'Edit page' }
        </button>
      </div>
    );
  }
}


export default AdminBar;