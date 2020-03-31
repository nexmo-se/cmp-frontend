import React from "react";
import useUser from "hooks/user";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const mUser = useUser();
  return (
    <Route 
      {...rest}
      render={(props) => {
        if(mUser.isAuthenticated){
          return <Component {...props} />
        }else{
          return (
            <Redirect to={{
              pathname: "/",
              state: { from: props.location }
            }} />
          )
        }
      }}
    />
  )
};

export default PrivateRoute;