import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Switch, Route, useLocation } from 'react-router-dom';
import Timer, { size } from './components/Timer/index';
import router from './routers/index';

const computeSize = (path: string) => {
  return path === '/' ? 'large' : 'small';
};

function App() {
  const [ size, setsize ] = useState('small');
  let location = useLocation();
  useEffect(
    () => {
      console.log('location.pathname', location);
      setsize(computeSize(location.pathname));
    },
    [ location ]
  );

  return (
    <React.Fragment>
      <Timer size={size as size} />
      <div className="route-wrap">
        <Switch>
          {router.map((route) => {
            return (
              <Route exact strict path={route.path} key={route.path}>
                {route.element}
              </Route>
            );
          })}
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;
