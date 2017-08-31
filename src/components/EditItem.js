import Component from 'inferno-component';

class EditItem extends Component {

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
      <div className="EditItem" onClick={ (e) => { if (e.target === this._vNode.dom) { editItem(null) } } }>
        <button className="EditItem__close" onClick={ () => editItem(null) }>✕</button>
        <div className="EditItem__modal">
          <img src={ imgData[0] + '.jpg' } className={ "EditItem__modal--image " + this.state.imageStatus } onLoad={ this.handleImageLoaded.bind(this) } alt={ imgData[1] } />
          <div className="EditItem__modal--info">
            <h3 className="EditItem__modal--info--title">Edit photo</h3>
            <form onSubmit={ this.saveItem }>
              <label htmlFor="description">Description</label>
              <p><em>Appears under the image</em></p>
              <input type="text" placeholder={ imgData[1] } />
              <label htmlFor="alt">Alt Text</label>
              <p><em>Describe the image contents for search engines and users with impaired vision</em></p>
              <input type="text" placeholder={ imgData[2] || 'Orange Tree ' + imgData[1] } />
              <button type='reset'>Reset</button>
              <button type='submit'>Save</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default EditItem