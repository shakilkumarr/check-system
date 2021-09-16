const { Router } = require('express');
const { DEFAULT_CHECK_LIST } = require('./constants');

const router = Router();

router.get('/checkLists', (_, res) => {
  if (Math.random() <= 0.8) res.status(200).send({ checkList: DEFAULT_CHECK_LIST })
  else res.status(500).send({ message: 'Internal Server Error. Please Try Again' })
});

router.post('/checkLists', (req, res) => {
  if (Math.random() <= 0.8) res.status(200).send(req.body)
  else res.status(500).send({ message: 'Internal Server Error. Please Try Again' })
});

module.exports = router;
