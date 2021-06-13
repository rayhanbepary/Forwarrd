import './App.css';
import { connect } from 'react-redux';
import { Switch, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import AllWithdraw from './pages/AllWithdraw/AllWithdraw';
import PendingWithdraw from './pages/PendingWithdraw/PendingWithdraw';
import AddDeposit from './pages/AddDeposit/AddDeposit';
import AllDeposit from './pages/AllDeposit/AllDeposit';
import Users from './pages/Users/Users';
import UserDetails from './pages/Users/UserDetails';
import Collectors from './pages/Collectors/Collectors';
import CollectorDetails from './pages/Collectors/CollectorDetails';
import Admins from './pages/Admins/Admins';
import AdminDetails from './pages/Admins/AdminDetails';
import Account from './pages/Account/Account';
import AllDepositUser from './pages/AllDepositUser/AllDepositUser';
import AllWithdrawUser from './pages/AllWithdrawUser/AllWithdrawUser';
import Withdraw from './pages/Withdraw/Withdraw';
import AllCollections from './components/CollectorDashboard/AllCollections';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Terms from './pages/Terms/Terms';
import Privacy from './pages/Privacy/Privacy';
import Counter from './pages/Counter/Counter';


function App({auth}) {

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/about" exact component={About} />
      <Route path="/contact" exact component={Contact} />
      <Route path="/login" exact component={Login} />
      <Route path="/login/forgot-password" exact component={ForgotPassword} />
      <Route path="/reset-password/:token" exact component={ResetPassword} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/terms-conditions" exact component={Terms} />
      <Route path="/privacy" exact component={Privacy} />
      <PrivateRoute path="/withdraw-pending" exact component={PendingWithdraw} auth={auth} />
      <PrivateRoute path="/withdraw-all" exact component={AllWithdraw} auth={auth} />
      <PrivateRoute path="/deposit-add" exact component={AddDeposit} auth={auth} />
      <PrivateRoute path="/deposit-all" exact component={AllDeposit} auth={auth} />
      <PrivateRoute path="/users" exact component={Users} auth={auth} />
      <PrivateRoute path="/user-details/:userId" exact component={UserDetails} auth={auth} />
      <PrivateRoute path="/collectors" exact component={Collectors} auth={auth} />
      <PrivateRoute path="/collector-details/:collectorId" exact component={CollectorDetails} auth={auth} />
      <PrivateRoute path="/admins" exact component={Admins} auth={auth} />
      <PrivateRoute path="/admin-details/:adminId" exact component={AdminDetails} auth={auth} />
      <PrivateRoute path="/account" exact component={Account} auth={auth} />
      <PrivateRoute path="/deposit-all-user" exact component={AllDepositUser} auth={auth} />
      <PrivateRoute path="/withdraw-all-user" exact component={AllWithdrawUser} auth={auth} />
      <PrivateRoute path="/withdraw" exact component={Withdraw} auth={auth} />
      <PrivateRoute path="/collection-all" exact component={AllCollections} auth={auth} />
      <PrivateRoute path="/counter" exact component={Counter} auth={auth} />
    </Switch>
  );
}

const mapStateToProps = state => ({ 
  auth: state.auth 
});

export default connect(mapStateToProps)(App);
