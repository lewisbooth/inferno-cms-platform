import Component from 'inferno-component';

class AdminBar extends Component {

  constructor() {
    super()
    this.state = {
      collapsed: false
    }
  }

  render() {
    const collapsedClass = this.state.collapsed ? 'collapsed' : null
    return (
      <div className={ 'AdminBar ' + collapsedClass }>
        <button className="AdminBar__login" onClick={ this.props.toggleEdit }>
          Edit page
        </button>
      </div>
    );
  }
}


export default AdminBar;