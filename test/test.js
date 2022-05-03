var expect = require("chai").expect;
var db = require("../database");
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