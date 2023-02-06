require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Person = require("./model/people");
const { response } = require("express");
const app = express();

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

const errorHandler = (error, request, response, next) => {

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(express.static("build"));

app.get("/", (req, res) => {
  res.send("<h1>Hello world!</h1>");
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/api/persons/:id", (req, res,next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(204).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res,next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json(result)
    })
    .catch(error => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({
      error: "name missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number || false,
  });

  Person.findOne({name: body.name}).then(user => {
      if(user){
        res.status(400).json({
          error: "Name already exists",
        })
      }else{
        person.save().then((savedPerson) => {
          res.json(savedPerson);
        }).catch(error => next(error));
      }
  })
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => res.json(updatedPerson))
    .catch((error) => next(error));
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor funcionando no PORT:${PORT}`);
});
