class FilmLibrary {
  constructor() {
    this.filmLibrary = [];
  }

  addFilm(film) {
    if (!film) return false;
    // Shallow cloning the film via the Spread operator `...` : {...}
    // updating the film id : this is the moment to provide an id when the film is added to the collection !
    this.filmLibrary.push({ ...film, id: this.nextFilmId() });
    return true;
  }

  getHtmlTable() {
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
    if (this.filmLibrary && this.filmLibrary.length > 0) {
      this.filmLibrary.forEach((element) => {
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
  }

  nextFilmId() {
    return this.filmLibrary.length;
  }
}

export default FilmLibrary;
