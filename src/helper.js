
export function addIsDisplayedProperty(wordList) {
    let newWordList = []; 
    for (const wordObject of wordList) {
        wordObject.isDisplayed = {en:true, ja:true};
        newWordList.push(wordObject);
    }
    return newWordList;
}

export function shuffleArray([...array]){
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// const rotateCategory = () => {
//     let newCategory = "";
//     let cWordListData = wordListData;
//     switch (word.category) {
//         case "none":
//             newCategory = "red";
//             break;
//         case "red":
//             newCategory = "yellow";
//             break;
//         case "yellow":
//             newCategory = "none";
//             break;
//         default:
//             break;
//     }
//     cWordListData[Number(word.id) - 1].category = newCategory;
//     setWordListData(cWordListData);
// }