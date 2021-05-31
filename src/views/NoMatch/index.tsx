import { Redirect, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function NoMatch() {
  let location = useLocation();
  const [ redirectSec, setRedirectFlag ] = useState(3);
  useEffect(() => {
    let timer: NodeJS.Timeout = setInterval(() => {
      if (redirectSec <= 0) return clearInterval(timer);
      setRedirectFlag(redirectSec - 1);
    }, 1000);
    return () => {
      timer && clearInterval(timer);
    };
  });
  return (
    <div>
      {redirectSec ? (
        <h3>
          No match for <code>{location.pathname}</code> <br />
          after {redirectSec}s will redirect to index
        </h3>
      ) : (
        <Redirect
          to={{
            pathname: '/'
          }}
        />
      )}
    </div>
  );
}
