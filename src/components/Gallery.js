import Component from 'inferno-component';
import GalleryImage from './GalleryImage';
import GalleryEditItem from './GalleryEditItem';
import GalleryAddItem from './GalleryAddItem';
import Lightbox from './Lightbox';
import axios from 'axios';

class Gallery extends Component {

  constructor(props) {
    super(props);
    this.galleryApi = 'http://localhost:1337/api/gallery'
    this.removeItem = this.removeItem.bind(this);
    this.handleLightbox = this.handleLightbox.bind(this);
    this.state = {
      galleryItems: [],
      lightbox: null,
      editItem: null,
      addItem: null,
      dragging: null
    }
  }

  componentDidMount() {    
    this.getGallery()
  }
  
  getGallery() {    
    axios.get(this.galleryApi)
         .then(res => {
            if (typeof(res.data.images) !== undefined) {
              this.setState({ galleryItems: res.data.images })
            } else {
              this.setState({ galleryItems: [] })
            }
          })
          .catch(err => {
            console.log(err)
          })
  }
  
  postGallery(newGalleryItems) {    
    axios.post(this.galleryApi, newGalleryItems)
         .then(res => {
            if (typeof(res.data.images) !== undefined) {
              this.setState({ galleryItems: res.data.images })
            } else {
              this.setState({ galleryItems: [] })
            }
          })
          .catch(err => {
            console.log(err)
          })
  }

  removeItem(index) {
    const { galleryItems } = this.state
    galleryItems.splice(index, 1)
    this.postGallery(galleryItems)
  }
  
  addItem(enabled = true) {
    this.setState({ addItem: enabled })
  }

  editItem(index) {
    this.setState({ editItem: index })
  }

  handleLightbox(index) {
    // Loop around start/end of array
    if (index >= this.state.galleryItems.length) { index = 0 }
    if (index < 0) { index = this.state.galleryItems.length - 1 }
    this.setState({ lightbox: index })
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
    if (dragging === dropIndex) return;
    const draggedItem = galleryItems.splice(dragging, 1);
    galleryItems.splice(dropIndex, 0, draggedItem[0]);
    this.setState({ 
      dragging: null 
    })
    e.target.classList.remove('drag-over')
    this.postGallery(galleryItems)
  }  

  render() {
    const galleryItems = this.state.galleryItems.map((entry, i) => {
      return ( 
        <GalleryImage key={ i }
                      num={ i }
                      slug={ entry.slug }
                      alt={ entry.description }
                      delete={ this.removeItem.bind(this) }
                      editItem={ this.editItem.bind(this) }
                      handleLightbox={ this.handleLightbox.bind(this) }
                      handleDragStart={ this.handleDragStart.bind(this) }
                      handleDragEnter={ this.handleDragEnter.bind(this) }
                      handleDragLeave={ this.handleDragLeave.bind(this) }
                      handleDragOver={ this.handleDragOver.bind(this) }
                      handleDrop={ this.handleDrop.bind(this) } />
      )
    })
    return (
      <div className="Gallery page">
        <div className="page-container">
          <h2>Gallery</h2>
          { this.state.lightbox !== null ? 
            <Lightbox imgData={ this.state.galleryItems[this.state.lightbox] } handleLightbox={ this.handleLightbox.bind(this) } num={ this.state.lightbox } /> 
          : null }        
          { this.state.editItem !== null ? 
            <GalleryEditItem imgData={ this.state.galleryItems[this.state.editItem] } editItem={ this.editItem.bind(this) } num={ this.state.editItem } /> 
          : null }
          { this.state.addItem !== null ? 
            <GalleryAddItem imgData={ this.state.galleryItems[this.state.addItem] } addItem={ this.addItem.bind(this) } num={ this.state.addItem } /> 
          : null }
          <div className="Gallery__items">
            { galleryItems }
            <div className="Gallery__items--block">
              <button onClick={ () => this.addItem() } className='Gallery__items--block--add-item'>
                <div className="Gallery__items--block--add-item--inner">
                  <span className='Gallery__items--block--add-item--inner--plus'>+</span><br />
                  <span className='Gallery__items--block--add-item--inner--text'>Add Image</span>
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