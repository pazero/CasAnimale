const BEURL = "http://localhost:5000";
// if develpoment const FOURL = "http://localhost:3000"
// if production const FOURL = BEURL + "/f";
const FOURL = "http://localhost:3000" + "/f";
// if develpoment const GAMEURL = "http://localhost:5173"
// if production const GAMEURL = BEURL + "/g";
const GAMEURL = "http://localhost:5173"; //+ "/g";
const BOURL = BEURL + "/b";

export default { BEURL, GAMEURL, BOURL, FOURL };
