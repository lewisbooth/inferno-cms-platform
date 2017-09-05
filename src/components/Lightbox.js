import Component from 'inferno-component';

class Lightbox extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      imageStatus: 'loading' 
    }
  }

  handleImageLoaded(loaded = true) {
    if (loaded) {
      this.setState( { imageStatus: 'loaded' } )
    } else {
      this.setState( { imageStatus: 'loading' } )
    }
  }

  componentDidMount() {
    document.body.classList.add('lightbox-active')
    
  }
  
  componentWillUnmount() {
    document.body.classList.remove('lightbox-active')
  }

  render() {    
    const handleLightbox = this.props.handleLightbox
    const imgData = this.props.imgData
    return(
      // Close lightbox if user clicks on dark area, but not on the image/caption
      <div className="Lightbox" onClick={ (e) => { if (e.target === this._vNode.dom) { handleLightbox(null) } } }>
        <button className="Lightbox__close" onClick={ () => handleLightbox(null) }>✕</button>
        <button className="Lightbox__nav" onClick={ (e) => { handleLightbox(this.props.num - 1); this.handleImageLoaded(false) } }>&lt;</button>
        <div className="Lightbox__image">
          <div className="Lightbox__image--loading">Loading...</div>
          <img src={ '/images/gallery/full-size/' + imgData.slug + '.jpg' } className={ "Lightbox__image--active " + this.state.imageStatus } onLoad={ this.handleImageLoaded.bind(this) } alt={ imgData.description } />
          <div className="Lightbox__image--caption">
            <h5>{ imgData.description }</h5>
          </div>
        </div>
        <button className="Lightbox__nav" onClick={ (e) => { handleLightbox(this.props.num + 1); this.handleImageLoaded(false) } }>&gt;</button>
      </div>
    )
  }
}

export default Lightbox