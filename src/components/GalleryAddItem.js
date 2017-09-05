import Component from 'inferno-component';
import axios from 'axios';

class GalleryAddItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  submitPhoto(e) {
    e.preventDefault()
    let formData = new FormData()
    const photo = e.target.querySelector('input[name=photo]').files[0]
    const description = e.target.querySelector('input[name=description]')
    console.log(description.content)
    
    formData.append('photo', photo)
    formData.append('description', description)

    axios.post('http://localhost:1337/api/gallery/add', formData)
         .then(res => {

         })
  }

  render() {    
    const addItem = this.props.addItem
    return(
      <div className="GalleryAddItem" onClick={ (e) => { if (e.target === this._vNode.dom) { addItem(null) }}}>
        <button className="GalleryAddItem__close" onClick={ () => addItem(null) }>✕</button>
        <div className="GalleryAddItem__modal">
          <form className="GalleryAddItem__modal--form" onSubmit={ (e) => this.submitPhoto(e) }>
            <h3 className="GalleryAddItem__modal--form--title">Add photo</h3>
            <label for="photo">
            Choose a file
            </label>
            <input name="photo" type="file" className="GalleryAddItem__modal--form--upload--file"/>
            <label htmlFor="description">Description</label>
            <p><em>Appears under the image</em></p>
            <input type="text" name="description" required />
            <button type='reset'>Reset</button>
            <button type='submit' >Upload</button>
          </form>
        </div>
      </div>
    )
  }
}

export default GalleryAddItem