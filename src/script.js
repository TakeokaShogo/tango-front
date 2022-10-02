
export function addIsDisplayedProperty(wordList) {
    let newWordList = []; 
    for (const wordObject of wordList) {
        wordObject.isDisplayed = {en:true, ja:true};
        newWordList.push(wordObject);
    }
    return newWordList;
}

export function shuffleArrayWithSeed([...array], seed){
  const random = new Random(seed);
  for (let i = 0; i < array.length; i++) {
    const j = random.nextInt(0, array.length - 1);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

class Random {
  constructor(seed) {
  // seed = 88675123
    this.x = 123456789;
    this.y = 362436069;
    this.z = 521288629;
    this.w = seed;
  }
  
  // XorShift
  next() {
    const t = this.x ^ (this.x << 11);
    this.x = this.y;
    this.y = this.z;
    this.z = this.w;
    return this.w = (this.w ^ (this.w >>> 19)) ^ (t ^ (t >>> 8));
  }
  
  // min 以上 max 以下の乱数を生成する
  nextInt(min, max) {
    const r = Math.abs(this.next());
    return min + (r % (max + 1 - min));
  }
}

export const rotateCategory = (category) => {
    let nextCategory = "";
    switch (category) {
        case "none":
            nextCategory = "red";
            break;
        case "red":
            nextCategory = "yellow";
            break;
        case "yellow":
            nextCategory = "none";
            break;
        default:
            break;
    }
    return nextCategory;
}