import Component from "inferno-component";

class Contact extends Component {
  componentWillMount() {
    window.initMap = this.initMap;
  }
  componentDidMount() {
    window.initMap();
  }

  initMap = () => {
    const google = window.google;
    if (typeof google === "undefined") return;
    var uluru = { lat: 52.996696, lng: -2.210844 };
    var map = new google.maps.Map(document.getElementById("Contact__map"), {
      zoom: 14,
      center: uluru,
      styles: [
        { elementType: "geometry", stylers: [{ color: "#1a1a1a" }] },
        {
          elementType: "labels.text.stroke",
          stylers: [{ color: "#1a1a1a" }]
        },
        {
          elementType: "labels.text.fill",
          stylers: [{ color: "#ffffff" }]
        },
        {
          featureType: "administrative.locality",
          elementType: "labels.text.fill",
          stylers: [{ color: "#ffffff" }]
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#aaaaaa" }]
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#222222" }]
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [{ color: "#222222" }]
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#444444" }]
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#1a1a1a" }]
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#cccccc" }]
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#C7701F" }]
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#1a1a1a" }]
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [{ color: "#ffffff" }]
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{ color: "#222222" }]
        },
        {
          featureType: "transit.station",
          elementType: "labels.text.fill",
          stylers: [{ color: "#C7701F" }]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#444444" }]
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#aaaaaa" }]
        },
        {
          featureType: "water",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#1a1a1a" }]
        }
      ]
    });
    // eslint-disable-next-line
    var marker = new google.maps.Marker({
      position: uluru,
      map: map,
      icon: "/images/icons/map-pin-logo.png"
    });
  };
  render() {
    return (
      <div className="Contact">
        <div className="Contact__top">
          <img
            src="/mockup/contact-info.png"
            alt=""
            className="Contact__info"
          />
          <div id="Contact__map" />
        </div>
        <div className="page-container">
          <form className="Contact__form">
            <div className="Contact__form--text">
              <h3>Contact Us</h3>
              <p>
                For any general enquiries, please conact us using the form below
                and a member of our team will contact you as soon as possible.
                for a quicker response, you can call us on:{" "}
                <span className="bold-orange">01782 719222</span>
              </p>
            </div>
            <div className="Contact__form--input">
              <label htmlFor="name">
                Name<span className="bold-orange">*</span>
              </label>
              <input name="name" type="text" required />
            </div>
            <div className="Contact__form--input">
              <label htmlFor="email">
                Email Address<span className="bold-orange">*</span>
              </label>
              <input name="email" type="text" required />
            </div>
            <label htmlFor="message">
              Message<span className="bold-orange">*</span>
            </label>
            <textarea name="message" cols="50" rows="10" required />
            <button className="Button__main" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Contact;
