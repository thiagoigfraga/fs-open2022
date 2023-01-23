const mongoose = require("mongoose");

const password = process.argv[2];

const url = `mongodb+srv://thiagoigfraga:${password}@cluster0.08vpbv3.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  console.log(`phonebook:`);
  Person.find({}).then((persons) => {
    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
    process.exit(1);
  });
}else if(process.env.length > 3){
  
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });
  
  person.save().then((result) => {
    console.log(
      `added ${process.argv[3]} number ${process.argv[4]} to phonebook`
    );
  
    mongoose.connection.close();
  });
}

