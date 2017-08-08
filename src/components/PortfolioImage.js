import Component from 'inferno-component';

class PortfolioImage extends Component {

  constructor(props) {
    super(props);
    this.state = { imageStatus: 'loading' }
  }

  handleImageLoaded() {
    this.setState( { imageStatus: 'loaded' } )
  }

  render() {
    const deleteItem = this.props.delete;
    const handleLightbox = this.props.handleLightbox;
    return(
      <div className="Portfolio__items--block">
        <img className={'Portfolio__items--block--image ' + this.state.imageStatus } src={ `https://source.unsplash.com/${this.props.img}/200x200`} alt='Very interesting' onLoad={ this.handleImageLoaded.bind(this) } onClick={ () => handleLightbox(true, this.props.num) }/>
        <button onClick={ () => deleteItem(this.props.num) } className="Portfolio__items--block--remove-item">✕</button>
        <div className="Portfolio__items--block--remove-item--caption">
          Remove Item
        </div>
      </div>
    )
  }
}

export default PortfolioImage