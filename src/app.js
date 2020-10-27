const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.send(repositories);}
  );

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body

  const repositorie = {id:uuid(), title, url, techs, likes:0}

  repositories.push(repositorie)

  return response.status(201).send(repositorie)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const {title, url, techs} = request.body

  const repositorieindex = repositories.findIndex(repositorie=>repositorie.id === id)

  if(repositorieindex < 0){
    return response.status(400).json({error:`The project with id ${id} does not exists`})
  }
  const repositorie = {
    id,
    title,
    url,
    techs,
    likes:0
  }
  repositories[repositorieindex] = repositorie

  return response.status(200).send(repositorie)
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const repositorieindex = repositories.findIndex(repositorie=>repositorie.id === id)
  if(repositorieindex < 0){
    return response.status(400).json({error:`The project with id ${id} does not exists`})
  }
  repositories.splice(repositorieindex, 1)

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const repositorieIndex = repositories.findIndex(repositorie=>repositorie.id === id)

  if(repositorieIndex < 0){
    return response.status(400).json({error:`The project with id ${id} does not exists`})
  }
  const {title, url, techs, likes} = repositories[repositorieIndex]

  const repositorie ={
    id:repositories[repositorieIndex].id,
    title:title,
    url: url,
    techs: techs,
    likes: likes +1
  } 

  repositories[repositorieIndex] = repositorie;

  return response.status(200).send(repositorie)
});

module.exports = app;
