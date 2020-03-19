import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    cursor: "pointer"
  },
  nameContainer: { 
    flexGrow: 1,
    marginLeft: 16
  },
  name: { marginBottom: 0 }
}))

function CompactTable({ applications, limit=5 }){
  const mStyles = useStyles();
  return applications.slice(0, limit + 1).map((application, index) => {
    return (
      <div key={application.id} className={mStyles.container}>
        <div className="Vlt-number Vlt-number--dialer" data-index={index + 1} />
        <div className={mStyles.nameContainer}>
          <p className={mStyles.name}>
            <b>{application.name}</b>
          </p>
          <small className="Vlt-grey Vlt-truncate" style={{ maxWidth: 200 }}>{application.id}</small>
        </div>
      </div>
    )
  })
}
export default CompactTable;
