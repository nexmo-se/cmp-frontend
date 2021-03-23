// flow
import { DateTime } from "luxon"

interface Constructor {
  id: string;
  downloadUrl?: ?string;
  name: string;
  status?: ?string;
  price: number;

  submitted?: ?number;
  delivered?: ?number;
  rejected?: ?number;
  read?: ?number;

  // This status is for voice
  busy?: ?number;
  cancelled?: ?number;
  unanswered?: ?number;
  disconnected?: ?number;
  rejected?: ?number;
  failed?: ?number;
  timeout?: ?number;

  totalRecord?: ?number;
}

class Report {
  id: string;
  downloadUrl: ?string;
  name: string;
  status: ?string;
  price: number;

  submitted: ?number;
  delivered: ?number;
  rejected: ?number;
  read: ?number;

  // This status is for voice
  busy: ?number;
  cancelled: ?number;
  unanswered: ?number;
  disconnected: ?number;
  rejected: ?number;
  failed: ?number;
  timeout: ?number;

  totalRecord: ?number;

  constructor (args: Constructor) {
    this.id = args.id;
    this.downloadUrl = args.downloadUrl;
    this.name = args.name;
    this.status = args.status;
    this.price = args.price;
    this.submitted = args.submitted;
    this.delivered = args.delivered;
    this.rejected = args.rejected;
    this.read = args.read;
    this.busy = args.busy;
    this.cancelled = args.cancelled;
    this.unanswered = args.unanswered;
    this.disconnected = args.disconnected;
    this.rejected = args.rejected;
    this.failed = args.failed;
    this.timeout = args.timeout;
    this.totalRecord = args.totalRecord;
  }
  
  setSummaries (summaries: any) {
    const acceptedSummary = [
      "submitted",
      "delivered",
      "rejected",
      "read",
      "busy",
      "cancelled",
      "unanswered",
      "disconnected",
      "rejected",
      "failed",
      "timeout"
    ];

    const givenSummaries = Object.keys(summaries);
    givenSummaries.forEach(
      (key) => {
        if (acceptedSummary.includes(key)) {
          this[key] = summaries[key];
        } else {
          // The summary is not accepted
          // The backend might give more data to the accepted summary
          // Consult to backend team and check if they gives 
          // new summary
        }
      }
    )
  }
  
  static fromResponse (data: any) {
    const report = new Report({
      id: data.id,
      name: data.name,
      price: parseFloat(data.price)
    });

    report.setSummaries(data.summary);
  }
}

export default Report;
