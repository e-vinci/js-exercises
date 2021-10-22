class FilmLibrary {
  async addFilm(film) {    
    if (!film) return false;
    try {
      console.log("Film within try:", film)
      const options = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(film), // body data type must match "Content-Type" header
        headers: {
          "Content-Type": "application/json",
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

  async getHtmlTable() {
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
      <th scope="col">Duration (min)</th>
      <th scope="col">Budget (million)</th>    
    </tr>
  </thead>
  <tbody>`;
      if (films && films.length > 0) {
        films.forEach((element) => {
          htmlTable += "<tr>";
          // Deal with Title Col (create hyperlink from title & link)
          htmlTable += `<td>
        <a href="${element.link}" target="_blank""> ${element.title}</a>      
      </td>`;
          // Deal with simple columns (duration & budget)
          htmlTable += `<td>${element.duration}</td>
        <td>${element.duration}</td>
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
}

export default FilmLibrary;
