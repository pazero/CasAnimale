const BEURL = "http://0.0.0.0:5000";
// if develpoment const FOURL = "http://localhost:3000"
// if production const FOURL = BEURL + "/f";
const FOURL = BEURL + "/f";
// if develpoment const GAMEURL = "http://localhost:5173"
// if production const GAMEURL = BEURL + "/g";
const GAMEURL = BEURL + "/g";
const BOURL = BEURL + "/b";

export default { BEURL, GAMEURL, BOURL, FOURL };
