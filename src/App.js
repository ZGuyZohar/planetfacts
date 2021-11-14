import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import { AppHeader } from './cmps/AppHeader/AppHeader'
import { PlanetDetails } from './views/PlanetDetails/PlanetDetails';
import { PlanetPage } from './views/PlanetPage/PlanetPage';
import { HomePage } from './views/HomePage/HomePage';
import { PlanetEdit } from './views/PlanetEdit/PlanetEdit';
import { planetService } from './services/planet-service';
import { useEffect, useState } from 'react';

function App() {

  const [originPlanets, setOriginPlanets] = useState(null)

  useEffect(() => {
    (async ()=> {
      const originPlanets = await getOriginPlanets()
      setOriginPlanets(originPlanets)
    })()
  }, [])

  const getOriginPlanets = async () => {
    const planets = await planetService.getOriginPlanets()
    return planets
  }

  return (
    <Router>
      <div className="app">
      {originPlanets && <AppHeader planets={originPlanets} /> }

        <Switch>
          <Route component={HomePage}  exact path='/'  />
          <Route component={PlanetEdit} path='/planet/edit/:id?' />
          <Route component={PlanetDetails} path='/planet/:id' />

          {/* <Route component={ContactDetails} path='/contact/:id' /> */}
          {<PlanetPage path='/planet' />}
          {/* <Route component={Signup} path='/signup' /> */}
          {/* <Route component={Activities} path='/activities' /> */}
        </Switch>
      </div>
    </Router>
  );
}

export { App };
