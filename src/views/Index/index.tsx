import { Link } from 'react-router-dom';
import React from 'react';

export default function Index() {
  const routeList = [
    {
      path: '/list',
      text: '待办',
      detail: '记录一些待办'
    },
    {
      path: '/memo',
      text: '备忘',
      detail:'当作剪切板用'
    }
  ];

  return (
    <React.Fragment>
      <div className="hero bg-gray">
        <div className="hero-body text-center">
          <h1 className="hide-sm">Hello,William</h1>
          <div className="container">
            <div className="columns mx-2 px-2">
              {routeList.map(({ path, text,detail }, index) => (
                <div className="column col-sm-12 col-6" key={index}>
                  <div className="card">
                    <div className="card-image bg-primary">{index + 1}</div>
                    <div className="card-header">
                      <div className="card-title h5">{text}</div>
                      {/* <div className="card-subtitle text-gray">{detail}</div> */}
                    </div>

                    <div className="card-body">{detail}</div>
                    <div className="card-footer">
                      <Link className="btn btn-primary" to={path}>
                        打开
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
