import { useEffect, useState } from "react"

const ORIGIN = "http://localhost:5000";

export function App() {
    // useEffectの第二引数に空の配列を渡すことで一度だけ実行できる
    const [isLoaded, setIsLoaded] = useState(false);
    const [wordListData, setWordListData] = useState([]);

    useEffect(
        () => {
            fetch(ORIGIN + "/word_list").then(response => response.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setWordListData(result.top);
                },
                (error) => {
                    //エラー処理を追加する
                    window.alert(error);
                }
            );
        },
        []
    );

    let wordList = [];
    for (const word of wordListData) {
        let wordBox = <WordBox word={word} />;
        wordList.push(wordBox);
    }

    return (
        <>
        {/* <div> */}
        <header className="header">
            <SectionPullDown />                      
            <div className="tool-space">
                <FilterIcon />
                <ShuffleIcon />
                <ToggleBox />
            </div>
            <PopupBox />
        </header>
        <div className="word-list" id="word-list">
            {wordList}
        </div>
        {/* </div> */}
        </>
    )
}

function SectionPullDown(props) {
    return (
            <div className="pull-down">
                <select name="prefecture" id="section-pulldown">
                    <option value="ALL">ALL Section</option>
                    <option value={1}>Section 1</option>
                    <option value={2}>Section 2</option>
                    <option value={3}>Section 3</option>
                    <option value={4}>Section 4</option>
                    <option value={5}>Section 5</option>
                    <option value={6}>Section 6</option>
                    <option value={7}>Section 7</option>
                    <option value={8}>Section 8</option>
                    <option value={9}>Section 9</option>
                    <option value={10}>Section 10</option>
                    <option value={11}>Section 11</option>
                    <option value={12}>Section 12</option>
                    <option value={13}>Section 13</option>
                    <option value={14}>Section 14</option>
                    <option value={15}>Section 15</option>
                    <option value={16}>Section 16</option>
                    <option value={17}>Section 17</option>
                    <option value={18}>Section 18</option>
                    <option value={19}>Section 19</option>
                </select>
                <i className="down-arrow fa-solid fa-chevron-down" />
            </div>
    )
}

function FilterIcon(props) {
    return (
        <i className="fa-solid fa-filter fa-lg" />
    )   
}

function ShuffleIcon(props) {
    return (
        <i className="fa-solid fa-shuffle fa-lg" />
    )
}

function ToggleBox(props) {
    return (
        <div className="toggle-box">
            <div className="ja">
                ja
                <i className="fa-solid fa-slash" />
            </div>
            <div className="en">
                en
                <i className="fa-solid fa-slash" />
            </div>
        </div>
    )
}

function PopupBox(props) {
    return (
        <div className="popup-box">
            <p>表示するカテゴリー</p>
            <label className="popup-text">マークなし<input type="checkbox" name id /></label>
            <label className="popup-text">赤マーク<input type="checkbox" name id /></label>
            <label className="popup-text">黄マーク<input type="checkbox" name id /></label>
        </div>
    )
}

function WordBox(props) {
    return (
        <div className="word-box">
            <div className="category-box">
                <button className="category-button" id={1} />
            </div>
            <div className="en-word">
                {props.word.enWord}
            </div>
            <div className="ja-meaning">
                {props.word.jaMeaning}
            </div>
            <i className="fa-solid fa-volume-high" />
        </div>
    )
}