import words from "./words";

const selectWord = array => {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
};

const generateWords = () => {
  return {
    word1: selectWord(words[0]),
    word2: selectWord(words[1]),
    word3: selectWord(words[2])
  };
};

const isVowel = word1 => ["a", "e", "i", "o", "u"].includes(word1.charAt(0));

module.exports = {
  generateWords,
  isVowel
};
