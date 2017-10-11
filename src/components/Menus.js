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
    // const menuList = this.state.menus.map((menu, i) => {
    //   const active = this.state.menus[this.state.activeMenu].title;
    //   return (
    //     <li
    //       key={i}
    //       className={menu.title === active ? "active" : ""}
    //       onClick={() => this.switchMenu(i)}
    //     >
    //       {menu.title}
    //     </li>
    //   );
    // });
    return (
      <div className="Menus page">
        <h2>Menus</h2>
        <div className="Menus__selection page-container">
          <div className="Menus__selection--menu">
            <img src={`/images/menu/covers/christmas-menu-cover.jpg`} alt="" />
            <div className="Menus__selection--menu--caption">Christmas</div>
            <div className="Menus__selection--menu--new">NEW</div>
          </div>
          <div className="Menus__selection--menu active">
            <img src={`/images/menu/covers/main-menu-cover.jpg`} alt="" />
            <div className="Menus__selection--menu--caption">Main Menu</div>
          </div>
          <div className="Menus__selection--menu">
            <img
              src={`/images/menu/covers/sunday-brunch-menu-cover.jpg`}
              alt=""
            />
            <div className="Menus__selection--menu--caption">Sunday Brunch</div>
          </div>
          <div className="Menus__selection--menu">
            <img src={`/images/menu/covers/desserts-menu-cover.jpg`} alt="" />
            <div className="Menus__selection--menu--caption">Desserts</div>
          </div>
          <div className="Menus__selection--menu">
            <img src={`/images/menu/covers/drinks-menu-cover.jpg`} alt="" />
            <div className="Menus__selection--menu--caption">Drinks</div>
          </div>
        </div>
        <ul className="Menus__list" />
        <div className="Menus__sections">
          <MenuSection menu={this.state.menus[this.state.activeMenu]} />
        </div>
      </div>
    );
  }
}

export default Menu;
