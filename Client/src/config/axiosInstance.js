import axios from "axios";

// import { ChatState } from "../Context/ChatProvider";

// const { user } = ChatState();

// export const axiosInstance = (user) => {
//   axios.create({
//     baseURL: "https://tapo-messenger-1.onrender.com",
//   }).defaults["auth"]["Bearer"] = user.token;
// };
export const axiosInstance = (user) => {
  axios.create({
    baseURL: "http://localhost:5000",
  }).defaults["auth"]["Bearer"] = user.token;
};

export const baseURL = "http://localhost:5000";
