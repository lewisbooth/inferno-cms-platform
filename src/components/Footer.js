import Component from "inferno-component";
import { Link } from "inferno-router";

class Footer extends Component {
  render() {
    return (
      <footer className="Footer page">
        <div className="page-container">
          <div className="Footer__column">
            <h5>Main Menu</h5>
            <ul className="Footer__column--menu">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/menus">Menus</Link>
              </li>
              <li>
                <Link to="/gallery">Gallery</Link>
              </li>
              <li>
                <a href="https://parogonpubs.co.uk/jobs/" target="_blank">
                  Jobs
                </a>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
            <p className="Footer__column--menu--copyright">
              &copy; Copyright{" "}
              <a href="https://parogonpubs.co.uk/" target="_blank">
                Parogon Pub Group
              </a>{" "}
              2017
            </p>
          </div>
          <div className="Footer__column">
            <h5>Find Us</h5>
            <p className="Footer__column--find-us">
              The Orange Tree Bar and Grill <br />
              Newcastle Road <br />
              Stoke on Trent <br />
              ST4 6PG <br />
            </p>
            <a class="no-underline" href="/contact">
              <button className="Button__main">
                <img
                  src="/images/icons/map-pin.svg"
                  alt="Get Directions on Map"
                />
                Get Directions
              </button>
            </a>
          </div>
          <div className="Footer__column">
            <h5>Contact Us</h5>
            <p className="Footer__column--contact-us">
              <a
                className="Footer__column--contact-us--phone-number"
                href="tel:+44782719222"
              >
                <img
                  src="/images/icons/phone-circle.svg"
                  alt=""
                  className="Footer__column--contact-us--icon"
                />
                <p>01782 719222</p>
              </a>
              <a href="mailto:info@theorangetreebarandgrill.co.uk">
                <img
                  src="/images/icons/email-circle.svg"
                  alt=""
                  className="Footer__column--contact-us--icon"
                />
                <p>info@theorangetreebarandgrill.co.uk</p>
              </a>
              <br />
            </p>
          </div>
        </div>
        <div className="Footer__AMP">
          <div className="page-container">
            <div className="Footer__AMP--credits">
              Designed &amp; Developed by{" "}
              <a href="https://amp.studio" target="_blank">
                ΛMP Studio
              </a>{" "}
              // ΛMP CMS v{this.props.versionNumber}
            </div>
            {!this.props.loggedIn ? (
              <div className="Footer__AMP--sign-in" onClick={this.props.signIn}>
                Sign in
              </div>
            ) : null}
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
