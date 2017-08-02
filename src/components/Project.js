import Component from 'inferno-component';

class Project extends Component {
  render() {
    return (
      <div className="Project">
        <p>This is project { this.props.params.project }</p>
      </div>
    );
  }
}

export default Project;