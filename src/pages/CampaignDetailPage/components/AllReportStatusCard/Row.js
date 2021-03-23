// @flow
import React from "react";

interface RowProps {
  label: string;
  value?: ?string | ?number;
}

function Row ({ label, value }) {

  if (!value) return null;
  else {
    return (
      <div className="Vlt-grid">
        <div className="Vlt-col">
          <p>{label}</p>
        </div>
        <div className="Vlt-col">
          {value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </div>
      </div>
    )
  }
}

export default Row;
