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
          <h4>Join the Parogon newsletter for weekly news & special offers</h4>
          <form onSubmit={e => this.newsletterSignup(e)}>
            <label htmlFor="Name">Name:</label>
            <input type="text" name="Name" />
            <label htmlFor="email">Email Address:</label>
            <input type="email" name="email" />
            <button className="Button__main" type="submit">
              Sign up
            </button>
          </form>
        </div>
        <div className="Newsletter__parogon-pubs">
          <h5>Part of the </h5>
          <h4>Parogon Pub Group</h4>
          <div className="Newsletter__parogon-pubs--logos page-container">
            <img
              src="/images/parogon/orange-tree-logo-grey.png"
              alt="Orange Tree Logo"
            />
            <img
              src="/images/parogon/swan-with-two-necks-logo-grey.png"
              alt="Swan With Two Necks Logo"
            />
            <img
              src="/images/parogon/wayfarer-logo-grey.png"
              alt="Wayfarer Logo"
            />
            <img
              src="/images/parogon/blockhouse-logo-grey.png"
              alt="Blockhouse Logo"
            />
            <img
              src="/images/parogon/boars-head-logo-grey.png"
              alt="Boars Head Logo"
            />
            <img
              src="/images/parogon/seven-stars-logo-grey.png"
              alt="Seven Stars Logo"
            />
            <img
              src="/images/parogon/broughton-arms-logo-grey.png"
              alt="Broughton Arms Logo"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Newsletter;
