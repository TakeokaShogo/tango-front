import { useEffect, useState } from "react"
import { addIsDisplayedProperty } from "./helper"

const ORIGIN = "http://192.168.0.117:5000";

export function App() {
    //stateは使用する順に並んでいる
    const [isLoaded, setIsLoaded] = useState(false);
    //配列とオブジェクトは参照型なので、変数に格納してもコピーされない
    //配列やオブジェクトのコピーを作るときは、concatなどの関数を使う!!
    const [wordListData, setWordListData] = useState([]);
    //セクション切り替えのとき、wordListDataから直接いらないオブジェクトを消去するのではなく、
    //currentSectionを参照して、表示する文を計算するようにする
    const [currentSection, setCurrentSection] = useState("ALL");
    const [enToggleIsPushed, setEnToggleIsPushed] = useState(false);
    const [jaToggleIsPushed, setJaToggleIsPushed] = useState(false);
    const [isShownCategory, setIsShownCategory] = useState({none:true, red:true, yellow:true});
    const [hasShuffeled, setHasShuffeled] = useState(false);

    let cWordListData = wordListData.concat();

    useEffect(
        () => {
            fetch(ORIGIN + "/word_list").then(response => response.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setWordListData(addIsDisplayedProperty(result.top));
                },
                (error) => {
                    //エラー処理を追加する
                    window.alert(error);
                }
            );
        },
        // useEffectの第二引数に空の配列を渡すことで一度だけ実行できる
        []
    );

    const switchEnButton = () => {
        for (let cWord of cWordListData) {
            //配列は参照型なので直接代入
            cWord.enIsDisplayed = enToggleIsPushed;
        }
        //set~の関数を実行した後でも、処理はそこで終わらない
        //(その後のset~系の関数も実行される)
        setWordListData(cWordListData);
        setEnToggleIsPushed(!enToggleIsPushed);
    }

    const switchJaButton = () => {
        for (let cWord of cWordListData) {
            //配列は参照型なので直接代入
            cWord.jaIsDisplayed = jaToggleIsPushed;
        }
        setWordListData(cWordListData);
        setJaToggleIsPushed(!jaToggleIsPushed);
    }


    // React要素の配列はそのままrenderできる
    const wordList = [];
    for (let cWord of cWordListData) {
        const rotateCategory = () => {
            let newCategory = "";
            //配列とオブジェクトは参照型なので、変数に格納してもコピーされない
            //参照型を格納した変数に変更を行ってしまったので、再レンダリングがされなかった
            switch (cWord.category) {
                case "none":
                    newCategory = "red";
                    break;
                case "red":
                    newCategory = "yellow";
                    break;
                case "yellow":
                    newCategory = "none";
                    break;
                default:
                    break;
            }
            //参照型なのでそのまま代入する
            cWord.category = newCategory;
            setWordListData(cWordListData);
        }
        const switchEnIsDisplayed = () => {
            cWord.enIsDisplayed = !cWord.enIsDisplayed;
            setWordListData(cWordListData);
        }
        const switchJaIsDisplayed = () => {
            cWord.jaIsDisplayed = !cWord.jaIsDisplayed;
            setWordListData(cWordListData);
        }
        const wordBox = <WordBox key={cWord.id} word={cWord} categoryButtonOnClick={rotateCategory}
            switchEnIsDisplayed={switchEnIsDisplayed} switchJaIsDisplayed={switchJaIsDisplayed} />;
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
                <ToggleBox whenEnPushed={switchEnButton} whenJaPushed={switchJaButton}
                 enToggleIsPushed={enToggleIsPushed} jaToggleIsPushed={jaToggleIsPushed} />
            </div>
            <PopupBox />
        </header>
        <div className="word-list" id="word-list">
            {/* React要素の配列はそのままrenderできる */}
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
    // props:
    //     whenEnPushed      <Function>
    //     whenJaPushed      <Function>
    //     enToggleIsPushed     <boolean>
    //     jaToggleIsPushed     <boolean>

    const SlashClass = "fa-solid fa-slash" + ' ';
    const enSlashClass = SlashClass + (props.enToggleIsPushed ? "show" : '');
    const jaSlashClass = SlashClass + (props.jaToggleIsPushed ? "show" : '');

    return (
        <div className="toggle-box">
            <div className="en" onClick={props.whenEnPushed}>
                en
                <i className={enSlashClass}/>
            </div>
            <div className="ja" onClick={props.whenJaPushed}>
                ja
                <i className={jaSlashClass}/>
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
    // props:
    //     word     <Object>,
    //     categoryButtonOnClick    <Function>
    //     switchEnIsDisplayed      <Function>
    //     switchJaIsDisplayed      <Function>
    const categoryButtonClass = "category-button" + ' ' + props.word.category;
    const meaningText = []
    for (const meaning of props.word.jaMeaning) {
        meaningText.push(props.word.jaIsDisplayed ? meaning : "ーーーーー");
        meaningText.push(<br />);
    }

    return (
        <div className="word-box">
            <div className="category-box">
                <button className={categoryButtonClass} onClick={props.categoryButtonOnClick} />
            </div>
            <div className="en-word" onClick={props.switchEnIsDisplayed}>
                {props.word.enIsDisplayed ? props.word.enWord : "-----"}
            </div>
            <div className="ja-meaning" onClick={props.switchJaIsDisplayed}>
                {meaningText}
            </div>
            <i className="fa-solid fa-volume-high" />
        </div>
    )
}