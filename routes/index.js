const router = require('express').Router()
const { Project } = require('../models')

const loadProject = (req, res, next) => {
  const id = req.params.id

  Project.findById(id)
    .then((project) => {
      req.project = project
      next()
    })
    .catch((error) => next(error))
}


router
  .get('/projects', (req, res, next) => {
    Project.find()
      .sort({ createdAt: -1 })
      .then((projects) => res.json(projects))
      .catch((error) => next(error))
  })

  .get('/projects/:id', (req, res, next) => {
    const id = req.params.id

    Project.findById(id)
      .then((project) => {
        if (!project) { return next() }

        res.json(project)
      })
      .catch((error) => next(error))
  })

  .post('/projects', (req, res, next) => {
    const newProject = req.body

    Project.create(newProject)
      .then((project) => {
        res.json(project)
      })
      .catch((error) => next(error))
  })

  .post('/projects/:id/tiles', loadProject, (req, res, next) => {
    if (!req.project) { return next() }

    const newTile = req.body

    req.project.tiles.push(newTile)

    req.project.save()
      .then((project) => {
        req.project = project
        next()
      })
      .catch((error) => next(error))
    },
    (req, res, next) => {
      res.json(req.project)
    })

    .patch('/projects/:id/tiles/:tileId', loadProject, (req, res, next) => {
      if (!req.project) { return next() }
      const updatedTile = req.body

      const updatedTiles = req.project.tiles.map(tile => {
        if ((tile._id).toString() === (req.params.tileId).toString()) {
          return updatedTile
        }

        return tile
      })

      req.project.tiles = updatedTiles

      req.project.save()
        .then((project) => {
          req.project = project
        })

        res.json(req.project)
    })

    .delete('/projects/:id/tiles/:tileId', loadProject, (req, res, next) => {
      if (!req.project) { return next() }
      const tileId = req.params.tileId

      const updatedTiles = req.project.tiles.filter(tile => tile._id.toString() !== tileId)

      req.project.tiles = updatedTiles

      req.project.save()
        .then((project) => {
          req.project = project
        })
        res.json(req.project)
    })

  module.exports = router
