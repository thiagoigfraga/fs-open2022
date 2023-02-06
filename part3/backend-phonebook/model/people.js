require("dotenv").config();
const mongoose = require("mongoose");
const url = process.env.MONGODB_URL;

mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then((result) => {
    console.log("Connect to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },
  number: {
    type: String,
    minLength: 8,

    validate: {
      validator: function(v){
        return /^\d{2,3}[-]\d+$/g.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
      required: [true, "Contact phone required"],
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema, "people");
