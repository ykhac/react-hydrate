/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { folderMap as routes, componentPath } from './routes.json';

const components: { [id: string]: any } = {};

Object.keys(componentPath).map((id: string) => {
  console.log((componentPath as any)[id as any]);
  components[id] = React.lazy(
    () => import((componentPath as any)[id as any] as string)
  );
});

function generateRoutes(objRoutes: any): any {
  console.log({ ...components });
  return Object.keys(objRoutes).map((key) => {
    if (typeof objRoutes[key] === 'string') {
      return {
        path: key === 'index' ? '/' : key,
        index: key === 'index',
        element: components[objRoutes[key]],
      };
    }

    const obj = {
      path: key === 'index' ? '/' : key,
      element: objRoutes[key]['index'] ? components[objRoutes[key]] : null,
    };

    delete objRoutes[key]['index'];

    return {
      ...obj,
      children: generateRoutes(objRoutes[key]),
    };
  });
}

const routesParse = generateRoutes(routes);

export default function App() {
  return (
    <Routes>
      {routesParse.map((route: any) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}
