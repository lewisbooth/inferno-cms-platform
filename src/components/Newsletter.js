import Component from "inferno-component";

class Newsletter extends Component {
  newsletterSignup(e) {
    e.preventDefault();
    console.log(e);
  }

  render() {
    return (
      <div className="Newsletter">
        <div className="page-container">
          <h4>
            Want the latest news and offers?{" "}
            <span className="bold-orange">Join our newsletter</span>
          </h4>
          <form onSubmit={e => this.newsletterSignup(e)}>
            <label hidden htmlFor="email">
              Email Address
            </label>
            <input type="email" name="email" placeholder="Email address" />
            <button className="Button__main" type="submit">
              ✔
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Newsletter;
