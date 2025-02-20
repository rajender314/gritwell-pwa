import React from 'react';
import {Route} from 'react-router-dom';
import {Navigate} from 'react-router';
import {getLocalStorage} from '../core/localStorageService';
/**
 * Renders Component.
 * @param {Props} from the componnet.
 * @return {PrivateRoute} global private routes validation.
 */
export function PublicRoute({children, ...rest}: any) {
  const token = getLocalStorage('token') ? getLocalStorage('token') : '';


  return (
    <Route
      {...rest}
      render={({location}: any) =>
                token ? (
                    children
                ) : (
                    <Navigate to="/home" replace state={{from: location}} />
                )
      }
    />
  );
}
