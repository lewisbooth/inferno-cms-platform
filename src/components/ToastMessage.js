import Component from "inferno-component";

class ToastMessage extends Component {
  constructor() {
    super();
    this.state = {
      active: false,
      leave: false
    };
  }

  componentDidMount() {
    if (this.state.active === false) {
      setTimeout(() => {
        this.setState({ active: true });
      }, 20);
      setTimeout(() => {
        this.setState({ leave: true });
      }, 5000);
      setTimeout(() => {
        this.props.popToast(this.props.toast.timestamp);
      }, 5300);
      return;
    }
  }

  closeToast() {
    console.log("wat");
    if (this.state.leave === true) return;
    this.setState({ leave: true });
    setTimeout(() => {
      this.props.popToast(this.props.toast.timestamp);
    }, 300);
  }

  render() {
    const { toast } = this.props;
    const activeClass = this.state.active === true ? "active" : "";
    const leaveClass = this.state.leave === true ? "leave" : "";
    return (
      <div
        className={`ToastMessages__message ${toast.type} ${activeClass} ${leaveClass}`}
        onClick={this.closeToast.bind(this)}
      >
        <button className="ToastMessages__message--close">✕</button>
        <p>{toast.message}</p>
      </div>
    );
  }
}

export default ToastMessage;
