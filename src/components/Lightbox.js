import Component from 'inferno-component';

class Lightbox extends Component {

  constructor(props) {
    super(props);
    this.state = { imageStatus: 'loading' }
  }

  handleImageLoaded(loaded = true) {
    if (loaded) {
      this.setState( { imageStatus: 'loaded' } )
    } else {
      this.setState( { imageStatus: 'loading' } )
    }
  }

  componentDidMount() {
    document.body.style.overflow = 'hidden'
  }
  
  componentWillUnmount() {
    document.body.style.overflow = 'auto'
  }

  render() {    
    const handleLightbox = this.props.handleLightbox;
    const imgData = this.props.imgData
    return(
      // Close lightbox if user clicks on dark area, but not on the image/caption
      <div className="Lightbox" onClick={ (e) => { if (e.target === this._vNode.dom) { handleLightbox(false) } } }>
        <button className="Lightbox__close" onClick={ () => handleLightbox(false) }>✕</button>
        <button className="Lightbox__nav" onClick={ (e) => { handleLightbox(true, this.props.num - 1); this.handleImageLoaded(false) } }>&lt;</button>
        <div className="Lightbox__image">
          <div className="Lightbox__image--loading">Loading...</div>
          <img src={ `https://source.unsplash.com/${imgData.id}/1000x600` } className={ "Lightbox__image--active " + this.state.imageStatus } onLoad={ this.handleImageLoaded.bind(this) } alt={ imgData.user.name } />
          <div className="Lightbox__image--caption">
            <img src={ imgData.user.profile_image.large } alt={ imgData.user.name } className="Lightbox__image--caption--profile-pic"/>
            <div className="Lightbox__image--caption--section">
              <h5>Photographer</h5>
              <p><a href={ imgData.user.links.html }>{ imgData.user.name }</a></p>
            </div>
            { imgData.location ? 
              <div className="Lightbox__image--caption--section">
                <h5>Location</h5>
                <p>{ imgData.location.title }</p>
              </div> 
            : null }
          </div>
        </div>
        <button className="Lightbox__nav" onClick={ (e) => { handleLightbox(true, this.props.num + 1); this.handleImageLoaded(false) } }>&gt;</button>
      </div>
    )
  }
}

export default Lightbox