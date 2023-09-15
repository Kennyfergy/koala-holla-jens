
console.log("js");

$(document).ready(function () {
  console.log("JQ");
  // Establish Click Listeners
  setupClickListeners();
  // load existing koalas on page load
  getKoalas();

  $("#viewKoalas").on("click", ".transferBtn", changeTransferStatus);
  $("#viewKoalas").on("click", ".deleteBtn", deleteKoala);
}); 

function setupClickListeners() {
  $('#addButton').on('click', function() {
    console.log('in addButton on click');
    let koalaToSend = {
      name: $("#nameIn").val(),
      age: $("#ageIn").val(),
      gender: $("#genderIn").val(),
      ready_for_transfer: $("#readyForTransferIn").val(),
      notes: $("#notesIn").val(),

    };

    // call saveKoala with the new object
    saveKoala(koalaToSend); 
  });
}

function getKoalas() {
  console.log("in getKoalas");
  $.ajax({
    type: "GET",
    url: "/koalas",
  })
    .then(function (response) {
      console.log(response);
      appendDom(response);
    })
    .catch((err) => console.log("Error in GET", err));
}

function appendDom(koalas) {
  $("#viewKoalas").empty();
  

  for (let i = 0; i < koalas.length; i++) {
    const koala = koalas[i];
    let transferStatus = koala.ready_for_transfer ? 'Y' : 'N';
    
    $("#viewKoalas").append(`
  <tr>
  <td>${koala.name}</td>
  <td>${koala.age}</td>
  <td>${koala.gender}</td>


  <td>${transferStatus}</td>

  <td>${koala.notes}</td>
  <td>
  <button class="transferBtn" data-id=${koala.id}> Mark Ready for Transfer</button>
  </td>
  <td>
  <button class="deleteBtn" data-id=${koalas[i].id}>Delete</button>
  </td>
  </tr>
  `);
  
  }
}
function saveKoala(newKoala) {
  console.log("in saveKoala", newKoala);
  $.ajax({
      type: "POST",
      url: "/koalas",
      data: newKoala,
  })
      .then(function (response) {
          getKoalas();
      })
      .catch((err) => console.log("Error in POST", err));
}



function changeTransferStatus(event) {
  const koalaId = $(event.target).data("id");
  console.log("Change transfer status for koala id:", $(event.target));
  
  $.ajax({
      type: "put",
      url: `/koalas/${koalaId}`,
      data: { ready_for_transfer: 'Y' },
  })
      .then(function (response) {
        console.log('Response from server.', response);
        getKoalas();
      })
      .catch((err) => console.log("Error in PUT", err));
}


const deleteKoala = (event) => {
  const id = $(event.target).data("id");

  $.ajax({
    method: "DELETE",
    url: `/koalas/${id}`,
  })
    .then(() => {
      getKoalas();
    })
    .catch((err) => console.log(err));
};

