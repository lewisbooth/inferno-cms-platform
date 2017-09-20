import Component from "inferno-component";

class ParogonNav extends Component {
  render() {
    return (
      <div className="ParogonNav page">
        <div className="page-container">
          <a href="https://parogonpubs.co.uk" target="_blank">
            <img
              className="ParogonNav__main-logo"
              src="/images/parogon/parogon-logo.png"
              alt="Parogon Pub Group logo"
            />
          </a>
          <ul className="ParogonNav__pub-list">
            <a
              target="_blank"
              href="https://www.theorangetreebarandgrill.co.uk/"
            >
              <li className="ParogonNav__pub-list--item current">
                Orange Tree
              </li>
            </a>
            <a target="_blank" href="https://theswanwithtwonecks.co.uk/">
              <li className="ParogonNav__pub-list--item">
                Swan With Two Necks
              </li>
            </a>
            <a target="_blank" href="https://thewayfarerstone.co.uk/">
              <li className="ParogonNav__pub-list--item">Wayfarer</li>
            </a>
            <a target="_blank" href="https://theboarsheadnantwich.co.uk/">
              <li className="ParogonNav__pub-list--item">Boar's Head</li>
            </a>
            <a target="_blank" href="https://blockhousegrill.co.uk/">
              <li className="ParogonNav__pub-list--item">Blockhouse Grill</li>
            </a>
            <li className="ParogonNav__pub-list--item">Seven Stars</li>
            <li className="ParogonNav__pub-list--item">Broughton Arms</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default ParogonNav;
