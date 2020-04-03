import React from "react";
import useUser from "hooks/user";

function Greetings(){
  const mUser = useUser();

  React.useEffect(() => {
    if(mUser.token) mUser.getMyInfo();
  }, [ mUser.token ])

  return (
    <div className="Vlt-sidenav__block">
      <p className="Vlt-white">Welcome, <b>{mUser.fullName}</b></p>
    </div>
  )
}
export default Greetings;