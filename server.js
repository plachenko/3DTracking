const ws = require('ws');
const wss = new ws.Server({port: 8069});

const osc = require('osc');
const gamepad = require('gamepad');
const robot = require('robotjs');
const THREE = require('three');

let cameraLock = false;

robot.setMouseDelay(2);

let cameraAzm = null;
let cameraPol = null;

const obj = {
  type: null,
  payload: null
}

gamepad.init();
setInterval(gamepad.processEvents, 16);
// console.log(gamepad);

gamepad.on("move", function (id, axis, value) {
  /*
  console.log("move", {
    id: id,
    axis: axis,
    value: value,
  });
  */

  obj.type = "controller";
  obj.payload = {
    id: id,
    axis: axis,
    value: value
  }

  sendMessage(obj);
});


// const controller = GamePad('ps3/dualshock3');
// console.log(controller);
// controller.connect();

/*
controller.on('x:move', (e) => {
  console.log(e);
});
*/

let connections = [];

const udpPort = new osc.UDPPort({
  localAddress: "0.0.0.0",
  localPort: 7000
});

udpPort.open();

udpPort.on("message", function (oscMessage) {
  if(oscMessage.address == '/joint_Head_1'){
    obj.type = "Skeleton";
    obj.payload = oscMessage.args;
    sendMessage(obj);
  }
});

function sendMessage(obj){
  connections.forEach((e) => {
    e.send(JSON.stringify(obj));
  });
}

udpPort.on("error", function (err) {
  console.log(err);
});

robot.setMouseDelay(20);

function moveCamX(delta){
  for(let i = 0; i < Math.abs(delta); i++){
    robot.moveMouse(i * Math.sign(delta), robot.getScreenSize().height / 2);
  }
}

/*
setTimeout(()=>{
  console.log('moving!', robot.getScreenSize());
  for(let i =0; i < 1366; i++){
    robot.moveMouse(i, robot.getScreenSize().height / 2);
  }
}, 5000);
*/

wss.on('connection', (ws) => {
  connections.push(ws);
  ws.on('message', (data) => {
    const parsedData = JSON.parse(data);

    if(parsedData.type == 'cameraLock'){
      cameraLock = parsedData.payload.lock;
      cameraAzm = parsedData.payload.azm;
      cameraPol = parsedData.payload.pol;

      // moveCamX(400);
      return;
    }

    if(parsedData.type == 'camera'){
      if(cameraLock){
        const deltaX = cameraAzm - parsedData.payload.azm;
        const deltaY = cameraPol + parsedData.payload.pol;

        robot.moveMouse(deltaX * 10, deltaY * 10);
      }
    }

    sendMessage(parsedData);
  });
});

