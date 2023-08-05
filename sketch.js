let serial; // variable to hold an instance of the serialport library
let latestData = "waiting for data"; // variable to hold the data

function setup() {
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
 
  serial.list(); // list the serial ports
  createCanvas(windowWidth, windowHeight);
  // serial constructor
  serial = new p5.SerialPort();
  // get a list of all connected serial devices
  serial.list();
  // serial port to use - you'll need to change this
  serial.open('COM4');
  // callback for when the sketchs connects to the server
  serial.on('connected', serverConnected);
  // callback to print the list of serial devices
  serial.on('list', gotList);
  // what to do when we get serial data
  serial.on('data', gotData);
  // what to do when there's an error
  serial.on('error', gotError);
  // when to do when the serial port opens
  serial.on('open', gotOpen);
  // what to do when the port closes
  serial.on('close', gotClose);
}
 


function serverConnected() {
    console.log("Connected to Server");
  }
  
  // list the ports
  function gotList(thelist) {
    console.log("List of Serial Ports:");
  
    for (let i = 0; i < thelist.length; i++) {
      console.log(i + " " + thelist[i]);
    }
  }
  
  function gotOpen() {
    console.log("Serial Port is Open");
  }
  
  function gotClose() {
    console.log("Serial Port is Closed");
    latestData = "Serial Port is Closed";
  }
  
  function gotError(theerror) {
    console.log(theerror);
  }
  
  // when data is received in the serial buffer
  
  function gotData() {
    let currentString = serial.readLine(); // store the data in a variable
    trim(currentString); // get rid of whitespace
    if (!currentString) return; // if there's nothing in there, ignore it
    console.log(currentString); // print it out
    latestData = currentString; // save it to the global variable
  }
  
  function draw() {
    background(255, 255, 255);
    fill(0, 0, 0);
    text(latestData, 10, 10); // print the data to the sketch
  
    // in this example, we are reciving a 0 and a 1
    // if the button is not pressed we get a 0
    if (latestData < 9 ) {
      ellipse(width / 2, height / 2, 100, 100);
    } else { // if it is pressed, we get a 1
      rectMode(CENTER);
      rect(width / 2, height / 2, 100, 100);
      
    }
    if (latestData < 7 ) {
      rectMode(CENTER);
      rect(width / 2, height / 2, 100, 100);
  } else { 
    if (latestData < 5 ) {
      rectMode(CENTER);
   ellipse(width / 2, height / 2, 100, 100);
    
      }
     if (latestData < 1 ) {
      rectMode(CENTER);
      rect(width / 2, height / 2, 100, 100);
   }
    } 
      }






// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    console.log(i + portList[i]);
  }
}