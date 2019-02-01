import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { compose } from '~/utils/fn';

const SIGNED_IN = true;
const SIGNED_OUT = false;

const ensureAuthState = (expectedAuthState, Component, redirectPath) => {
  const ConnectedComponent = ({ actualAuthState, ...props }) => {
    if (expectedAuthState !== actualAuthState) {
      if (expectedAuthState === SIGNED_IN) {
        const to = {
          pathname: redirectPath,
          state: {
            path: props.location.pathname,
          },
        };

        return <Redirect to={to} />;
      }

      const previousAttemptPath = (props.location.state || {}).path;

      return <Redirect to={previousAttemptPath || redirectPath} />;
    }

    return <Component {...props} />;
  };

  ConnectedComponent.propTypes = {
    actualAuthState: PropTypes.bool.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
      state: PropTypes.object,
    }).isRequired,
  };

  const mapStateToProps = state => ({
    actualAuthState: state.auth.authenticated,
  });

  return compose(withRouter, connect(mapStateToProps))(ConnectedComponent);
};

export {
  SIGNED_IN, SIGNED_OUT,
};

export default ensureAuthState;
