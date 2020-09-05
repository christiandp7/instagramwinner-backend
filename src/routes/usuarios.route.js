const { Router } = require('express');
const User = require('../models/Usuario.model')
const router = Router();




router.get('/', (req, res) => {
  res.json({
    ok: true,
    message: 'hello, welcome to InstagramWinner, a tool for win instagram giveaways!'
  })
})


// Get All Usuarios with Pagination
router.get('/users', (req, res) => {

  let from = req.query.from || 0;
  from = Number(from);

  let limit = req.query.limit || 10;
  limit = Number(limit);

  let ubc = req.query.usedByChristian || false;
  //ubc = Boolean(ubc);
  let uba = req.query.usedByAndrea || false;
  //uba = Boolean(uba);

  
  User.find({ usedByChristian: ubc, usedByAndrea: uba })
      .skip(from)
      .limit(limit)
      .exec()
      .then(users => {
        User.countDocuments({ }, (err, counted) => {
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
router.post('/users', (req, res) => {

  let allUsers = req.body.usuarios;
  /*let body = [
    {
      username: 'username_4',
      name: 'User 4',
      image: 'http://imagen.com/ñkkñkñljk',
      usedByChristian: false,
      usedByAndrea: false
    },
    {
      username: 'username_5',
      name: 'User 5',
      image: 'http://imagen.com/ssxsxs',
      usedByChristian: false,
      usedByAndrea: false
    },
    {
      username: 'username_6',
      name: 'User 6',
      image: 'http://imagen.com/gdgdg',
      usedByChristian: false,
      usedByAndrea: false
    }
  ]*/

  User.collection.insertMany(allUsers, { ordered: false })
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


// test Bulk insert
router.post('/user/test', (req, res) => {
  let body = req.body;
  res.json({
    ok: true,
    body
  })
})

// Delete Users By Id
router.delete('/users/:id', (req, res) => {

  let id = req.params.id;
  
  User.findByIdAndRemove(id)
      .then(deletedUser => {
        res.json({
          ok: true,
          usuario: deletedUser
        })
      }).catch(err => {
        return res.status(400).json({
          ok: false,
          error: err
        })
      })
})




module.exports = router;