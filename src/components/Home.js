import Component from "inferno-component";
import LatestNews from "./LatestNews";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      oldMeetsNew: "about"
    };
  }
  render() {
    return (
      <div className="Home page">
        <img
          className="Home__old-meets-new"
          src={`/mockup/home-old-meets-new-${this.state.oldMeetsNew}.png`}
          alt=""
        />
        <LatestNews />
      </div>
    );
  }
}

export default Home;
