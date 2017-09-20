import Component from "inferno-component";

class GalleryDeleteItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageStatus: "loading"
    };
  }

  componentDidMount() {
    document.body.style.overflow = "hidden";
  }

  componentWillUnmount() {
    document.body.style.overflow = "auto";
  }

  handleImageLoaded(loaded = true) {
    if (loaded) {
      this.setState({ imageStatus: "loaded" });
    } else {
      this.setState({ imageStatus: "loading" });
    }
  }

  render() {
    const { deleteItemModal, deleteItem, img } = this.props;
    return (
      // Close EditItem if user clicks on dark area, but not on the image/caption
      <div
        className="GalleryDeleteItem"
        onClick={e => {
          if (e.target === this._vNode.dom) {
            deleteItemModal(this.props.num, null);
          }
        }}
      >
        <button
          className="GalleryDeleteItem__close"
          onClick={() => deleteItemModal(this.props.num, null)}
        >
          ✕
        </button>
        <div className="GalleryDeleteItem__modal">
          <img
            src={`/images/gallery/full-size/${img.slug}.jpg`}
            alt={img.description}
            className="GalleryDeleteItem__modal--image"
          />
          <div className="GalleryDeleteItem__modal--confirm">
            <h3 className="GalleryDeleteItem__modal--confirm--title">
              Delete photo?
            </h3>
            <p className="GalleryDeleteItem__modal--confirm--info">
              You can't reverse this action.
            </p>
            <div>
              <button
                className="Button__main GalleryDeleteItem__modal--confirm--delete"
                onClick={() => deleteItem(this.props.num)}
              >
                Delete
              </button>
              <button
                className="Button__main GalleryDeleteItem__modal--confirm--cancel"
                onClick={() => deleteItemModal(this.props.num, null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GalleryDeleteItem;
