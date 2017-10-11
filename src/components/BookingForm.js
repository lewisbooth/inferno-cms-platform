import Component from "inferno-component";
import BookingFormCalendar from "./BookingFormCalendar";
import BookingFormTimes from "./BookingFormTimes";

class BookingForm extends Component {
  constructor() {
    super();
    const today = new Date().toISOString().substring(0, 10);
    this.state = {
      hideGuests: true,
      hideCalendar: true,
      hideTimes: true,
      guests: 2,
      date: today,
      selectedDate: today,
      time: "19:15"
    };
  }

  submitFirst(e) {
    e.preventDefault();
  }

  toggleDropdowns(e, dropdown) {
    e.preventDefault();
    const hideGuests = dropdown === "guests" ? false : true;
    const hideCalendar = dropdown === "calendar" ? false : true;
    const hideTimes = dropdown === "times" ? false : true;
    this.setState({
      hideGuests,
      hideCalendar,
      hideTimes
    });
  }

  closeDropdowns() {
    this.setState({
      hideGuests: true,
      hideCalendar: true,
      hideTimes: true
    });
  }

  updateCalendar(day, month, year) {
    const { date } = this.state;
    const newDate = date.split("-");
    if (typeof day !== "undefined") {
      newDate[2] = day.toString().padStart(2, "0");
    }
    if (typeof month !== "undefined") {
      newDate[1] = month.toString().padStart(2, "0");
    }
    if (typeof year !== "undefined") {
      newDate[0] = year.toString();
    }
    this.setState({
      selectedDate: newDate.join("-"),
      hideCalendar: true
    });
  }

  setTime(time) {
    this.setState({ time, hideTimes: true });
  }

  // Increments/decrements the guests input
  handleGuests(e, change = 0) {
    e.preventDefault();
    let { guests } = this.state;
    // If no parameters, take the value from the <input> element (more accessible for screen readers)
    if (change === 0) {
      guests = parseFloat(document.querySelector("input[name=guests]").value);
    } else {
      guests = this.state.guests + change;
    }
    // Enforce min/max values
    if (guests > 8) guests = 8;
    if (guests < 1) guests = 1;
    this.setState({ guests });
  }

  getMaxDate() {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 1);
    return maxDate.toISOString().substring(0, 10);
  }

  // Formats 2017-10-01 into 1st October
  parseDate(dateString) {
    const dateArray = dateString.split("-");
    let date = dateArray[2];
    let suffix = "th";
    if (date === "01" || date === "21" || date === "31") {
      suffix = "st";
    } else if (date === "02" || date === "22") {
      suffix = "nd";
    } else if (date === "03" || date === "23") {
      suffix = "rd";
    }
    // Removes 0 prefix
    date = parseFloat(date).toString();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const monthIndex = parseFloat(dateArray[1] - 1);
    const month = months[monthIndex];
    return `${date}${suffix} ${month}`;
  }

  render() {
    const hideGuests = this.state.hideGuests ? "hidden" : "";
    const hideCalendar = this.state.hideCalendar ? "hidden" : "";
    const hideTimes = this.state.hideTimes ? "hidden" : "";
    const guestIncrementDisabled = this.state.guests >= 8 ? "disabled" : "";
    const guestDecrementDisabled = this.state.guests <= 1 ? "disabled" : "";
    return (
      <div className="BookingForm page">
        <h3>
          Experience <span className="bold-orange">The Orange Tree</span>
        </h3>
        <div className="page-container">
          <form
            onsubmit={e => this.submitFirst(e)}
            className="BookingForm__form1"
          >
            <div>
              <div
                className="BookingForm__form1--field"
                onClick={e => this.toggleDropdowns(e, "guests")}
              >
                <input
                  name="guests"
                  type="number"
                  value={this.state.guests}
                  onChange={e => this.handleGuests(e)}
                  max="8"
                  min="1"
                  required
                  readonly
                />
                <p>Guest{this.state.guests > 1 ? "s" : ""}</p>
                <label hidden htmlFor="guests">
                  Number of Guests (no more than 8)
                </label>
                <img src="images/icons/booking/people.svg" alt="Guest icon" />
              </div>
              <div className={`BookingForm__form1--dropdown ${hideGuests}`}>
                <div
                  className="BookingForm__form1--dropdown--close"
                  onClick={e => this.toggleDropdowns(e)}
                />
                <div className="BookingForm__form1--dropdown--connector" />
                <div className="BookingForm__form1--dropdown--guests">
                  <span class="bold">Guests</span>
                  <img
                    className={`BookingForm__form1--dropdown--guests--increment ${guestDecrementDisabled}`}
                    src="/images/icons/booking/minus.svg"
                    alt="Remove guests"
                    onClick={e => this.handleGuests(e, -1)}
                  />
                  {this.state.guests}
                  <img
                    className={`BookingForm__form1--dropdown--guests--increment ${guestIncrementDisabled}`}
                    src="/images/icons/booking/plus.svg"
                    alt="Add guests"
                    onClick={e => this.handleGuests(e, 1)}
                  />
                </div>
                {this.state.guests === 8 ? (
                  <p className="BookingForm__form1--dropdown--extra-guests">
                    To reserve more than 8 guests, please call us on{" "}
                    <a href="tel:+441782719222">01782 719222</a>
                  </p>
                ) : null}
              </div>
            </div>
            <div>
              <div
                className="BookingForm__form1--field"
                onClick={e => this.toggleDropdowns(e, "calendar")}
              >
                <label hidden htmlFor="date">
                  Date of booking (no more than 1 month in advance)
                </label>
                <input
                  name="date"
                  type="text"
                  value={this.parseDate(this.state.selectedDate)}
                  required
                  readonly
                />
                <img
                  src="images/icons/booking/calendar.svg"
                  alt="Calendar icon"
                />
              </div>
              <div
                className={`BookingForm__form1--dropdown BookingForm__form1--dropdown--calendar ${hideCalendar}`}
              >
                <div
                  className="BookingForm__form1--dropdown--close"
                  onClick={e => this.toggleDropdowns(e)}
                />
                <div className="BookingForm__form1--dropdown--connector" />
                <BookingFormCalendar
                  selectedDate={this.state.selectedDate}
                  updateCalendar={this.updateCalendar.bind(this)}
                />
              </div>
            </div>
            <div>
              <div
                className="BookingForm__form1--field"
                onClick={e => this.toggleDropdowns(e, "times")}
              >
                <label hidden htmlFor="time">
                  Time of booking
                </label>
                <input
                  id="time"
                  type="text"
                  value={this.state.time}
                  required
                  readonly
                />
                <img src="images/icons/booking/clock.svg" alt="Clock icon" />
              </div>
              <div
                className={`BookingForm__form1--dropdown BookingForm__form1--dropdown--times ${hideTimes}`}
              >
                <div
                  className="BookingForm__form1--dropdown--close"
                  onClick={e => this.toggleDropdowns(e)}
                />
                <div className="BookingForm__form1--dropdown--connector" />
                <BookingFormTimes
                  setTime={this.setTime.bind(this)}
                  activeTime={this.state.time}
                />
              </div>
            </div>
            <button className="Button__main BookingForm__form1--submit">
              Reserve Table
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default BookingForm;
