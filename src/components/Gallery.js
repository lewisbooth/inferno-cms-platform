import Component from 'inferno-component';
import { gallery } from '../data/orange-tree-gallery';
import GalleryImage from './GalleryImage';
import Lightbox from './Lightbox';

class Gallery extends Component {

  constructor(props) {
    super(props);
    this.removeItem = this.removeItem.bind(this);
    this.handleLightbox = this.handleLightbox.bind(this);
    this.state = {
      galleryItems: gallery,
      galleryItemsLength: 16,
      lightbox: null
    }
  }

  removeItem(index) {
    let galleryItems = this.state.galleryItems;
    galleryItems.splice(index, 1);
    this.setState ({
      galleryItems,
      galleryItemsLength: this.state.galleryItemsLength - 1
    })
  }

  addItem(num = 1) {
    this.setState({
      galleryItemsLength: this.state.galleryItemsLength + num
    })
  }

  handleLightbox(enabled = false, index) {
    if (index >= this.state.galleryItemsLength) { index = 0 }
    if (index < 0) { index = this.state.galleryItemsLength - 1 }
    let lightbox = enabled ? index : null
    this.setState({ lightbox })
  }

  render() {
    return (
      <div className="Gallery page">
        <div className="page-container">
          <h2>Gallery</h2>
          { this.state.lightbox !== null ? 
            <Lightbox imgData={ this.state.galleryItems[this.state.lightbox] } handleLightbox={ this.handleLightbox.bind(this) } num={ this.state.lightbox } /> 
          : '' }        
          <div className="Gallery__items">
            { this.state.galleryItems.map((entry, i) => {
              return (
                i < this.state.galleryItemsLength ?
                <GalleryImage key={ i } num={ i } img={ entry } delete={ this.removeItem.bind(this) } handleLightbox={ this.handleLightbox.bind(this) } />
                : null
              )
            })}
            <div className="Gallery__items--block">
              <button onClick={ () => this.addItem(1) } className='Gallery__items--block--add-item'>
                <div className="Gallery__items--block--add-item--inner">
                  <span className='Gallery__items--block--add-item--inner--plus'>+</span><br />
                  <span className='Gallery__items--block--add-item--inner--text'>Add Item</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Gallery;