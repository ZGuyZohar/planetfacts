import { useState, useEffect } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import { Stars } from './cmps/Stars/Stars.jsx'
import { planetService } from './services/planet-service';
import { AppHeader } from './cmps/AppHeader/AppHeader'
import { PlanetDetails } from './views/PlanetDetails/PlanetDetails';

function App() {

  const [planets, setPlanets] = useState(null)
  
  useEffect(() => {
    planetService.query()
      .then(foundPlanets => {
        setPlanets(foundPlanets)

      })
  }, [])

  const getOriginPlanets = () => {
    return planets.filter(planet => planet.isOriginal)
  }

  return (
    <Router>
      <div className="App main-container">
      { planets && <AppHeader planets={getOriginPlanets()} /> }
        {/* <Stars /> */}

        <Switch>
          <Route component={PlanetDetails} path='/planet/:id' />

          {/* <Route component={ContactEdit} path='/contact/edit/:id?' /> */}
          {/* <Route component={ContactDetails} path='/contact/:id' /> */}
          {/* <Route component={ContactPage} path='/contact' /> */}
          {/* <Route component={Signup} path='/signup' /> */}
          {/* <Route component={Activities} path='/activities' /> */}
          {/* <Route component={HomePage} path='/' /> */}
        </Switch>
      </div>
    </Router>
  );
}

export { App };
