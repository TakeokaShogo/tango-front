
function addIsDisplayedProperty(wordList) {
    let newWordList = []; 
    for (const wordObject of wordList) {
        wordObject.enIsDisplayed = true;
        wordObject.jaIsDisplayed = true;
        newWordList.push(wordObject);
    }
    return newWordList;
}