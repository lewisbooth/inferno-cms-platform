import Component from 'inferno-component';

class GalleryImage extends Component {

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
      <div className="Gallery__items--block" draggable="true">
        <img className={'Gallery__items--block--image ' + this.state.imageStatus } src={ this.props.img[0] + '-300x300.jpg' } alt='Very interesting' onLoad={ this.handleImageLoaded.bind(this) } onClick={ () => handleLightbox(true, this.props.num) }/>
        <button onClick={ () => deleteItem(this.props.num) } className="Gallery__items--block--remove-item">✕</button>
        <div className="Gallery__items--block--remove-item--caption">
          Remove Item
        </div>
      </div>
    )
  }
}

export default GalleryImage