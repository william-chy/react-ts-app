import { lazy, Suspense } from 'react';
import NoMatch from '../views/NoMatch';
import Index from '../views/Index';

const Loading = () => {
  return <div>Loading</div>;
};

const List = lazy(() => import(/* webpackChunkName: "List" */ '../views/TaskList'));
const Detail = lazy(() => import(/* webpackChunkName: "Detail" */ '../views/TaskDetail'));
const Memo = lazy(() => import(/* webpackChunkName: "Memo" */ '../views/Memo'));

const routes = [
  {
    path: '/',
    element: <Index />
  },
  // 重定向
  // { path: '/', redirectTo: 'demo' },
  {
    path: '/list',
    element: (
      <Suspense fallback={<Loading />}>
        <List />
      </Suspense>
    )
  },
  {
    path: '/memo',
    element: (
      <Suspense fallback={<Loading />}>
        <Memo />
      </Suspense>
    )
  },
  {
    path: '/detail',
    element: (
      <Suspense fallback={<Loading />}>
        <Detail />
      </Suspense>
    )
  },
  {
    path: '*',
    element: <NoMatch />
  }
];
export default routes;
