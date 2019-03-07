export class Member {
  _id: string;
  lastEditDate: string; //in
  first: string; //in
  last: string; //in
  address: string; //in
  city: string; //in
  state: string; //in
  zip: string; //in
  email1: string; //in
  email2: string; //in
  phoneHome: string; //in
  phoneMobile: string; //in
  phoneWork: string; //in
  prefEmail: boolean; //in
  prefText: boolean; //in
  prefPhone: boolean; //in
  commPref: string;
  linkedin: string; //in
  joinDate: string;
  currentlyEmployed: boolean; //in
  employmentFrom: string; //in
  employmentTo: string; //in
  employmentCompany: string;  // ID of company - in
  employmentDescription: string; //in
  whatDo: string; // not currently used - remove?
  supported: string; //in
  priorExp: string; //in
  pastEmployers: Array<string>; //in
  careerStage: string; //in
  skills: string; //in
  whyJoined: string; //in
  interests: string; //in
  needs: string; //in
  canHelp: string; //in
  canDo: string; //in
  contactsInComps: Array<string>; //in
  contactsInInds: Array<string>; //in
  memberOfOrgs: Array<string>; //in
  targetOccs: Array<string>; //in
  targetIndustry: string; //in
  targetComps: Array<string>; //in
  planA: string; //in
  planB: string; //in
  planC: string; //in
  
}
