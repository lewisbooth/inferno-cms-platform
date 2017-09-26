import Component from "inferno-component";
import generateCalendar from "../helpers/generateCalendar";

class BookingFormCalendar extends Component {
  constructor() {
    super();
    this.state = {
      date: new Date()
    };
  }

  componentWillMount() {
    const selectedDate = this.props.selectedDate.split("-");
    const calendar = generateCalendar(this.state.date);
    this.setState({
      selectedDate: {
        day: parseFloat(selectedDate[2]),
        month: parseFloat(selectedDate[1]),
        year: parseFloat(selectedDate[0])
      },
      calendar
    });
  }

  componentWillReceiveProps(nextProps) {
    const selectedDate = nextProps.selectedDate.split("-");
    this.setState({
      selectedDate: {
        day: parseFloat(selectedDate[2]),
        month: parseFloat(selectedDate[1]),
        year: parseFloat(selectedDate[0])
      }
    });
  }

  formatMonthGrid(
    monthGrid,
    month = this.state.selectedDate.month,
    year = this.state.selectedDate.year
  ) {
    const today = parseFloat(
      this.state.date
        .toISOString()
        .substring(0, 10)
        .split("-")[2]
    );
    return (
      <div className="BookingFormCalendar__monthGrid">
        {monthGrid.map(week => {
          return (
            <ul className="BookingFormCalendar__monthGrid--week">
              {week.map(day => {
                const dayClasses = [];
                if (day === this.state.selectedDate.day)
                  dayClasses.push("active");
                if (day === today) dayClasses.push("today");
                // If day is not populated, show a spacer
                return day !== " " ? (
                  <li
                    onclick={() => this.props.updateCalendar(day, month, year)}
                    className={dayClasses.join(" ")}
                  >
                    {day}
                  </li>
                ) : (
                  <li className="BookingFormCalendar__monthGrid--week--spacer" />
                );
              })}
            </ul>
          );
        })}
      </div>
    );
  }

  render() {
    const { calendar } = this.state;
    const days = (
      <ul className="BookingFormCalendar__days">
        {["M", "T", "W", "T", "F", "S", "S"].map(day => {
          return <li>{day}</li>;
        })}
      </ul>
    );
    const currentMonthGrid = this.formatMonthGrid(
      calendar.currentMonth.grid,
      calendar.currentMonth.monthIndex + 1,
      calendar.currentMonth.year
    );
    const nextMonthGrid = this.formatMonthGrid(
      calendar.nextMonth.grid,
      calendar.nextMonth.monthIndex + 1,
      calendar.nextMonth.year
    );
    return (
      <div className="BookingFormCalendar">
        <span className="BookingFormCalendar__month">
          {calendar.currentMonth.monthName}
        </span>
        {days}
        {currentMonthGrid}
        <span className="BookingFormCalendar__month">
          {calendar.nextMonth.monthName}
        </span>
        {days}
        {nextMonthGrid}
        <p className="BookingForm__form1--dropdown--extra-guests">
          To book a table more than 1 month in advance, please call us on{" "}
          <a href="tel:+441782719222">01782 719222</a>
        </p>
      </div>
    );
  }
}

export default BookingFormCalendar;
