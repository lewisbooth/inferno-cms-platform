import Component from "inferno-component";
import MenuSection from "./MenuSection";
import MenuItems from "../data/MenuItems";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: MenuItems,
      activeMenu: 0
    };
  }

  switchMenu(i) {
    this.setState({ activeMenu: i });
  }

  render() {
    const menuList = this.state.menus.map((menu, i) => {
      const active = this.state.menus[this.state.activeMenu].title;
      return (
        <li
          key={i}
          className={menu.title === active ? "active" : ""}
          onClick={() => this.switchMenu(i)}
        >
          {menu.title}
        </li>
      );
    });

    const activeMenu = this.state.menus[this.state.activeMenu];

    return (
      <div className="Menus page">
        <h2>Menus</h2>
        <ul className="Menus__list">
          {menuList}
          <li>Sunday Brunch Menu</li>
          <li>Dessert Menu</li>
          <li>Drinks Menu</li>
          <li>Christmas Menu</li>
        </ul>
        <div className="Menus__sections">
          <MenuSection
            title={activeMenu.title}
            downloadLink={activeMenu.pdf}
            blocks={activeMenu.blocks}
          />
        </div>
      </div>
    );
  }
}

export default Menu;
