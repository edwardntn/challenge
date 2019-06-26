const mongoose = require('mongoose');

const schema = new mongoose.Schema({ values: [String] }, { collection: 'NonLexicals' });
const NonLexicalModel = mongoose.model('NonLexical', schema);
const { NON_LEX } = require('../../../constants');

class NonLexical extends NonLexicalModel {
  static get() {
    return this.findOne().then(result => result.values);
  }

  static checkAndSetDefaultValues() {
    return this.findOne().then(result => {
      if (!result) {
        return this.create({ values: NON_LEX });
      }
    });
  }
}

module.exports = NonLexical;
