import "./TravelGuide.css";
import things from '../assets/imgs/places.jpg'
import visas from '../assets/imgs/visas.webp'
import weather from '../assets/imgs/weather.webp'
import food from '../assets/imgs/food.jpg'
import culture from '../assets/imgs/culture.webp'
import fordsword from '../assets/imgs/scroll.jpg'
function TravelGuide() {
  return (
    <section id="guide" className="travel-guide">
      <h2>China Travel Guide</h2>
      <div className="circle-container">
        <a href="things.html" className="circle-link">
          <div className="circle">
            <img src={things} alt="Places" />
          </div>
          <p>Places</p>
        </a>
        <a href="visas.html" className="circle-link">
          <div className="circle">
            <img src={visas} alt="Visas" />
          </div>
          <p>Visas</p>
        </a>
        <a href="weather.html" className="circle-link">
          <div className="circle">
            <img src={weather} alt="Weather" />
          </div>
          <p>Weather</p>
        </a>
        <a href="food.html" className="circle-link">
          <div className="circle">
            <img src={food} alt="Food" />
          </div>
          <p>Food</p>
        </a>
        <a href="culture.html" className="circle-link">
          <div className="circle">
            <img src={culture} alt="Culture" />
          </div>
          <p>Culture</p>
        </a>
      </div>
      <div className="saying">
        <img src={fordsword} alt="saying"/>
        <div className="text">
          <h3>Before everything else, getting ready is the Secret of Success.</h3>
        </div>
        <h3 className="name">Henry Ford</h3>
      </div>
    </section>
  );
}
export default TravelGuide;
