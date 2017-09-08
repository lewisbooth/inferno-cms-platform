import Component from 'inferno-component'
import axios from 'axios'

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

  saveItem(e, index) {
    e.preventDefault()
    const description = e.target.querySelector('input[name=description]').value
    const tagNodes = document.querySelectorAll('.GalleryEditItem__modal--form--tags--checkbox')
    let tags = []
    tagNodes.forEach(tag => {
      if (tag.classList.contains('checked')) {
        tags.push(tag.innerHTML)
      }
    })

    const data = {
      index,
      tags,
      description
    }
    
    axios.post('http://localhost:1337/api/gallery/edit', data)
         .then(res => {
           this.props.editItem(null)
         })
         .catch(err => {
           console.log(err)
         })
  }

  resetTags = () => {    
    const tagNodes = document.querySelectorAll('.GalleryEditItem__modal--form--tags--checkbox')
    tagNodes.forEach(tag => {
      const checked = this.props.imgData.tags.includes(tag.innerHTML) ? true : false
      if (checked) {
        tag.classList.add('checked')
      } else {
        tag.classList.remove('checked')
      }
    })
  }

  render() {    
    const editItem = this.props.editItem
    const index = this.props.num
    const imgData = this.props.imgData
    const tagList = ['food', 'drinks', 'restaurant', 'decor', 'service']
    const Tags = tagList.map((tag, i) => {
      const checked = imgData.tags.includes(tag) ? 'checked' : null
      return (
        <button key={i}
             className={'GalleryEditItem__modal--form--tags--checkbox ' + checked}
             onClick={(e) => {
               e.preventDefault()
               e.target.classList.toggle('checked')     
             }}>
          {tag}
        </button>
      )
    })
    return(
      // Close EditItem if user clicks on dark area, but not on the image/caption
      <div className="GalleryEditItem" onClick={ (e) => { if (e.target === this._vNode.dom) { editItem(null) } } }>
        <button className="GalleryEditItem__close" onClick={ () => editItem(null) }>✕</button>
        <div className="GalleryEditItem__modal">
          <img src={ '/images/gallery/full-size/' + imgData.slug + '.jpg' } className={ "GalleryEditItem__modal--image " + this.state.imageStatus } onLoad={ this.handleImageLoaded.bind(this) } alt={ imgData.description } />
          <div className="GalleryEditItem__modal--form">
            <h3 className="GalleryEditItem__modal--form--title">Edit photo</h3>
            <form onSubmit={ (e) => this.saveItem(e, index) }>
              <label htmlFor="description">Description</label>
              <p><em>Appears under the image</em></p>
              <input type="text" name="description" value={imgData.description}></input>
              <label htmlFor="tags">Tags</label>
              <div className="GalleryEditItem__modal--form--tags">
                { Tags }
              </div>
              <button type='reset' onClick={ this.resetTags }>Reset</button>
              <button type='submit'>Save</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default GalleryEditItem