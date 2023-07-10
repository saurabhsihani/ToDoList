const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.set(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/GroceryBudDB");

const ItemSchema = mongoose.Schema({
  todo: String
});

const Item = mongoose.model("Item", ItemSchema);

const item1 = new Item({
  todo: "Welcome to your Todo List."
});
const item2 = new Item({
  todo: "Click on Submit to add a new todo."
});
const item3 = new Item({
  todo: "Hit these to edit or delete a todo -->"
});

const defaultItems = [item1, item2, item3];

app.get("/", (req, res) => {
  Item.find({})
    .then((foundItems) => {
      if(foundItems.length === 0) {
        Item.insertMany(defaultItems).catch(err => {
          console.log(err);
        });
        res.json({ items: defaultItems });
      }
      else {
        res.json({ items: foundItems });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

app.post("/", (req, res) => {
  switch(req.body.action) {
    case "add":
      const newItem = new Item({
        todo: req.body.todo
      });
      newItem.save();
      res.redirect("/");
      break;

    case "edit":
      Item.findByIdAndUpdate(req.body.id, {$set: {todo: req.body.todo}}).catch(err => console.log(err));
      res.redirect("/");
      break;

    case "clear":
      Item.deleteMany({}).catch(err => console.log(err));
      res.redirect("/");
      break;

    case "delete":
      Item.findByIdAndRemove(req.body.id).catch(err => console.log(err));
      res.redirect("/");
      break;

    default:
      throw new Error("Action Type Unknown");
  }
})

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});