import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./auth/Login";
import { ToastContainer } from "react-toastify";
import Register from "./auth/Register";
import Home from "./booking/Home";
import TopNav from "./components/TopNav";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./user/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import DashboardSeller from "./user/DashboardSeller";
import NewHotel from "./hotels/NewHotel";
import StripeCallback from "./stripe/StripeCallback";
import "./index.css";
import EditHotel from "./hotels/EditHotel";
import ViewHotel from "./hotels/ViewHotel";
import StripeSuccess from "./stripe/StripeSuccess";
import StripeCancel from "./stripe/StripeCancel";
import SearchResults from "./hotels/SearchResults";

function App() {
  return (
    <div className="app">
      <Router>
        <TopNav />
        <ToastContainer />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/hotels/new" component={NewHotel} />
          <PrivateRoute
            exact
            path="/hotel/edit/:hotelId"
            component={EditHotel}
          />
          <PrivateRoute
            exact
            path="/stripe/callback"
            component={StripeCallback}
          />
          <PrivateRoute
            exact
            path="/dashboard/seller"
            component={DashboardSeller}
          />
          <Route exact path="/hotel/:hotelId" component={ViewHotel} />
          <PrivateRoute
            exact
            path="/stripe/success/:hotelId"
            component={StripeSuccess}
          />
          <PrivateRoute exact path="/stripe/cancel" component={StripeCancel} />
          <Route exact path="/search-results" component={SearchResults} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
