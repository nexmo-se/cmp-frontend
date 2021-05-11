import Application from "entities/application";
import useStyles from "./styles";

interface CompactTableProps {
  applications: Application[];
  limit?: number
}

function CompactTable ({ applications, limit=5 }: CompactTableProps) {
  const mStyles = useStyles();

  return applications.slice(0, limit + 1).map((application, index) => {
    return (
      <div
        key={application.id}
        className={mStyles.container}
      >
        <div className="Vlt-number Vlt-number--dialer" data-index={index + 1} />
        <div className={mStyles.nameContainer}>
          <p className={mStyles.name}>
            <b>{application.name}</b>
          </p>
          <small
            className="Vlt-grey Vlt-truncate"
            style={{ maxWidth: 200 }}
          >
            {application.id}
          </small>
        </div>
      </div>
    )
  })
}

export default CompactTable;
