const NonLexicalModel = require('../nonLexical.model');
const { findTextLexicalDensity } = require('../lexical.service');

module.exports = async (req, res, next) => {
  try {
    const nonLex = await NonLexicalModel.get();
    const { mode } = req.query;
    const { text } = req.body;

    const result = findTextLexicalDensity(text, nonLex, mode);

    res.status(200).send({ data: result });
  } catch (ex) {
    return next(ex);
  }
};
