import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';

import './random-planet.css';
import '../spinner'
import Spinner from '../spinner';

export default class RandomPlanet extends Component {

  swapiService = new SwapiService();

  constructor() {
    super();
    this.updatePlanet();
  }

  state = {
    planet: {},
    loading: true
  };

  
  onPlanetLoaded = (planet) => {
    this.setState({ planet , loading : false});
  };

  updatePlanet() {
    const id = Math.floor(Math.random() * (20)) + 1;;
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded);
  };
 
  render() {
    const {planet , loading} = this.state;
    const spinner = loading ? <Spinner/> : <PlanetView planet ={planet}/>;
    return(
    <div className="random-planet jumbotron rounded">
      {spinner}
    </div>
   );
    
  }
}
const PlanetView = ({planet}) => {
  const { id, name, population,
    rotationPeriod, diameter } = planet;
    return (
         <React.Fragment>
           <img className="planet-image"
             src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
           <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
      
         </React.Fragment>
    )
  }
