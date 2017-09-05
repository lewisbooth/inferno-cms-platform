import Component from 'inferno-component';

class GalleryImage extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      imageStatus: 'loading'
    }
  }

  handleImageLoaded() {
    this.setState( { imageStatus: 'loaded' } )
  }

  render() {
    const deleteItem = this.props.delete;
    const editItem = this.props.editItem;
    const handleLightbox = this.props.handleLightbox;
    const handleDragStart = this.props.handleDragStart;
    const handleDragEnter = this.props.handleDragEnter;
    const handleDragLeave = this.props.handleDragLeave;
    const handleDragOver = this.props.handleDragOver;
    const handleDrop = this.props.handleDrop;
    const imageIndex = this.props.num;
    return(
      <div className="Gallery__items--block">
        <img className={'Gallery__items--block--image ' + this.state.imageStatus } 
             src={ '/images/gallery/thumbs/' + this.props.slug + '.jpg' } 
             alt={ this.props.alt } 
             onLoad={ this.handleImageLoaded.bind(this) } 
             onClick={ () => handleLightbox(imageIndex) } 
             data-index={ imageIndex }
             draggable="true" 
             onDragStart={ (e) => handleDragStart(e, imageIndex) }
             onDragOver={ (e) => handleDragOver(e) }
             onDragEnter={ (e) => handleDragEnter(e, imageIndex) }
             onDragLeave={ (e) => handleDragLeave(e, imageIndex) }
             onDrop={ (e) => handleDrop(e, imageIndex) } />

        <div className="Gallery__items--block--resize">
          <img alt="Drag and drop icon" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ3Ni43MzcgNDc2LjczNyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDc2LjczNyA0NzYuNzM3OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTQ3NS40OTgsMjMyLjI5OGwtMy40MDEtNS4xNDlsLTYzLjU2NS02My41NjVjLTYuMTk4LTYuMTk4LTE2LjMwNC02LjE5OC0yMi40NywwICAgIGMtNi4xOTgsNi4xOTgtNi4xOTgsMTYuMjczLDAsMjIuNDdsMzYuNDIzLDM2LjQyM0gyNTQuMjZWNTQuMjUzbDM2LjQyMywzNi40MjNjNi4xNjYsNi4xOTgsMTYuMjczLDYuMTk4LDIyLjQ3LDAgICAgYzYuMTY2LTYuMTk4LDYuMTY2LTE2LjI3MywwLTIyLjQ3TDI0OS41ODgsNC42NGwtMC4xNTktMC4wOTVsLTQuOTktMy4zMDVMMjM4LjM2OSwwaC0wLjA2NGwtNi4wMDcsMS4yNGwtNC45OSwzLjMwNWwtMC4xOTEsMC4wOTUgICAgbC02My41NjUsNjMuNTY1Yy02LjE5OCw2LjE5OC02LjE5OCwxNi4yNzMsMCwyMi40N3MxNi4yNzMsNi4xOTgsMjIuNDcsMGwzNi40NTUtMzYuNDIzdjE2OC4yMjVINTQuMjUzbDM2LjQyMy0zNi40MjMgICAgYzYuMTk4LTYuMTk4LDYuMTk4LTE2LjI3MywwLTIyLjQ3cy0xNi4yNzMtNi4xOTgtMjIuNDcsMEw0LjY0LDIyNy4xNDlsLTAuMDk1LDAuMTU5bC0zLjMwNSw0Ljk5TDAsMjM4LjM2OXYwLjA2NGwxLjI0LDYuMDA3ICAgIGwzLjMwNSw0Ljk1OGwwLjA5NSwwLjE5MWw2My41NjUsNjMuNTY1YzYuMTk4LDYuMTk4LDE2LjI3Myw2LjE5OCwyMi40NywwYzYuMTk4LTYuMTY2LDYuMTk4LTE2LjI3MywwLTIyLjQ3TDU0LjI1MywyNTQuMjYgICAgaDE2OC4yMjV2MTY4LjIyNWwtMzYuNDIzLTM2LjQyM2MtNi4xOTgtNi4xNjYtMTYuMjczLTYuMTY2LTIyLjQ3LDBjLTYuMTk4LDYuMTk4LTYuMTk4LDE2LjMwNCwwLDIyLjQ3bDYzLjU2NSw2My41NjVsNS4xNDksMy40MzIgICAgbDYuMDA3LDEuMjA4aDAuMDY0bDYuMDctMS4yNGw1LjE0OS0zLjQwMWw2My41NjUtNjMuNTY1YzYuMTY2LTYuMTk4LDYuMTY2LTE2LjMwNCwwLTIyLjQ3Yy02LjE5OC02LjE5OC0xNi4zMDQtNi4xOTgtMjIuNDcsMCAgICBsLTM2LjQyMywzNi40MjNWMjU0LjI2aDE2OC4yMjVsLTM2LjQyMywzNi40MjNjLTYuMTY2LDYuMTY2LTYuMTY2LDE2LjI3MywwLDIyLjQ3YzYuMTk4LDYuMTY2LDE2LjMwNCw2LjE2NiwyMi40NywwICAgIGw2My41NjUtNjMuNTY1bDMuNDMyLTUuMTQ5bDEuMjA4LTYuMDA3di0wLjA2NEw0NzUuNDk4LDIzMi4yOTh6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" />
          Drag to arrange
        </div>

        <div className="Gallery__items--block--icons">
          <div className="Gallery__items--block--icons--container">
            <button onClick={ () => deleteItem(this.props.num) } className="Gallery__items--block--icons--container--remove-item">✕</button>
            <div className="Gallery__items--block--icons--container--remove-item--caption">
              Remove Photo
            </div>
          </div>
          <div className="Gallery__items--block--icons--container">
            <button onClick={ () => editItem(this.props.num) } className="Gallery__items--block--icons--container--edit-item">
              <img alt="Edit Item" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDQ4NS4yMTkgNDg1LjIyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0ODUuMjE5IDQ4NS4yMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxwYXRoIGQ9Ik00NjcuNDc2LDE0Ni40MzhsLTIxLjQ0NSwyMS40NTVMMzE3LjM1LDM5LjIzbDIxLjQ0NS0yMS40NTdjMjMuNjg5LTIzLjY5Miw2Mi4xMDQtMjMuNjkyLDg1Ljc5NSwwbDQyLjg4Niw0Mi44OTcgICBDNDkxLjEzMyw4NC4zNDksNDkxLjEzMywxMjIuNzQ4LDQ2Ny40NzYsMTQ2LjQzOHogTTE2Ny4yMzMsNDAzLjc0OGMtNS45MjIsNS45MjItNS45MjIsMTUuNTEzLDAsMjEuNDM2ICAgYzUuOTI1LDUuOTU1LDE1LjUyMSw1Ljk1NSwyMS40NDMsMEw0MjQuNTksMTg5LjMzNWwtMjEuNDY5LTIxLjQ1N0wxNjcuMjMzLDQwMy43NDh6IE02MCwyOTYuNTRjLTUuOTI1LDUuOTI3LTUuOTI1LDE1LjUxNCwwLDIxLjQ0ICAgYzUuOTIyLDUuOTIzLDE1LjUxOCw1LjkyMywyMS40NDMsMEwzMTcuMzUsODIuMTEzTDI5NS45MTQsNjAuNjdMNjAsMjk2LjU0eiBNMzM4Ljc2NywxMDMuNTRMMTAyLjg4MSwzMzkuNDIxICAgYy0xMS44NDUsMTEuODIyLTExLjgxNSwzMS4wNDEsMCw0Mi44ODZjMTEuODUsMTEuODQ2LDMxLjAzOCwxMS45MDEsNDIuOTE0LTAuMDMybDIzNS44ODYtMjM1LjgzN0wzMzguNzY3LDEwMy41NHogICAgTTE0NS43MzQsNDQ2LjU3MmMtNy4yNTMtNy4yNjItMTAuNzQ5LTE2LjQ2NS0xMi4wNS0yNS45NDhjLTMuMDgzLDAuNDc2LTYuMTg4LDAuOTE5LTkuMzYsMC45MTkgICBjLTE2LjIwMiwwLTMxLjQxOS02LjMzMy00Mi44ODEtMTcuNzk1Yy0xMS40NjItMTEuNDkxLTE3Ljc3LTI2LjY4Ny0xNy43Ny00Mi44ODdjMC0yLjk1NCwwLjQ0My01LjgzMywwLjg1OS04LjcwMyAgIGMtOS44MDMtMS4zMzUtMTguODY0LTUuNjI5LTI1Ljk3Mi0xMi43MzdjLTAuNjgyLTAuNjc3LTAuOTE3LTEuNTk2LTEuNTM4LTIuMzM4TDAsNDg1LjIxNmwxNDcuNzQ4LTM2Ljk4NiAgIEMxNDcuMDk3LDQ0Ny42MzcsMTQ2LjM2LDQ0Ny4xOTMsMTQ1LjczNCw0NDYuNTcyeiIgZmlsbD0iI0ZGRkZGRiIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" />
            </button>
            <div className="Gallery__items--block--icons--container--edit-item--caption">
              Edit Photo
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default GalleryImage