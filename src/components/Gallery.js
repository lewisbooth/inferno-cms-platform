import Component from 'inferno-component';
import GalleryImage from './GalleryImage';
import Lightbox from './Lightbox';
import EditItem from './EditItem';
import axios from 'axios';

class Gallery extends Component {

  constructor(props) {
    super(props);
    this.removeItem = this.removeItem.bind(this);
    this.handleLightbox = this.handleLightbox.bind(this);
    this.state = {
      galleryItems: [],
      lightbox: null,
      editItem: null,
      dragging: null
    }
  }

  componentDidMount() {
    axios.get('http://localhost:1337/api/gallery')
         .then(res => {
           console.log(res.data)
           this.setState({ galleryItems: res.data.images })
         })
         .catch(err => {
           console.log(err)
         })
  }

  removeItem(index) {
    const { galleryItems } = this.state
    galleryItems.splice(index, 1)
    axios.post('http://localhost:1337/api/gallery', galleryItems)
         .then(res => {
           console.log('Gallery updated successfully')
           this.setState({ galleryItems: res.data.images })
         })
         .catch(err => {
           console.log(err)
         })
  }
  
  addItem(num = 1) {
    const newItem = {
      tags: ['bar', 'drinks'],
      slug: 'orange-tree-alcohol-selection',
      description: 'Alcohol Selection'
    }
    let { galleryItems } = this.state
    let newGalleryItems = galleryItems.concat(newItem)
    axios.post('http://localhost:1337/api/gallery', newGalleryItems)
         .then(res => {
           console.log('Gallery updated successfully')
           this.setState({ galleryItems: res.data.images })
         })
         .catch(err => {
           console.log(err)
         })
  }

  editItem(index) {
    this.setState({ editItem: index })
  }

  handleLightbox(index) {
    // Loop around start/end of array
    if (index >= this.state.galleryItemsLength) { index = 0 }
    if (index < 0) { index = this.state.galleryItemsLength - 1 }
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
      return ( 
        <GalleryImage key={ i }
                      num={ i }
                      slug={ entry.slug }
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
            <EditItem imgData={ this.state.galleryItems[this.state.editItem] } editItem={ this.editItem.bind(this) } num={ this.state.editItem } /> 
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