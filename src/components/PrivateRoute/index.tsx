import useUser from "hooks/user";
import { Redirect, Route, RouteProps } from "react-router-dom";

type PrivateRouteProps = RouteProps;

function PrivateRoute ({ location, ...routeProps }: PrivateRouteProps) {
  const { isAuthenticated } = useUser();

  if (isAuthenticated) {
    return <Route {...routeProps} />
  } else {
    return (
      <Redirect
        to={{
          pathname: "/",
          state: { from: location }
        }}
      />
    )
  }
}

export default PrivateRoute;
