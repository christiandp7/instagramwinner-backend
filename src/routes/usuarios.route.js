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

  
  User.find({ })
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


router.get('/users/username', (req, res) => {

  let from = req.query.from || 0;
  from = Number(from);

  let limit = req.query.limit || 3;
  limit = Number(limit);

  let ubc = req.query.usedByChristian || false;
  //ubc = Boolean(ubc);
  let uba = req.query.usedByAndrea || false;
  //uba = Boolean(uba);

  
  User.find({ usedByChristian: ubc, usedByAndrea: uba }, 'username')
      .skip(from)
      .limit(limit)
      .exec()
      .then(users => {
        res.json({
          ok: true,
          usuarios: users
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

  //User.collection.insertMany(allUsers, { ordered: false })
  User.collection.insertMany(allUsers)
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

// bulk update
router.put('/users/used/christian', (req, res) => {

  let ides = req.body.ides;

  /*let ides = [
    { _id: '5f53f33114ced7001704bc3f' },
    { _id: '5f540a9014ced7001704bc5a' },
    { _id: '5f540a9014ced7001704bc5b' }
  ]*/

  User.updateMany({ $or: ides }, { $set: { usedByChristian: true }})
    .then(updatedUsers => {
      res.json({
        ok: true,
        updatedUsers
      })
    }).catch(err => {
      return res.status(400).json({
        ok: false,
        error: err
      })
    })

  
})




module.exports = router;