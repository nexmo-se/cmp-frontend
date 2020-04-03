import React from "react";

import useError from "hooks/error";
import useUser from "hooks/user";

function Greetings(){
  const mUser = useUser();
  const mError = useError();

  async function fetchData(){
    try{
      await mUser.getMyInfo();
    }catch(err){
      mError.throwError(err);
    }
  }

  React.useEffect(() => {
    fetchData();
  }, [ mUser.token ])

  return (
    <div className="Vlt-sidenav__block">
      <p className="Vlt-white">Welcome, <b>{mUser.fullName}</b></p>
    </div>
  )
}
export default Greetings;