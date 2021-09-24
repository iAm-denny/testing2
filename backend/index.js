const express = require("express");
const Sequelize = require("sequelize");
const app = express();

app.use(express.json());

const POSTGRES_CONNECTION_STRING =
  "postgres://postgres:postgrespassword@localhost:5432/postgres";

app.post("/blog_post_event", async (req, res) => {
  const sequelize = new Sequelize(POSTGRES_CONNECTION_STRING, {});
  const blogPostId = req.body.event.data.new.id;

  await sequelize.query(
    "INSERT INTO blog_post_activity(blog_post_id, type) values (:blogPostId, :type)",
    {
      replacements: {
        blogPostId,
        type: "created",
      },
    }
  );
  return res.status(200);
});

app.listen(8000, () => {
  console.log("server listening on port 8000");
});
