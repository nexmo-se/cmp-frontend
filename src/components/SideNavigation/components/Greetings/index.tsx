import useUser from "hooks/user";

function Greetings(){
  const { fullName } = useUser();

  return (
    <div className="Vlt-sidenav__block">
      <p className="Vlt-white">
        Welcome, <b>{fullName}</b>
      </p>
    </div>
  )
}

export default Greetings;
