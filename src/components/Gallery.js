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
      lightbox: null,
      dragging: null
    }
  }

  removeItem(index) {
    const { galleryItems } = this.state;
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
    // Loop around start/end of array
    if (index >= this.state.galleryItemsLength) { index = 0 }
    if (index < 0) { index = this.state.galleryItemsLength - 1 }
    let lightbox = enabled ? index : null
    this.setState({ lightbox })
  }

  handleDragStart(e, imageIndex) {
    this.setState({ dragging: imageIndex })
    e.dataTransfer.effectAllowed = 'move';
  }

  handleDragEnter(e, imageIndex) {
    e.preventDefault();
    e.target.classList.add('drag-over')
  }

  handleDragLeave(e, imageIndex) {
    e.preventDefault();
    e.target.classList.remove('drag-over')
  }

  handleDragOver(e) {
    e.preventDefault();
  }

  handleDrop(e, dropIndex) {
    const { galleryItems, dragging } = this.state;
    const draggedItem = galleryItems.splice(dragging, 1);
    galleryItems.splice(dropIndex, 0, draggedItem[0]);
    this.setState({ 
      galleryItems,
      dragging: null 
    })
    e.target.classList.remove('drag-over')
  }  

  render() {
    const galleryItems = this.state.galleryItems.map((entry, i) => {
      return ( i < this.state.galleryItemsLength ?
        <GalleryImage key={ i } 
                      num={ i }
                      img={ entry } 
                      delete={ this.removeItem.bind(this) } 
                      handleLightbox={ this.handleLightbox.bind(this) } 
                      handleDragStart={ this.handleDragStart.bind(this) } 
                      handleDragEnter={ this.handleDragEnter.bind(this) } 
                      handleDragLeave={ this.handleDragLeave.bind(this) } 
                      handleDragOver={ this.handleDragOver.bind(this) } 
                      handleDrop={ this.handleDrop.bind(this) } /> : null
        )
      });
    return (
      <div className="Gallery page">
        <div className="page-container">
          <h2>Gallery</h2>
          { this.state.lightbox !== null ? 
            <Lightbox imgData={ this.state.galleryItems[this.state.lightbox] } handleLightbox={ this.handleLightbox.bind(this) } num={ this.state.lightbox } /> 
          : null }        
          <div className="Gallery__items">
            { galleryItems }
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