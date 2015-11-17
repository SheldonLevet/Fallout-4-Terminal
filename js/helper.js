function intToHex(integer) {
  return integer.toString(16).toUpperCase();
}

function hexToInt(hex) {
  return parseInt(hex, 16);
}

function hexAddInt(hex, int) {
  return intToHex(hexToInt(hex) + int);
}

function wordOrChar() {
  return (Math.random() > 0.96) ? true : false;
}

function findSimilarity(word, pass) {
  var sim = 0;
  for (i in word) {
    if (pass.indexOf(word[i]) !== -1) {
      sim++;
    }
  }
  return sim;
}

function gatherWords(password) {
  var wordCount = Math.floor(Math.random()*2)+4;
  var words = [password];
  while (words.length !== wordCount) {
    words.push(rWord(words));
  }
  return words;
}

function rWord(noIn) {
  var options = ['boat', 'car', 'wheel', 'type', 'person', 'number', 'popular', 'lock', 'luck'];
  var f = false;
  var w;
  while (!f) {
    w = options[Math.floor(Math.random()*options.length)];
    if (noIn.indexOf(w) === -1) {
      f = true;
    }
  }
  return w;
}

function rChar() {
  var optionsa = ['~', '`', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '{', '}', "["];
  var optionsb = [']', '|', '\\', ':', ';', "'", '"', '<', ',', '>', '.', '?', '/'];
  var options = optionsa.concat(optionsb);
  return options[Math.floor(Math.random()*options.length)];
}

Array.prototype.shuffle = function() {
  var currentIndex = this.length, temporaryValue, randomIndex ;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = this[currentIndex];
    this[currentIndex] = this[randomIndex];
    this[randomIndex] = temporaryValue;
  }
  return this;
}
