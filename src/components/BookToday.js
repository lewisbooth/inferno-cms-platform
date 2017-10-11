import Component from "inferno-component";

class BookToday extends Component {
  render() {
    return (
      <div className="BookToday">
        <img
          src="/mockup/footer-book-today.png"
          width="100%"
          height="auto"
          style={{ display: "block" }}
          alt=""
        />
      </div>
    );
  }
}

export default BookToday;
