const { Router } = require('express');
const User = require('../models/Usuario.model')
const router = Router();

// Controllers



// Get All Usuarios with Pagination
router.get('./users', (req, res) => {

  let from = req.query.from || 0;
  from = Number(from);

  let limit = req.query.limit || 10;
  limit = Number(limit);

  
  User.find({  })
      .skip(from)
      .limit(limit)
      .exec()
      .then(users => {
        User.count({ }, (err, counted) => {
          res.json({
            ok: true,
            totalUsuariosBD: counted,
            totalMostrados: users.length,
            usuarios: users
          })
        })
      }).catch(err => {
        return res.status(400).json({
          ok: false,
          error: err
        })
      })
})

// Bulk users Add by HTML
router.post('./users', (req, res) => {

  let body = req.body;

  User.collection.insertMany(body)
      .then(newUsers => {
        res.json({
          ok: true,
          nuevosUsuarios: newUsers
        })
      }).catch(err => {
        return res.status(400).json({
          ok: false,
          error: err
        })
      })
})

// Delete Users By Id
router.delete('./users/:id', )



module.exports = app;