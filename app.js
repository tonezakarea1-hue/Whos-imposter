// DEBUG TEST (temporary)
const homeMsg = document.getElementById("homeMsg");
if (homeMsg) homeMsg.innerText = "✅ app.js loaded";

window.createRoom = function () {
  alert("✅ Create Room clicked!");
};

window.joinRoom = function () {
  alert("✅ Join clicked!");
};
