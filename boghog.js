
function randint(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function shuffleInPlace(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

export const genBoard = (dice, shape) => {
  const sq = Math.floor(Math.sqrt(dice.length));
  let s = shape ? shape : [sq, sq];

  const rolled = dice.map(x=>x[randint(0, x.length)]);
  shuffleInPlace(rolled);
  const mapped = [];
  for (let i = 0; i < s[1]; i++) {
    mapped.push([]);
    for (let j = 0; j < s[0]; j++) {
      mapped[i].push(rolled.pop());
    }
  }
  console.log(mapped)
  return mapped;
}

// const board = genBoard(diceSets[diceSetTitles[0]])