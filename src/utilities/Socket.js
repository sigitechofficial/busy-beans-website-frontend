import { io } from "socket.io-client";
// import { BASE_URL_SOCKET } from "./URL";

// const socket = io("wss://backend.fomino.ch:3041", {
//   transports: ["websocket"],
// });

const socket = io("https://bb.allfourcar.com", {
  transports: ["websocket"],
});

export default socket;


// import { io } from "socket.io-client";
// const socket = io("wss://backend.fomino.ch:3041", {
//   transports: ["websocket"],
// });
// export default socket;