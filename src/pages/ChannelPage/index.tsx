import { useState } from "react";

import ChannelTable from "components/ChannelTable";
import Header from "./components/Header";

function ChannelPage(){
  return (
    <>
      <Header />
      <hr />
      <div className="Vlt-grid">
        <div className="Vlt-col">
          <ChannelTable />
        </div>
      </div>
    </>
  )
}
export default ChannelPage;