var base_url = "http://api.football-data.org/v2/";
base_url = base_url.replace(/^http:\/\//i, 'https://');

//blok kode yang akan dipanggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
//blok untuk parsing json
function json(response) {
  return response.json();
}
//handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

//request data json
function getJadwal() {
  if ('caches' in window) {
    caches.match(base_url + "competitions").then(function (response) {
      if (response) {
        response.json().then(function (data) {
          var teamsHTML = "";
          data.competitions.forEach(function (competition) {
            teamsHTML += `
                                <div class="card">
                                  <div class="card-content">
                                   <span class="card-title truncate">${competition.name}</span>
                                   <p>${competition.lastUpdated}</p>
                                  </div>
                                </div>
                                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("jadwal").innerHTML = teamsHTML;

        })
      }
    })
  }
  fetch(base_url + "competitions", {
    headers: {
      'X-Auth-Token': '233137c055d04d9797fc78695942a13d'
    }
  })
    .then(status)
    .then(json)
    .then(function (data) {
      var teamsHTML = "";
      data.competitions.forEach(function (competition) {
        teamsHTML += `
                <div class="card">
                  <div class="card-content">
                  <span class="card-title truncate">${competition.name}</span>
                  <p>${competition.lastUpdated}</p>
                  </div>
              </div>
              `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("jadwal").innerHTML = teamsHTML;
    });
}

//request data json
function getteams() {
  if ('caches' in window) {
    caches.match(base_url + "teams").then(function (response) {
      if (response) {
        response.json().then(function (data) {
          var teamsHTML = "";
          data.teams.forEach(function (team) {
            teamsHTML += `
                                  <div class="card">
                                  <a href="./article.html?id=${team.id}">
                                      <div class="card-image waves-effect waves-block waves-light">
                                        <img src="${team.crestUrl}" />
                                      </div>
                                    </a>
                                    <div class="card-content">
                                     <span class="card-title truncate">${team.name}</span>
                                     <p>${team.website}</p>
                                    </div>
                                  </div>
                                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("teams").innerHTML = teamsHTML;

        })
      }
    })
  }
  fetch(base_url + "teams", {
    headers: {
      'X-Auth-Token': '233137c055d04d9797fc78695942a13d'
    }
  })
    .then(status)
    .then(json)
    .then(function (data) {
      var teamsHTML = "";
      data.teams.forEach(function (team) {
        teamsHTML += `
                          <div class="card">
                          <a href="./article.html?id=${team.id}">
                              <div class="card-image waves-effect waves-block waves-light">
                                <img src="${team.crestUrl}" />
                              </div>

                            <div class="card-content">
                                <span class="card-title truncate">${team.name}</span>
                                <p>${team.website}</p>
                            </div>
                          </div>
                        `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("teams").innerHTML = teamsHTML;
    });
}

function getJadwalById() {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            // var articleHTML = "";
            // data.matches.forEach(function (match) {
            // .... kode lain disembunyikan agar lebih ringkas

            // .... kode lain disembunyikan agar lebih ringkas
            var articleHTML = `
                        <div class="card">
                        <div class="card-image waves-effect waves-block waves-light">
                          <img src="${data.crestUrl}" />
                        </div>
                    
                      <div class="card-content">
                          <span class="card-title truncate">${data.name}</span>
                          <p>short name : ${data.shortName}</p>
                          <p>address : ${data.address}</p>
                          <p>phone  : ${data.phone}</p>
                          <p>webiste : ${data.website}</p>
                      </div>
                    </div>
                        `;

            document.getElementById("body-content").innerHTML = articleHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);

          });
        }
      });
    }
    fetch(base_url + "teams/" + idParam, {
      headers: {
        'X-Auth-Token': '233137c055d04d9797fc78695942a13d'
      }
    })
      .then(status)
      .then(json)
      .then(function (data) {
        // ... kode lain disembunyikan agar lebih ringkas 
        // var articleHTML = "";
        var articleHTML = `
                        <div class="card">
                        <div class="card-image waves-effect waves-block waves-light">
                          <img src="${data.crestUrl}" />
                        </div>
                    
                      <div class="card-content">
                          <span class="card-title truncate">${data.name}</span>
                          <p>short name : ${data.shortName}</p>
                          <p>address : ${data.address}</p>
                          <p>phone  : ${data.phone}</p>
                          <p>webiste : ${data.website}</p>
                      </div>
                    </div>
                        `;

        document.getElementById("body-content").innerHTML = articleHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}

function getAll() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction("team", "readonly");
        var store = tx.objectStore("team");
        return store.getAll();
      })
      .then(function (team) {
        resolve(team);
      });
  });
}

function getSavedteams() {
  getAll().then(function (teams) {
    console.log(teams);
    // Menyusun komponen card artikel secara dinamis
    var teamsHTML = "";
    teams.forEach(function (team) {

      teamsHTML += `
                                  <div class="card">
                                  <a href="./article.html?id=${team.id}&saved=true">
                                      <div class="card-image waves-effect waves-block waves-light">
                                        <img src="${team.crestUrl}" />
                                      </div>
                                    </a>
                                    <div class="card-content">
                                     <span class="card-title truncate">${team.name}</span>
                                     <p>${team.website}</p>
                                    </div>
                                    <button id="${team.id}" class="removeButton btn">Remove</button>
                                  </div>
                                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = teamsHTML;

    let removeButtons = document.querySelectorAll(".removeButton");
    for (let button of removeButtons) {
      button.addEventListener("click", function (event) {
        // event.preventDefault();
        let id = event.target.id;
        console.log(id)
        dbDeleteTeam(id).then(() => {
          getSavedteams()
        })
      })
    }
  });
}

function getSavedArticleById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  getById(idParam, {
  })
    .then(function (teams) {
      articleHTML = '';
      var articleHTML = `
        <div class="card">
                        <div class="card-image waves-effect waves-block waves-light">
                          <img src="${teams.crestUrl}" />
                        </div>
                    
                      <div class="card-content">
                          <span class="card-title truncate">${name}</span>
                          <p>short name : ${teams.shortName}</p>
                          <p>address : ${teams.address}</p>
                          <p>phone  : ${teams.phone}</p>
                          <p>webiste : ${teams.website}</p>
                      </div>
                    </div>

    `;
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("body-content").innerHTML = articleHTML;
    });
}

function getById(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction("team", "readonly");
        var store = tx.objectStore("team");
        return store.get(Number(id));
      })
      .then(function (teams) {
        resolve(teams);
      });
  });
}


