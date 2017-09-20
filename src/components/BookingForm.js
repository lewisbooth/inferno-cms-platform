import Component from "inferno-component";

class BookingForm extends Component {
  constructor() {
    super();
  }
  submitFirst(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className="BookingForm page">
        <div className="page-container">
          <form
            onsubmit={e => this.submitFirst(e)}
            className="BookingForm__form1"
          >
            <div className="BookingForm__form1--field">
              <input type="number" value="2" max="8" min="1" required />
              <p>Guests</p>
              <label hidden htmlFor="guests">
                Number of Guests
              </label>
              <img
                src="images/icons/booking/calendar.svg"
                alt="Number of guests"
              />
            </div>
            <div className="BookingForm__form1--field">
              <label hidden htmlFor="date">
                Date
              </label>
              <input name="date" type="date" value="2017-10-17" required />
              <img
                src="images/icons/booking/calendar.svg"
                alt="Number of guests"
              />
            </div>
            <div className="BookingForm__form1--field">
              <input type="time" value="19:15" required />
              <img
                src="images/icons/booking/calendar.svg"
                alt="Number of guests"
              />
            </div>
            <button className="BookingForm__form1--submit Button__main">
              Reserve Table
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default BookingForm;
