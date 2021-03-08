export class Meeting {
  _id: string;
  date: string;
  dayOfMonth: string;
  topic: string;
	members: Array<string>;
	questions: Array<string>;
  
  constructor() {
    this.date = '';
    this.topic = '';
		this.members = [];
		this.questions = [];
  }
  
  getDate() {
    let d = new Date(this.date);
    this.dayOfMonth = d.getDate().toString();
	}
	
	getAttendance(member_id) {
		return ( this.members.indexOf(member_id) > -1 );
	}
}