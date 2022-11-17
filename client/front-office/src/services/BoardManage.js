import Api from "./Api.js";

const BASE = "leaderboard/";

const BoardManage = {
  // if data is empty, return all boards
  getBoard(data) {
    return Api().get(BASE, {params: data});
  },
};

export default BoardManage;
