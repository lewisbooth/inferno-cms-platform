import Component from 'inferno-component';

class Portfolio extends Component {
  render() {
    return (
      <div className="Portfolio">
        <p>This is the portfolio page</p>
        {this.props.children}
      </div>
    );
  }
}

export default Portfolio;
