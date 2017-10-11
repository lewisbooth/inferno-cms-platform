import Component from "inferno-component";
import MenuBlock from "./MenuBlock";

class MenuSection extends Component {
  constructor() {
    super();
    this.state = {
      filters: ["gluten free", "vegetarian", "vegan"],
      activeFilters: []
    };
  }

  toggleFilter(filter) {
    const newFilters = this.state.activeFilters;
    const filterIndex = newFilters.indexOf(filter);
    if (filterIndex >= 0) {
      newFilters.splice(filterIndex, 1);
      this.setState({ activeFilters: newFilters });
    } else {
      newFilters.push(filter);
      this.setState({ activeFilters: newFilters });
    }
  }

  filterMenu() {
    const blocks = JSON.parse(JSON.stringify(this.props.menu.blocks));
    // Bypass if no filters are active
    if (this.state.activeFilters.length === 0) return blocks;
    // Filters the menu for allergen tags, i.e vegetarian, gluten free
    const filteredBlocks = blocks
      .map(block => {
        const filteredSubheadings = block.subheadings
          .map(subheading => {
            const filteredItems = subheading.items.filter(item => {
              if (typeof item.tags === "undefined") return false;
              let match = 0;
              this.state.activeFilters.forEach(filter => {
                if (item.tags.includes(filter)) match++;
              });
              return match === this.state.activeFilters.length;
            });
            subheading.items = filteredItems;
            return subheading;
          })
          .filter(subheading => {
            return subheading.items.length > 0;
          });
        block.subheadings = filteredSubheadings;
        return block;
      })
      .filter(block => {
        return block.subheadings.length > 0;
      });
    return filteredBlocks;
  }

  render() {
    const menuBlocks = this.filterMenu().map(block => {
      return (
        <MenuBlock
          title={block.title}
          subheadings={block.subheadings}
          description={block.description}
        />
      );
    });
    const singleColumn = menuBlocks.length === 1 ? "single-column" : "";
    const filters = this.state.filters.map(filter => {
      const active = this.state.activeFilters.includes(filter) ? "active" : "";
      return (
        <li class={active} onClick={() => this.toggleFilter(filter)}>
          {filter}
        </li>
      );
    });
    return (
      <div className="MenuSection">
        <h3 className="MenuSection__title">{this.props.menu.title}</h3>
        <div className="MenuSection__options">
          <span>Filters:</span>
          <ul className="MenuSection__options--filters">{filters}</ul>
          <a
            href={this.props.menu.pdf}
            className="MenuSection__options--PDF"
            target="_blank"
          >
            <button className="Button__main">Download Menu</button>
          </a>
        </div>
        <div className={`MenuSection__blocks ${singleColumn}`}>
          {menuBlocks}
        </div>
      </div>
    );
  }
}

export default MenuSection;
