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
        <div className="AdminBar__profile">
          <img src="/images/users/lewisbooth.jpg" alt="" className="AdminBar__profile--image"/>
          <div className="AdminBar__profile--greeting">
            <h4>Hello, Lewis</h4>
            <p>Sign Out</p>
          </div>
        </div>
        <div className="AdminBar__status">
          <h4>{ editMode ? 'Edit mode enabled' : ' ' }</h4>
          <p>AMP CMS v0.0.1</p>
        </div>
        <button className="Button__main AdminBar__toggle-edit" onClick={ this.props.toggleEdit }>
          { editMode ? 'Finish Editing ✔' : 'Edit page' }
        </button>
      </div>
    );
  }
}

export default AdminBar;