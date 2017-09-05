import Component from 'inferno-component';

class GalleryEditItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imageStatus: 'loading' 
    }
  }

  componentDidMount() {
    document.body.style.overflow = 'hidden'
  }
  
  componentWillUnmount() {
    document.body.style.overflow = 'auto'
  }

  handleImageLoaded(loaded = true) {
    if (loaded) {
      this.setState( { imageStatus: 'loaded' } )
    } else {
      this.setState( { imageStatus: 'loading' } )
    }
  }

  saveItem(e) {
    e.preventDefault();
    alert('test')
  }

  render() {    
    const editItem = this.props.editItem
    const imgData = this.props.imgData
    return(
      // Close EditItem if user clicks on dark area, but not on the image/caption
      <div className="GalleryEditItem" onClick={ (e) => { if (e.target === this._vNode.dom) { editItem(null) } } }>
        <button className="GalleryEditItem__close" onClick={ () => editItem(null) }>✕</button>
        <div className="GalleryEditItem__modal">
          <img src={ '/images/gallery/full-size/' + imgData.slug + '.jpg' } className={ "GalleryEditItem__modal--image " + this.state.imageStatus } onLoad={ this.handleImageLoaded.bind(this) } alt={ imgData.description } />
          <div className="GalleryEditItem__modal--info">
            <h3 className="GalleryEditItem__modal--info--title">Edit photo</h3>
            <form onSubmit={ this.saveItem }>
              <label htmlFor="description">Description</label>
              <p><em>Appears under the image</em></p>
              <input type="text" placeholder={ imgData.description } />
              <button type='reset'>Reset</button>
              <button type='submit'>Save</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default GalleryEditItem