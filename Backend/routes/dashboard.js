var express = require("express");
var router = express();
var database = require("../database");
var status = require("http-status");

try {
  router.get("/dashboard", async function (request, response) {
    const userId = request.query.user_id;
    const query = `select * from user where user_id = ?`;
    
    if (userId) {
      try {
        const [rows, fields] = await database.query(query, [userId]);
        if (rows.length > 0) {
          const query= `select * from timing where user_id =?`;
          const[row, fields] = await database.query(query, [rows[0].user_id])
          return response.status(status.OK).json({ data: row, username: rows[0].username });
        } else {
          return response.status(status.BAD_REQUEST).json({ error: "Incorrect user_id" });
        }
      } catch (error) {
        return response.status(status.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
      }
    } else {
      return response.status(status.UNAUTHORIZED).json({ error: "Enter user_id" });
    }

  });
} catch (error) {
  return response.status(status.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
}

module.exports = router;
