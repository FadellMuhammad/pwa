var dbPromised = idb.open("sepak-bola", 1, function (upgradeDb) {
  var articlesObjectStore = upgradeDb.createObjectStore("team", {
    keyPath: "id"
  });
  articlesObjectStore.createIndex("shortName", "shortName", { unique: false });
});

function saveForLater(teams) {
  dbPromised
    .then(function (db) {
      var tx = db.transaction("team", "readwrite");
      var store = tx.objectStore("team");
      console.log(teams);
      store.put(teams);
      return tx.complete;
    })
    .then(function () {
      console.log("Artikel berhasil di simpan.");
    });
}

function dbDeleteTeam(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction("team", "readwrite");
        var store = tx.objectStore("team");
        store.delete(parseInt(id));
        return tx.complete;
      })
      .then(function () {
        getSavedteams();
      });
  });
}