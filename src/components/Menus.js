import Component from 'inferno-component';
import MenuSection from './MenuSection';
import MenuItems from '../data/MenuItems';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'menus': MenuItems        
    }    
  }

  render() {

    const menuSections = this.state.menus.map((menu, i) => {
      return <MenuSection title={ menu.title } downloadLink={ menu.pdf } blocks={ menu.blocks } key={ i }/>
    })

    return (
      <div className="Menu page">
        <h2>Menus</h2>
        <div className="Menu__sections">
          { menuSections }
        </div>
      </div>
    );
  }
}

export default Menu;