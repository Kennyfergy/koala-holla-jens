const { put } = require("../../routes/koala.router");

console.log("js");

$(document).ready(function () {
  console.log("JQ");
  // Establish Click Listeners
  setupClickListeners();
  // load existing koalas on page load
  getKoalas();
  $("#viewKoalas"), on("click", ".transferBtn", changeTransferStatus); //this is a function to change the transfer status
}); // end doc ready

function setupClickListeners() {
  $("#addButton").on("click", function () {
    console.log("in addButton on click");
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: "testName",
      age: "testName",
      gender: "testName",
      readyForTransfer: "testName",
      notes: "testName",
    };
    // call saveKoala with the new object
    saveKoala(koalaToSend); // this will be changed to our new post ajax function
  });
}

function getKoalas() {
  console.log("in getKoalas");
  // ajax call to server to get koalas
  $.ajax({
    type: "get",
    url: "/koalas",
  })
    .then(function (response) {
      console.log(response);
      appendDom(response);
    })
    .catch((err) => console.log("Error in GET", err));
} // end getKoalas

function appendDom(koalas) {
  $("#viewKoalas").empty();

  for (let i = 0; i < koalas.length; i++) {
    const koala = koalas[i];
    //let transferStatus = koala.readyForTransfer ? "Ready" : "Not Ready";

    $("#viewKoalas").append(`
  <tr>
  <td>${koala.name}</td>
  <td>${koala.age}</td>
  <td>${koala.gender}</td>
  <td>${koala.notes}</td>
  <td>${koala.readyForTransfer}</td>
  <td>
  <button class="transferBtn" data-id=${koalas[i].id}> Mark Ready for Transfer</button>
  </td>
  </tr>
  `);
  }
} // end appendDom

function saveKoala(newKoala) {
  console.log("in saveKoala", newKoala);
  // ajax call to server to get koalas
}
