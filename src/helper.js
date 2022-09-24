
export function addIsDisplayedProperty(wordList) {
    let newWordList = []; 
    for (const wordObject of wordList) {
        wordObject.enIsDisplayed = true;
        wordObject.jaIsDisplayed = true;
        newWordList.push(wordObject);
    }
    return newWordList;
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