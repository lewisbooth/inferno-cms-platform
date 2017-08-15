import Component from 'inferno-component';
import MenuBlock from './MenuBlock';

class MenuSection extends Component {
  
  render() {
    const menuBlocks = this.props.blocks.map(block => {
      return <MenuBlock title={ block.title } items={ block.items } description={ block.description } />
    })
    return (
      <div className="MenuSection">
        <h3 className='MenuSection__title'>{ this.props.title }</h3>
        <div className="MenuSection__blocks">
          { menuBlocks }
        </div>
      </div>
    );
  }
}

export default MenuSection;