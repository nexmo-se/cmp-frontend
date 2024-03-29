import lodash from "lodash";

interface Constructor {
  id: string;
  name: string;
  price: number;

  requested?: number;
  submitted?: number;
  delivered?: number;
  read?: number;
  success?: number;
  error?: number;

  // This status is for voice
  busy?: number;
  cancelled?: number;
  unanswered?: number;
  disconnected?: number;
  rejected?: number;
  failed?: number;
  timeout?: number;
  completed?: number;

  total?: number;
}

class Report {
  id: string;
  name: string;
  price: number;

  requested?: number;
  submitted?: number;
  delivered?: number;
  read?: number;
  success?: number;
  error?: number;

  // This status is for voice
  busy?: number;
  cancelled?: number;
  unanswered?: number;
  disconnected?: number;
  rejected?: number;
  failed?: number;
  timeout?: number;
  completed?: number;

  total?: number;

  constructor (args: Constructor) {
    this.id = args.id;
    this.name = args.name;
    this.price = args.price;
    this.requested = args.requested;
    this.submitted = args.submitted;
    this.delivered = args.delivered;
    this.rejected = args.rejected;
    this.read = args.read;
    this.success = args.success;
    this.error = args.error;
    this.busy = args.busy;
    this.cancelled = args.cancelled;
    this.unanswered = args.unanswered;
    this.completed = args.completed;
    this.disconnected = args.disconnected;
    this.rejected = args.rejected;
    this.failed = args.failed;
    this.timeout = args.timeout;
    this.total = args.total;
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
      "timeout",
      "total",
      "completed",
      "requested",
      "success",
      "error"
    ];

    const givenSummaries = Object.keys(summaries);
    givenSummaries.forEach(
      (key) => {
        if (acceptedSummary.includes(key)) {
          Object.assign(this, { [key]: summaries[key] });
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

    const lowerCaseSummary = lodash(data.summary).mapKeys((value: number, key: string) => key.toLowerCase()).value();
    report.setSummaries(lowerCaseSummary);
    return report;
  }
}

export default Report;
