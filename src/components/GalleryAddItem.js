import Component from "inferno-component";
import axios from "axios";

class GalleryAddItem extends Component {
  submitPhoto(e) {
    e.preventDefault();
    let formData = new FormData();
    const photo = e.target.querySelector("input[name=photo]").files[0];
    const description = e.target.querySelector("input[name=description]").value;
    const tagNodes = e.target.querySelectorAll(
      ".GalleryAddItem__modal--form--tags--checkbox"
    );
    let tags = [];

    tagNodes.forEach(tag => {
      if (tag.classList.contains("checked")) {
        tags.push(tag.innerHTML);
      }
    });

    formData.append("tags", tags);
    formData.append("photo", photo, "photo");
    formData.append("description", description);

    axios
      .post("http://localhost:1337/api/gallery/add", formData)
      .then(res => {
        this.props.addItem(null);
      })
      .catch(err => {
        console.log(err);
      });

    return false;
  }

  resetTags = () => {
    const tagNodes = document.querySelectorAll(
      ".GalleryAddItem__modal--form--tags--checkbox"
    );
    tagNodes.forEach(tag => {
      tag.classList.remove("checked");
    });
  };

  render() {
    const addItem = this.props.addItem;
    const tagList = ["food", "drinks", "restaurant", "decor", "service"];
    const Tags = tagList.map((tag, i) => {
      return (
        <button
          key={i}
          className="GalleryAddItem__modal--form--tags--checkbox"
          onClick={e => {
            e.preventDefault();
            e.target.classList.toggle("checked");
          }}
        >
          {tag}
        </button>
      );
    });

    return (
      <div
        className="GalleryAddItem"
        onClick={e => {
          if (e.target === this._vNode.dom) {
            addItem(null);
          }
        }}
      >
        <button className="GalleryAddItem__close" onClick={() => addItem(null)}>
          ✕
        </button>
        <div className="GalleryAddItem__modal">
          <form
            className="GalleryAddItem__modal--form"
            onSubmit={e => {
              this.submitPhoto(e);
            }}
          >
            <h3 className="GalleryAddItem__modal--form--title">Add photo</h3>
            <label for="photo">Choose a file</label>
            <input
              name="photo"
              type="file"
              accept="image/*"
              required
              className="GalleryAddItem__modal--form--upload--file"
            />
            <label htmlFor="description">Description</label>
            <p>
              <em>Appears under the image</em>
            </p>
            <input type="text" name="description" required />
            <label>Tags</label>
            <div className="GalleryAddItem__modal--form--tags">{Tags}</div>
            <button type="reset" onClick={this.resetTags}>
              Reset
            </button>
            <button type="submit">Upload</button>
          </form>
        </div>
      </div>
    );
  }
}

export default GalleryAddItem;
