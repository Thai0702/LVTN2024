import axios from "axios";
import { BE_URL, Signup } from "../utils";



const Sigup_S = async (value) => {
  const res = await axios.post(`${BE_URL}${Signup}`, value);
  return res.data;
};

// const Auth_S = async (value) => {
//   const res = await axios.get(`${BE_URL}${Auth}`, {
//     headers: {
//       "x-access-token": value,
//     },
//   });
//   return res.data;
// };

// const Update_User = async (data, Token) => {
//   const res = await axios.put(`${BACKEND_URL}${type}${UPDATE_uSER}`, data, {
//     headers: {
//       "x-access-token": Token,
//     },
//   });
//   return res.data;
// };

// const Get_Playlist_User = async (data, Token) => {
//   const res = await axios.post(
//     `${BACKEND_URL}${type}${GET_PLAYLIST_USER}`,
//     { User_Id: data },
//     {
//       headers: {
//         "x-access-token": Token,
//       },
//     }
//   );
//   return res.data;
// };

export { Sigup_S};
//   SigupService,
//   verify_JWT,
//   Get_Playlist_User,
//   Update_User,
