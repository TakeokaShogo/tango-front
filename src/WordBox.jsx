
export function WordBox(props) {
    // props:
    //     word     <Object>,
    //     categoryButtonOnClick    <Function>
    //     switchEnIsDisplayed      <Function>
    //     switchJaIsDisplayed      <Function>
    const categoryButtonClass = "category-button" + ' ' + props.word.category;
    const meaningText = []
    for (const meaning of props.word.jaMeaning) {
        meaningText.push(props.word.isDisplayed.ja ? meaning : "ーーーーー");
        meaningText.push(<br />);
    }

    return (
        <div className="word-box">
            <div className="word-id">
                {props.word.id}
            </div>
            <div className="category-box">
                <button className={categoryButtonClass} onClick={props.categoryButtonOnClick} />
            </div>
            <div className="en-word" onClick={props.switchEnIsDisplayed}>
                {props.word.isDisplayed.en ? props.word.enWord : "-----"}
            </div>
            <div className="ja-meaning" onClick={props.switchJaIsDisplayed}>
                {meaningText}
            </div>
            <i className="fa-solid fa-volume-high" />
        </div>
    )
}