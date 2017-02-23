var xhr = new XMLHttpRequest();
xhr.open('GET', './sqlite/inleggo_app.sqlite', true);
xhr.responseType = 'arraybuffer';

xhr.onload = function(e) {
  var uInt8Array = new Uint8Array(this.response);
  var db = new SQL.Database(uInt8Array);
  //var contents = db.exec("SELECT * FROM app");
  //console.log(contents);
  // contents is now [{columns:['col1','col2',...], values:[[first row], [second row], ...]}]



  // Prepare a statement
  var stmt = db.prepare("SELECT id, empresa, db FROM app WHERE id = 23");
  stmt.getAsObject({$start:1, $end:1}); // {col1:1, col2:111}

  // Bind new values
  stmt.bind({$start:1, $end:2});
  while(stmt.step()) { //
      var row = stmt.getAsObject();
      console.log(row.db);
      // [...] do something with the row of result
  }










};
xhr.send();
