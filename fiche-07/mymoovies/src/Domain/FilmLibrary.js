class FilmLibrary {
  async addFilm(film, user) {
    if (!film) return false;
    try {
      console.log("Film within try:", film);
      const options = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(film), // body data type must match "Content-Type" header
        headers: {
          "Content-Type": "application/json",
          Authorization: user.token,
        },
      };

      console.log("options:", options);
      const response = await fetch("/api/films", options); // fetch return a promise => we wait for the response

      if (!response.ok) {
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }
      const newFilm = await response.json(); // json() returns a promise => we wait for the data
      console.log("Film added:", newFilm);
      return true;
    } catch (err) {
      console.error("addFilm::error: ", err);
    }
  }

  async getHtmlTable(user) {
    try {
      const response = await fetch("/api/films"); // fetch return a promise => we wait for the response

      if (!response.ok) {
        // status code was not 200, error status code
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }
      const films = await response.json(); // json() returns a promise => we wait for the data

      let htmlTable = `<div class="table-responsive p-5">
    <table class="table">
  <thead>
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Link</th>
      <th scope="col">Duration (min)</th>
      <th scope="col">Budget (million)</th>  
      ${user ? `<th scope="col" colspan="2">Operations</th>` : ""}  
    </tr>
  </thead>
  <tbody>`;
      if (films && films.length > 0) {
        films.forEach((element) => {
          htmlTable += `<tr>
              <td class="fw-bold text-info" contenteditable="true">${
                element.title
              }</td>
              <td class="text-info text-break" contenteditable="true">
                <a class="text-info" href="${element.link}" target="_blank""> ${
            element.link
          }</a>      
              </td>
                  
                <td class="text-info" contenteditable="true">${
                  element.duration
                }</td>
                <td class="text-info" contenteditable="true">${
                  element.budget
                }</td>
              ${
                user
                  ? `<td><button type="button" class="btn btn-info delete" data-element-id="${element.id}">Delete</button></td>`
                  : ""
              }
              ${
                user
                  ? `<td><button type="button" class="btn btn-info update" data-element-id="${element.id}">Save</button></td>`
                  : ""
              }
          </tr>`;
        });
      }
      htmlTable += `</tbody>
</table>
</div>`;
      return htmlTable;
    } catch (error) {
      console.error("getHTMLTable::error: ", error);
    }
  }

  nextFilmId() {
    return this.filmLibrary.length;
  }

  async deleteFilm(user, elementId) {
    if (!elementId) return false;
    try {
      const options = {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          Authorization: user.token,
        },
      };

      const response = await fetch(`/api/films/${elementId}`, options); // fetch return a promise => we wait for the response

      if (!response.ok) {
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }
      const deletedFilm = await response.json(); // json() returns a promise => we wait for the data
      console.log("Film deleted:", deletedFilm);
      return true;
    } catch (err) {
      console.error("deletedFilm::error: ", err);
    }
  }

  async updateFilm(user, elementId, newFilmData) {
    if (!elementId || !newFilmData) return false;
    try {
      const options = {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(newFilmData), // body data type must match "Content-Type" header
        headers: {
          "Content-Type": "application/json",
          Authorization: user.token,
        },
      };

      console.log("options:", options);
      const response = await fetch(`/api/films/${elementId}`, options); // fetch return a promise => we wait for the response

      if (!response.ok) {
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }
      const updatedFilm = await response.json(); // json() returns a promise => we wait for the data
      console.log("Film updated:", updatedFilm);
      return true;
    } catch (err) {
      console.error("updatedFilm::error: ", err);
    }
  }
}

export default FilmLibrary;
