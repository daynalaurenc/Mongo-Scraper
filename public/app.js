$.getJSON("/articles", function (data) {


  console.log("-------------")
  console.log(data)
  for (var i = 0; i < data.length; i++) {
    $("#articles").append(`
      <div class="col-sm-12 col-md-6 col-lg-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${data[i].title}</h5>
            <p class="card-text">${data[i].content}</p>
            <a href="https://www.si.com${data[i].link}" target="_blank" class="card-link">View Article</a>
            <a href="#" class="card-link notes" data-id="${data[i]._id}" data-toggle="modal" data-target="#myModal">Notes</a>
            </div>
        </div>
      </div>
      <br><br>
      `);
  }
});

// When you click the Fetch button
$(document).on("click", ".btn-fetch", function () {

  $.ajax({
    method: "GET",
    url: "/scrape"
  })
    .done(function (data) {
      setTimeout(function () {
        location.reload();
      }, 2000)

    });
});

// When you click the Note button
$(document).on("click", ".notes", function () {

  $(".modal-title").empty();
  $(".input").empty();

  // Save the id from .btn-note
  var thisId = $(this).attr("data-id");
  console.log(thisId);

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .done(function (data) {
      console.log(data);

      $(".modal-title").append("<h5>" + data.title + "</h5>");
      // $(".input").append("<textarea id='bodyinput' name='body'></textarea>");
      // $(".input").append("<button data-id='" + data._id + "' id='savenote' class='btn btn-outline-dark btn-sm' style='margin-top:20px;'data-dismiss='modal'>Save Note</button>");

      if (data.note) {
        $(".input").append("<b>Current Note:</b><span id='note-span'>" + data.note.body + "</span>");
        $(".input").append("<button data-id='" + data.note._id + "' id='deletenote' class='btn btn-outline-dark btn-sm' style='margin-top:20px;'data-dismiss='modal'>X</button>");
      }
      $(".input").append("<textarea id='bodyinput' name='body'></textarea>");
      $(".input").append("<button data-id='" + data._id + "' id='savenote' class='btn btn-outline-dark btn-sm' style='margin-top:20px;'data-dismiss='modal'>Save Note</button>");

      // If there's a note in the article
      // if (data.note) {
      //   // Place the body of the note in the body textarea
      //   $("#bodyinput").val(data.note.body);
      // }
    });
});

// When you click the Save Note button
$(document).on("click", "#savenote", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  console.log(thisId);

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })

    .done(function (data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      // $("#bodyinput").empty();
    });

  // Remove the values entered in the input and textarea for note entry
  $("#bodyinput").val("");
});

// When you click the Delete Note button
$(document).on("click", "#deletenote", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  console.log(thisId);

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/delete/" + thisId,
    data: {
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })

    .done(function (data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      // $("#bodyinput").empty();
    });

  // Remove the values entered in the input and textarea for note entry
  $("#bodyinput").val("");
});





// var $newItemInput = $("input.new-item");
// // Our new todos will go inside the todoContainer
// var $todoContainer = $(".todo-container");
// // Adding event listeners for deleting, editing, and adding todos
// $(document).on("click", "button.delete", deleteTodo);
// $(document).on("click", "button.complete", toggleComplete);
// $(document).on("click", ".todo-item", editTodo);
// $(document).on("keyup", ".todo-item", finishEdit);
// $(document).on("blur", ".todo-item", cancelEdit);
// $(document).on("submit", "#todo-form", insertTodo);

// // Our initial todos array
// var todos = [];

// // Getting todos from database when page loads
// getTodos();

// // This function resets the todos displayed with new todos from the database
// function initializeRows() {
//   $todoContainer.empty();
//   var rowsToAdd = [];
//   for (var i = 0; i < todos.length; i++) {
//     rowsToAdd.push(createNewRow(todos[i]));
//   }
//   $todoContainer.prepend(rowsToAdd);
// }

// // This function grabs todos from the database and updates the view
// function getTodos() {
//   $.get("/api/todos", function(data) {
//     todos = data;
//     initializeRows();
//   });
// }

// // This function deletes a todo when the user clicks the delete button
// function deleteTodo(event) {
//   event.stopPropagation();
//   var id = $(this).data("id");
//   $.ajax({
//     method: "DELETE",
//     url: "/api/todos/" + id
//   }).then(getTodos);
// }