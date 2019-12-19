const router = require('express-router');
const axios = require('axios');

let Asset = require('../models/asset');

router.route('/').get((req, res) => {
  Asset.find(userId == req.userId)
  .then(assets => res.json(assets))
  .catch(err => res.status(400).json('Error: ' + err));
  }
)

