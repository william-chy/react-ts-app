import React from 'react';
import { Link } from 'react-router-dom';

export default function Detail() {
  return (
    <React.Fragment>
      <div className="panel">
        <div className="panel-header">
          <div className="panel-title">详情</div>
        </div>
        <div className="panel-nav" />
        <div className="panel-body">
          <p> 功能敬请期待</p>
        </div>
        <div className="panel-footer">
          <Link to="/list">back</Link>
        </div>
      </div>
    </React.Fragment>
  );
}
