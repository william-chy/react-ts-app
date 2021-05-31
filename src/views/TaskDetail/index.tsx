import React from 'react';
import { Link } from 'react-router-dom';

export default function Detail() {
  return (
    <React.Fragment>
      <p>detail</p>
      <Link to="/list">back</Link>;
    </React.Fragment>
  );
}
