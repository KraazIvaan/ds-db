export class Meeting {
  _id: string;
  date: string;
  dayOfMonth: string;
  topic: string;
  members: Array<string>;
  
  constructor() {
    this._id = '';
    this.date = '';
    this.topic = '';
    this.members = [];
  }
  
  getDate() {
    let d = new Date(this.date);
    this.dayOfMonth = d.getDate().toString();
  }
}