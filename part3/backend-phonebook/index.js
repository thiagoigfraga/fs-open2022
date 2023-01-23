const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
  {
    name: "Sally",
    number: "45454545",
    id: 5,
  },
  {
    name: "Josef",
    number: "45454545",
    id: 6,
  },
  {
    name: "Michael",
    number: "55 42 99903-2833",
    id: 7,
  },
  {
    name: "Homer",
    number: "",
    id: 8,
  },
  {
    name: "Thiago",
    number: "",
    id: 9,
  },
];

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;

  return maxId + 1;
};

app.get("/", (req, res) => {
  res.send("<h1>Hello world!</h1>");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);

  if (!person) {
    res.status(404).end();
  } else {
    res.json(person);
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({
      error: "name missing",
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number || false,
  };

  persons = persons.concat(person);

  res.json(person);
});

const PORT = 8080; //3001

app.listen(PORT, () => {
  console.log(`Servidor funcionando no PORT:${PORT}`);
});
