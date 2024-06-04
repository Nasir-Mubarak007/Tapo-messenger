const express = require("express");
const dotenv = require("dotenv");
const { dChats } = require("./d-data");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const User = require("./Models/userModel");
const path = require("path");

connectDB();
const app = express();

app.use(express.json()); //to accept json data

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// // -----------Deployment------------

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/Client/dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "Client", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}
// -----------Deployment------------
// const __dirname1 = path.resolve();
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname1, "/Client/dist")));
//   pp.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running...");
//   });
// }
// // -----------Deployment------------

app.use(notFound);
app.use(errorHandler);

const server = app.listen(
  process.env.PORT || 4000,
  console.log(`Server started on Port ${process.env.PORT}`)
);

// SOCKET IO
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
  },
});

//  for connection
io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  // for joining room or 1to1 chat
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joined " + room + " Room");
  });

  // for typing animation
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  // for sending messages
  socket.on("new message", (newMsgRecieved) => {
    let chat = newMsgRecieved.chat;
    // if there are no users in the chat
    if (!chat.users) return console.log("chat.users not defined");

    // for sending msgs
    chat.users.forEach((user) => {
      // for the sender in a groupchat or 1on1 chat
      if (user._id == newMsgRecieved.sender._id) return;

      // for the reciever(s)
      socket.in(user._id).emit("message recieved", newMsgRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
