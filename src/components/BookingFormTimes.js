import Component from "inferno-component";

class BookingFormCalendar extends Component {
  constructor() {
    super();
    this.state = {
      times: {
        breakfast: {
          "09:00": true,
          "09:15": false,
          "09:30": true,
          "09:45": true,
          "10:00": false,
          "10:15": false,
          "10:30": false,
          "10:45": true,
          "11:00": true,
          "11:15": true,
          "11:30": true,
          "11:45": true
        },
        lunch: {
          "12:00": true,
          "12:15": false,
          "12:30": true,
          "12:45": true,
          "13:00": false,
          "13:15": false,
          "13:30": false,
          "13:45": true,
          "14:00": true,
          "14:15": true,
          "14:30": false,
          "14:45": false,
          "15:00": true,
          "15:30": true,
          "16:00": true,
          "16:30": false
        },
        dinner: {
          "17:00": true,
          "17:15": false,
          "17:30": true,
          "17:45": true,
          "18:00": false,
          "18:15": false,
          "18:30": false,
          "18:45": true,
          "19:00": true,
          "19:15": true,
          "19:30": true,
          "19:45": true,
          "20:00": true,
          "20:15": true,
          "20:30": true,
          "20:45": true,
          "21:00": true,
          "21:15": true,
          "21:30": true,
          "21:45": true
        }
      }
    };
  }

  render() {
    const TimeList = times => {
      return (
        <ul className="BookingFormTimes__sitting--grid">
          {Object.entries(times).map(time => {
            const listClasses = [];
            if (time[0] === this.props.activeTime) listClasses.push("active");
            if (time[1] === false) listClasses.push("unavailable");
            return (
              <li
                className={listClasses.join(" ")}
                onClick={() => {
                  if (time[1] === true) this.props.setTime(time[0]);
                }}
              >
                {time}
              </li>
            );
          })}
        </ul>
      );
    };
    return (
      <div className="BookingFormTimes">
        <div className="BookingFormTimes__sitting">
          <h5>Breakfast</h5>
          {TimeList(this.state.times.breakfast)}
        </div>
        <div className="BookingFormTimes__sitting">
          <h5>Lunch</h5>
          {TimeList(this.state.times.lunch)}
        </div>
        <div className="BookingFormTimes__sitting">
          <h5>Dinner</h5>
          {TimeList(this.state.times.dinner)}
        </div>
      </div>
    );
  }
}

export default BookingFormCalendar;
