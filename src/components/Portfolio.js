import Component from 'inferno-component';
import APIData from '../data/unsplash-api';
import PortfolioImage from './PortfolioImage';
import Lightbox from './Lightbox';

class Portfolio extends Component {

  constructor(props) {
    super(props);
    this.removeItem = this.removeItem.bind(this);
    this.handleLightbox = this.handleLightbox.bind(this);
    this.state = {
      galleryItems: APIData,
      galleryItemsLength: 10,
      lightbox: null,
      apiKey: 'a2a706e3895ae886b1c812a3263b8505ef8d7aabc1f991486d4083e545736f95'
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
      <div className="Portfolio">
        <h2>Portfolio</h2>
        { this.state.lightbox !== null ? <Lightbox imgData={ this.state.galleryItems[this.state.lightbox] } handleLightbox={ this.handleLightbox.bind(this) } num={ this.state.lightbox } /> : '' }        
        <div className="Portfolio__items">
          { this.state.galleryItems.map((entry, i) => {
            return (
              i < this.state.galleryItemsLength ?
              <PortfolioImage key={ i } num={ i } img={ entry.id } delete={ this.removeItem.bind(this) } handleLightbox={ this.handleLightbox.bind(this) } />
              : null
            )
          })}
          <div className="Portfolio__items--block">
            <button onClick={ () => this.addItem(1) } className='Portfolio__items--block--add-item'>
              <div className="Portfolio__items--block--add-item--inner">
                <span className='Portfolio__items--block--add-item--inner--plus'>+</span><br />
                <span className='Portfolio__items--block--add-item--inner--text'>Add Item</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Portfolio;