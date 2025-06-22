import axios from "axios";

export const fetchMyTeams = async () => {
  const response = await axios.get("http://localgost:8080/teams/my");
  return response.data.teams; // teams 배열
};
