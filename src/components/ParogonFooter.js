import Component from "inferno-component";

class ParogonFooter extends Component {
  render() {
    return (
      <div className="ParogonFooter">
        <div className="ParogonFooter__parogon-pubs">
          <h5>Proudly part of the </h5>
          <h4>Parogon Pub Group</h4>
          <div className="ParogonFooter__parogon-pubs--logos page-container">
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

export default ParogonFooter;
