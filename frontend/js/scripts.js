$(document).ready(function () {
  const API_URL = "http://localhost:5000/api";

  $("#register-form").submit(function (e) {
    e.preventDefault();
    const username = $("#username").val();
    const password = $("#password").val();
    $.ajax({
      url: `${API_URL}/auth/register`,
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ username, password }),
      success: function (data) {
        localStorage.setItem("token", data.token);
        window.location.href = "index.html";
      },
      error: function (error) {
        alert(error.responseJSON.message);
      },
    });
  });

  $("#login-form").submit(function (e) {
    e.preventDefault();
    const username = $("#username").val();
    const password = $("#password").val();

    $.ajax({
      url: `${API_URL}/auth/login`,
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ username, password }),
      success: function (data) {
        localStorage.setItem("token", data.token);
        window.location.href = "index.html";
      },
      error: function (error) {
        alert(error.responseJSON.message);
      },
    });
  });

  $("#save-note").click(function () {
    const title = $("#note-title").val();
    const content = $("#note-content").val();
    const tags = $("#note-tags")
      .val()
      .split(",")
      .map((tag) => tag.trim());
    const backgroundColor = $("#note-color").val();

    $.ajax({
      url: `${API_URL}/notes`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      contentType: "application/json",
      data: JSON.stringify({ title, content, tags, backgroundColor }),
      success: function (data) {
        displayNotes([data]);
      },
      error: function (error) {
        alert(error.responseJSON.message);
      },
    });
  });

  function fetchNotes() {
    $.ajax({
      url: `${API_URL}/notes`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      success: function (data) {
        displayNotes(data);
      },
      error: function (error) {
        alert(error.responseJSON.message);
      },
    });
  }

  function displayNotes(notes) {
    const notesList = $("#notes-list");
    notesList.empty();
    notes.forEach((note) => {
      const noteElement = $(`
        <div class="note" style="background-color: ${note.backgroundColor}">
          <h3>${note.title}</h3>
          <p>${note.content}</p>
          <p>Tags: ${note.tags.join(", ")}</p>
        </div>
      `);
      notesList.append(noteElement);
    });
  }

  fetchNotes();
});
