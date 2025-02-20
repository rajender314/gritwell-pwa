import React from 'react';
import {Route, Navigate} from 'react-router-dom';
import {getLocalStorage} from '../core/localStorageService';
/**
 * Renders Component.
 * @param {Props} from the componnet.
 * @return {PrivateRoute} global private routes validation.
 */
export function PrivateRoute({children, ...rest}: any) {
  const token = getLocalStorage('token') ? getLocalStorage('token') : '';

  return (
    <Route
      {...rest}
      render={({location}: any) =>
                token ? (
                    children
                ) : (
                    <Navigate to="/sign-up" replace state={{from: location}} />
                 )
      }
    />
  );
}
