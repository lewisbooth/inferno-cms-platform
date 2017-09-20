import Component from "inferno-component";
import GalleryImage from "./GalleryImage";
import GalleryEditItem from "./GalleryEditItem";
import GalleryAddItem from "./GalleryAddItem";
import GalleryDeleteItem from "./GalleryDeleteItem";
import Lightbox from "./Lightbox";
import axios from "axios";

class Gallery extends Component {
  constructor(props) {
    super(props);

    const { protocol, hostname, port } = window.location;
    const url = protocol + "//" + hostname + (port ? ":1337" : "");
    this.galleryApi = url + "/api/gallery";

    this.deleteItem = this.deleteItem.bind(this);
    this.handleLightbox = this.handleLightbox.bind(this);

    this.state = {
      galleryItems: [],
      galleryExpiry: 10000,
      lightbox: null,
      editItem: null,
      addItem: null,
      deleteItem: null,
      dragging: null,
      filters: ["food", "drinks", "restaurant", "decor", "service"],
      currentFilters: []
    };
  }

  componentDidMount() {
    this.loadGallery();
  }

  loadGallery() {
    if (typeof Storage !== undefined) {
      const galleryItems = localStorage.getItem("galleryItems");
      this.setState({ galleryItems: JSON.parse(galleryItems) });
    }
    this.getGallery();
  }

  getGallery() {
    axios
      .get(this.galleryApi)
      .then(res => {
        if (typeof res.data.images !== undefined) {
          this.setState({ galleryItems: res.data.images });
          if (typeof Storage !== "undefined") {
            localStorage.setItem(
              "galleryItems",
              JSON.stringify(res.data.images)
            );
          }
        } else {
          this.setState({ galleryItems: [] });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  postGallery(
    newGalleryItems,
    successMessage = "Successfully updated the gallery",
    errorMessage = "Error updating the gallery"
  ) {
    axios
      .post(this.galleryApi, newGalleryItems)
      .then(res => {
        if (typeof res.data.images !== undefined) {
          this.setState({ galleryItems: res.data.images });
        } else {
          this.setState({ galleryItems: [] });
        }
        this.props.toast("success", successMessage);
      })
      .catch(err => {
        this.props.toast("error", errorMessage);
        console.log(err);
      });
  }

  toggleFilter(filter) {
    let { currentFilters } = this.state;
    const index = currentFilters.indexOf(filter);
    if (index >= 0) {
      currentFilters.splice(index, 1);
    } else {
      currentFilters.push(filter);
    }
    this.setState(currentFilters);
  }

  filterGallery() {
    const { currentFilters, galleryItems } = this.state;
    // Bypass filter loop if none are set
    if (currentFilters.length === 0 || this.props.editMode === true) {
      return galleryItems;
    }
    // Loop through each gallery image and tag to filter matches
    return galleryItems.filter(item => {
      let match = false;
      currentFilters.forEach(filter => {
        if (item.tags.includes(filter)) {
          match = true;
        }
      });
      return match;
    });
  }

  deleteItemModal(index, enabled = true) {
    if (enabled === true) {
      this.setState({ deleteItem: index });
    } else {
      this.setState({ deleteItem: null });
    }
  }

  deleteItem(index) {
    const { galleryItems } = this.state;
    galleryItems.splice(index, 1);
    this.postGallery(galleryItems);
    this.setState({ deleteItem: null });
  }

  addItem(enabled = true) {
    this.getGallery();
    this.setState({ addItem: enabled });
  }

  editItem(index) {
    this.getGallery();
    this.setState({ editItem: index });
  }

  handleLightbox(index) {
    // Loop around start/end of array
    if (index >= this.state.galleryItems.length) {
      index = 0;
    }
    if (index < 0) {
      index = this.state.galleryItems.length - 1;
    }
    this.setState({ lightbox: index });
  }

  handleDragStart(e, imageIndex) {
    this.setState({ dragging: imageIndex });
    e.dataTransfer.effectAllowed = "move";
  }

  handleDragEnter(e, imageIndex) {
    e.preventDefault();
    e.target.classList.add("drag-over");
  }

  handleDragLeave(e, imageIndex) {
    e.preventDefault();
    e.target.classList.remove("drag-over");
  }

  handleDragOver(e) {
    e.preventDefault();
  }

  handleDrop(e, dropIndex) {
    const { galleryItems, dragging } = this.state;
    if (dragging === dropIndex) return;
    const draggedItem = galleryItems.splice(dragging, 1);
    galleryItems.splice(dropIndex, 0, draggedItem[0]);
    this.setState({
      dragging: null
    });
    e.target.classList.remove("drag-over");
    this.postGallery(
      galleryItems,
      `Successfully moved ${draggedItem[0].description}`
    );
  }

  render() {
    const galleryItems = this.filterGallery().map((entry, i) => {
      return (
        <GalleryImage
          key={i}
          imageIndex={i}
          slug={entry.slug}
          alt={entry.description}
          editMode={this.props.editMode}
          deleteItemModal={this.deleteItemModal.bind(this)}
          editItem={this.editItem.bind(this)}
          handleLightbox={this.handleLightbox.bind(this)}
          handleDragStart={this.handleDragStart.bind(this)}
          handleDragEnter={this.handleDragEnter.bind(this)}
          handleDragLeave={this.handleDragLeave.bind(this)}
          handleDragOver={this.handleDragOver.bind(this)}
          handleDrop={this.handleDrop.bind(this)}
        />
      );
    });
    const filters = this.state.filters.map((filter, i) => {
      const active = this.state.currentFilters.includes(filter)
        ? " active"
        : "";
      return (
        <li
          className={"Gallery__filters--filter" + active}
          onClick={() => this.toggleFilter(filter)}
        >
          {filter}
        </li>
      );
    });
    return (
      <div className="Gallery page">
        <div className="page-container">
          <h2>Gallery</h2>
          {this.state.lightbox !== null ? (
            <Lightbox
              imgData={this.state.galleryItems[this.state.lightbox]}
              handleLightbox={this.handleLightbox.bind(this)}
              num={this.state.lightbox}
            />
          ) : null}
          {this.state.addItem !== null ? (
            <GalleryAddItem
              imgData={this.state.galleryItems[this.state.addItem]}
              addItem={this.addItem.bind(this)}
              num={this.state.addItem}
            />
          ) : null}
          {this.state.editItem !== null ? (
            <GalleryEditItem
              imgData={this.state.galleryItems[this.state.editItem]}
              editItem={this.editItem.bind(this)}
              num={this.state.editItem}
              toast={this.props.toast}
            />
          ) : null}
          {this.state.deleteItem !== null ? (
            <GalleryDeleteItem
              deleteItemModal={this.deleteItemModal.bind(this)}
              deleteItem={this.deleteItem.bind(this)}
              num={this.state.deleteItem}
              img={this.state.galleryItems[this.state.deleteItem]}
            />
          ) : null}
          {this.props.editMode ? (
            <div className="Gallery__add">
              <button
                onClick={() => this.addItem()}
                className="Button__main Gallery__add--button"
              >
                <div className="Gallery__add--button--inner">
                  <div className="Gallery__add--button--inner--plus">+</div>
                  <div className="Gallery__add--button--inner--text">
                    Add Image
                  </div>
                </div>
              </button>
            </div>
          ) : (
            <ul className="Gallery__filters">
              <div className="Gallery__filters--title">Filters:</div>
              {filters}
            </ul>
          )}
          <div className="Gallery__items">{galleryItems}</div>
        </div>
      </div>
    );
  }
}

export default Gallery;
