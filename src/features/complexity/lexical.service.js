const MODE_TYPE = 'verbose';

function calcAvg(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i += 1) {
    sum += Number(array[i]);
  }

  return (sum / array.length).toFixed(2);
}

function findSentenceLexicalDensity(sentence, nonLex) {
  const words = sentence.toLowerCase().trim().split(' ');
  const nonLexInSentence = nonLex.filter(x => words.includes(x));

  return (1 - nonLexInSentence.length / words.length).toFixed(2);
}

function findTextLexicalDensity(text, nonLex, mode = null) {
  if (mode !== MODE_TYPE) {
    return {
      overall_ld: findSentenceLexicalDensity(text, nonLex)
    };
  }

  const sentenceDensity = [];
  const sentences = text.split('.');

  sentences.forEach(sentence => {
    if (sentence) {
      sentenceDensity.push(findSentenceLexicalDensity(sentence, nonLex));
    }
  });

  return {
    overall_ld: calcAvg(sentenceDensity),
    sentence_ld: sentenceDensity
  };
}

module.exports = {
  findTextLexicalDensity
};
