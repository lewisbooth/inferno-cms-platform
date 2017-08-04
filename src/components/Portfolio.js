import Component from 'inferno-component';
import APIData from '../data/unsplash-api';

class Portfolio extends Component {

  constructor(props) {
    super(props);

    this.state = {
      galleryItems: APIData,
      galleryItemsLength: 10,
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

  render() {
    return (
      <div className="Portfolio">
        <h3>This is the portfolio page</h3>
        <div className="Portfolio__items">
          { this.state.galleryItems.map((entry, i) => {
            return (
              i < this.state.galleryItemsLength ?
              <div className="Portfolio__items--block">
                <img className='Portfolio__items--block--image' key={'Portfolio--image-'+i} src={ `https://source.unsplash.com/${entry.id}/200x200` }/>
                <button onclick={ () => this.removeItem(i) } key={'Portfolio--remove-'+i} className="Portfolio__items--block--remove-item">x</button>
              </div>
              : ''
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