const express = require('express');

const router = express.Router();
const apiRouter = express.Router();

const {
  notFound,
  errorHandler
} = require('../src/utils');

apiRouter.get('/', (req, res, next) => res.json({
  ok: true,
  module: 'vai-challenge'
}));

router.use('/api/v1', apiRouter);

apiRouter.post('/complexity', require('../src/features/complexity/methods/checkComplexity'));

router.use(notFound);
router.use(errorHandler);

module.exports = router;
