import {
  connect
} from 'react-redux';
import {
  bindActionCreators
} from 'redux';
import * as userActionCreators from '../actions/user';
import SignIn from '../components/SignIn';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      user: bindActionCreators(userActionCreators, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
