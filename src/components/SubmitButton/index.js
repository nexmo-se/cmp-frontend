import React from "react";

function SubmitButton(props){
  const { children, loading } = props;
  return (
    <button className="Vlt-btn Vlt-btn--primary Vlt-btn--app" disabled={loading}>
      {loading? <span class="Vlt-spinner Vlt-spinner--smaller Vlt-spinner--white"></span>: null }
      {children}
    </button>
  )
}
export default SubmitButton;