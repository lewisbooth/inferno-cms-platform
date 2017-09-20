import Component from "inferno-component";
import { cloneElement } from "inferno-compat";
import AdminBar from "./AdminBar";
import ParogonNav from "./ParogonNav";
import Nav from "./Nav";
import Newsletter from "./Newsletter";
import Footer from "./Footer";
import ToastMessage from "./ToastMessage";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      versionNumber: "0.1",
      loggedIn: false,
      editMode: false,
      notFound: false,
      toastMessages: []
    };
  }

  toggleEdit() {
    this.setState({
      editMode: !this.state.editMode
    });
  }

  signOut() {
    this.setState({
      loggedIn: false,
      editMode: false
    });
  }

  signIn() {
    this.setState({
      loggedIn: true,
      editMode: false
    });
  }

  toast(type = "success", message = "Successfully updated") {
    if (type !== ("success" || "error") || typeof message !== "string") {
      return;
    }
    let { toastMessages } = this.state;
    const timestamp = new Date().getTime();
    toastMessages.push({ type, message, timestamp });
    this.setState(toastMessages);
  }

  popToast(timestamp) {
    let { toastMessages } = this.state;
    const index = toastMessages.findIndex(
      message => message.timestamp === timestamp
    );
    if (index >= 0) {
      toastMessages.splice(index, 1);
      this.setState(toastMessages);
    } else {
      return;
    }
  }

  render() {
    const { editMode, versionNumber, loggedIn } = this.state;
    const toastMessages = this.state.toastMessages.map((toast, i) => {
      return (
        <ToastMessage
          key={toast.timestamp}
          toast={toast}
          popToast={this.popToast.bind(this)}
        />
      );
    });
    // Clones child page to pass down props
    const currentPage = cloneElement(this.props.children, {
      editMode,
      versionNumber,
      toast: this.toast.bind(this)
    });
    // Global classes
    const editClass = editMode ? " editing" : "";
    const adminClass = loggedIn ? " admin" : "";
    return (
      <div className={"Main" + editClass + adminClass}>
        <div className="ToastMessages">{toastMessages}</div>
        <ParogonNav />
        <Nav />
        {currentPage}
        <Newsletter />
        <Footer
          versionNumber={versionNumber}
          loggedIn={loggedIn}
          signIn={this.signIn.bind(this)}
        />
        {loggedIn ? (
          <AdminBar
            editMode={editMode}
            versionNumber={versionNumber}
            signOut={this.signOut.bind(this)}
            toast={this.toast.bind(this)}
            toggleEdit={this.toggleEdit.bind(this)}
          />
        ) : null}
      </div>
    );
  }
}

export default Main;
