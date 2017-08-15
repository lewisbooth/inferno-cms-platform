import Component from 'inferno-component';

class MenuBlock extends Component {
  
  render() {

    const MenuItem = (props) => {
      return (
        <li>
          <div className="MenuBlock__items--name">
            { props.title }
            { props.tags ? 
              <ItemTags tags={ props.tags } />
            : '' }
          </div>
          <div className="MenuBlock__items--price">
            £{ props.price }
          </div>
          <div className="MenuBlock__items--description">
            <em>{ props.description }</em>
          </div>
        </li>
      )
    }

    const ItemTags = (props) => {
      return (
        <span className='MenuBlock__items--allergens'>
          { props.tags.map(tag => {
            return (
              <img className="MenuBlock__items--allergens--tag" src={ `/images/menu/tag-${tag}.svg` } alt={ `This dish is suitable for: ${tag}` } />
            )
          }) }
        </span>
      )
    }

    const itemList = this.props.items.map(item => {
      const subHeading = Object.keys(item);
      return (
        <div className="MenuBlock__items--section">
          <p className="MenuBlock__items--subheading">{ subHeading }</p>
          { item[subHeading].map(subItem => {
            return <MenuItem title={ subItem.title } price={ subItem.price } description={ subItem.description } tags={ subItem.tags } />
          })}
        </div>
      )
    })

    return (
      <div className="MenuBlock">
        <h4 className='MenuBlock__title'>{ this.props.title }</h4>
        <h5 className='MenuBlock__description'>{ this.props.description }</h5>
        <ul className='MenuBlock__items'>
          { itemList }
        </ul>
      </div>
    );
  }
}

export default MenuBlock;