import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "%xCn#4fTy*EmJU8p",
  database: "test",
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM test.testing_table";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  // const q = "INSERT INTO books(`title`, `desc`, `price`, `cover`) VALUES (?)";
  const q = "INSERT INTO `test`.`testing_table` (`id`, `category`, `gender`, `price`) VALUES (?)";
  const values = [
    req.body.id,
    req.body.category,
    req.body.gender,
    req.body.price
  ];
console.log(values)
  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  // const q = " DELETE FROM books WHERE id = ? ";
const q = "DELETE FROM `test`.`testing_table` WHERE `id` = ?";
  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  // const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";
const q = "UPDATE `test`.`testing_table` SET `id` = ?, `category` = ?, `gender` = ?, `price` = ?  WHERE `id` = ?";
  const values = [
    req.body.id,
    req.body.category,
    req.body.gender,
    req.body.price
  ];

  db.query(q, [...values,bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
