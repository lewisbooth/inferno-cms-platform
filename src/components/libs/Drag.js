import Component from 'inferno-component';

class Drag extends Component {
  render() {
    return (
      <div>
        { this.props.children }
      </div>
    )
  }
}

export default Drag;