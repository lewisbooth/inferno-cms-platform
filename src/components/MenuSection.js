import Component from "inferno-component";
import MenuBlock from "./MenuBlock";

class MenuSection extends Component {
  constructor() {
    super();
    this.state = {
      filters: ["gluten free", "vegetarian", "vegan"]
    };
  }
  render() {
    const menuBlocks = this.props.blocks.map(block => {
      return (
        <MenuBlock
          title={block.title}
          items={block.items}
          description={block.description}
        />
      );
    });
    const filters = this.state.filters.map(filter => {
      return <li>{filter}</li>;
    });
    return (
      <div className="MenuSection">
        <h3 className="MenuSection__title">{this.props.title}</h3>
        <div className="MenuSection__options">
          <span>Filters:</span>
          <ul className="MenuSection__options--filters">{filters}</ul>
          <a
            href={this.props.downloadLink}
            className="MenuSection__options--PDF"
            target="_blank"
          >
            <button className="Button__main">Download PDF</button>
          </a>
        </div>
        <div className="MenuSection__blocks">{menuBlocks}</div>
      </div>
    );
  }
}

export default MenuSection;
