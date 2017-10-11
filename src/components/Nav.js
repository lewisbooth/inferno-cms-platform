import { Link, IndexLink } from "inferno-router";
import Component from "inferno-component";

class Nav extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      pages: {
        home: null,
        menus: null,
        gallery: null,
        careers: "https://parogonpubs.co.uk/jobs/",
        contact: null
      }
    };
  }

  componentWillMount() {
    this.setState({
      currentPage: this.getPage()
    });
  }

  getPage() {
    return this.context.router.location.pathname.replace("/", "");
  }

  componentDidUpdate() {
    const currentPage = this.getPage();
    if (currentPage !== this.state.currentPage) {
      this.setState({
        currentPage
      });
    }
  }

  render() {
    return (
      <div className="Nav">
        <video
          autoplay
          loop
          className="Nav__background-image"
          poster="/videos/orange-tree-header-loop-video.jpg"
        >
          <source src="/videos/orange-tree-header-loop-video.mp4" />
        </video>
        <div className="Nav__wrapper">
          <IndexLink>
            <img
              src="/images/orange-tree-logo.svg"
              alt="Orange Tree Logo"
              className="Nav__main-logo"
            />
          </IndexLink>
          <ul className="Nav__wrapper--menu">
            {Object.keys(this.state.pages).map(page => {
              const link = page === "home" ? "" : page;
              const href = this.state.pages[page];
              const active = link === this.state.currentPage ? "active" : "";
              return (
                <li>
                  {href === null ? (
                    <Link className={active} to={`/${link}`}>
                      {page}
                    </Link>
                  ) : (
                    <a href={href} target="_blank">
                      {page}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Nav;
