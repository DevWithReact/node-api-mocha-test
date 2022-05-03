var expect = require("chai").expect;
var db = require("../database");
var request = require("request");

describe("SQLite Database", function() {
  it("SQLite Module Export correctly", function() {
    expect(db != null).to.equal(true);
  })

  it("Table 'created' exists", function() {
    var sql = 'select * from created limit 1;'
    db.get(sql, [], (err, row) => {
        expect(err == null).to.equal(true);
    });
  })

  it("Table 'metadata' exists", function() {
    var sql = 'select * from metadata limit 1;'
    db.get(sql, [], (err, row) => {
        expect(err == null).to.equal(true);
    });
  })
  
  it("7 Seed Data Inserted Table 'created'", function() {
    var sql = 'select count(*) as cnt from created'
    db.get(sql, [], (err, row) => {
        expect(err == null, "Table not exists").to.equal(true);
        expect(row["cnt"]).to.equal(7);
    });
  })

  it("7 Seed Data Inserted Table 'metadata'", function() {
    var sql = 'select count(*) as cnt from metadata'
    db.get(sql, [], (err, row) => {
        expect(err == null, "Table not exists").to.equal(true);
        expect(row["cnt"]).to.equal(7);
    });
  })
})

describe("API Test", function() {   
  var url = "http://localhost/";

  it("Media size api working", function () { 
    request(url + "total/User1", function(error, response, body) {
      expect(error == null, "Server is not running").to.equal(true);
      expect(response.statusCode, "Return status 200").to.equal(200);
      const respData = JSON.parse(body);
      expect(respData.data.total).to.equal(450);
    })
  })

  it("Video size api working", function () { 
    request(url + "video/Video1", function(error, response, body) {
      expect(error == null, "Server is not running").to.equal(true);
      expect(response.statusCode, "Return status 200").to.equal(200);
      const respData = JSON.parse(body);
      expect(respData.data.size).to.equal(120);
    })
  })

  it("Video update api working", function () { 
    request(url + "Video1/100/10", { method: "patch"},  function(error, response, body) {
      expect(error == null, "Server is not running").to.equal(true);
      expect(response.statusCode, "Return status 200").to.equal(200);
      const respData = JSON.parse(body);
      expect(respData.message).to.equal("success");
    })
  })
});