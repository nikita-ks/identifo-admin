import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '~/modules/auth/actions';
import LogoutIcon from '~/components/icons/LogoutIcon';

const LogoutSection = (props) => {
  const handleClick = () => {
    props.logout();
    props.onClick();
  };

  return (
    <button
      type="button"
      className="iap-profile-dropdown__section"
      onClick={useCallback(handleClick, [props.logout, props.onClick])}
    >
      <LogoutIcon />
      <span>Logout</span>
    </button>
  );
};

LogoutSection.propTypes = {
  logout: PropTypes.func.isRequired,
  onClick: PropTypes.func,
};

LogoutSection.defaultProps = {
  onClick: () => {},
};

export { LogoutSection };

export default connect(null, { logout })(LogoutSection);