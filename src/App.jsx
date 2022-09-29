import { useEffect, useState, useReducer } from "react"
import { addIsDisplayedProperty, shuffleArray, shuffleArrayWithSeed } from "./script"
import { WordBox } from "./WordBox"
import { SectionPullDown } from './SectionPullDown'
import { FilterIcon } from "./FilterIcon"
import { ShuffleIcon } from "./ShuffleIcon"
import { ToggleBox } from "./ToggleBox"
import { PopupBox } from "./PopupBox"

const ORIGIN = "http://192.168.0.117:5000";

export function App() {
    //stateは使用する順に並んでいる
    //配列とオブジェクトは参照型なので、変数に格納してもコピーされない
    //配列やオブジェクトのコピーを作るときは、concatなどの関数を使う!!
    //concatは浅いコピー？
    // const [wordListData, setWordListData] = useState([]);
    const [toggleIsPushed, toggleDispatch] = useReducer((prevState, action) => {
        switch (action.type) {
            case "en":
                return {en:!prevState.en, ja:prevState.ja};
            case "ja":
                return {en:prevState.en, ja:!prevState.ja};
            default:
                return prevState;
        }
    }, {en:false, ja:false})
    
    const [stateWordListData, wordListDataDispatch] = useReducer((prevState, action) => {
        const nWordListData = prevState.concat();

        switch (action.type) {
            case "init":
                return action.wordListData;

            case "changeAllDisplay":
                for (let iWord of nWordListData) {
                    //配列は参照型なので直接代入
                    iWord.isDisplayed[action.language] = !toggleIsPushed[action.language];
                }
                //set~の関数を実行した後でも、処理はそこで終わらない
                //(その後のset~系の関数も実行される)
                return nWordListData;

            case "changeOneDisplay":
                const oWord = nWordListData.find(i => i.id === action.id);
                const isDisplayed = oWord.isDisplayed[action.language];
                oWord.isDisplayed[action.language] = !isDisplayed;
                return nWordListData;

            case "changeCategory":
                const cWord = nWordListData.find(i => i.id === action.id);
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
                return nWordListData;

            default:
                return prevState;
        }
    }, [])

    const [currentSection, setCurrentSection] = useState("ALL");
    const handleSectionChanged = (e) => {
        setCurrentSection(e.target.value);
    }

    const [popupIsShown, setPopupIsShown] = useState(false);
    const handlePopupIsPushed = () => {
        setPopupIsShown((prevState) => !prevState);
    }
    const [isShownCategory, isShownCategoryDispatch] = useReducer((prevState, action) => {
        switch (action.type) {
            case "none":
                return {none:!prevState.none, red:prevState.red, yellow:prevState.yellow};
            case "red":
                return {none:prevState.none, red:!prevState.red, yellow:prevState.yellow};
            case "yellow":
                return {none:prevState.none, red:prevState.red, yellow:!prevState.yellow};
            default:
                return prevState;
        }
    }, {none:true, red:true, yellow:true});

    const s = Math.floor(Math.random() * 10**8);
    const [shuffleState, setShuffleState] = useState({isShuffled:false, seed:s});
    const handleShuffled = () => {
        const s = Math.floor(Math.random() * 10**8);
        setShuffleState((prevState) => ({isShuffled:!prevState.isShuffled, seed:s}));
    }

    const switchButton = (language) => {
        toggleDispatch({type:language});
        wordListDataDispatch({type:"changeAllDisplay", language:language})
    }
    //currentSectionを参照してcWordListDataを整理した後に、
    //isShowCategoryを参照してcWordListDataを整理する

    useEffect(
        () => {
            fetch(ORIGIN + "/word_list").then(response => response.json())
            .then(
                (result) => {
                    const w = {type:"init", wordListData:addIsDisplayedProperty(result.top)};
                    wordListDataDispatch(w);
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

    let cWordListData = stateWordListData.concat();
    if (currentSection !== "ALL") {
        cWordListData = cWordListData.slice((currentSection-1)*100, currentSection*100);
    }
    if (shuffleState.isShuffled) {
        cWordListData = shuffleArrayWithSeed(cWordListData, shuffleState.seed);
    }

    if (!isShownCategory.none) {
        cWordListData = cWordListData.filter(item => item.category.match("none") == null);
    }
    if (!isShownCategory.red) {
        cWordListData = cWordListData.filter(item => item.category.match("red") == null);
    }
    if (!isShownCategory.yellow) {
        cWordListData = cWordListData.filter(item => item.category.match("yellow") == null);
    }

    // React要素の配列はそのままrenderできる
    const wordList = [];
    for (let cWord of cWordListData) {
        const wordBox = <WordBox key={cWord.id} word={cWord} 
            categoryButtonOnClick={() => wordListDataDispatch({type:"changeCategory", id:cWord.id})} 
            switchEnIsDisplayed={() => wordListDataDispatch({type:"changeOneDisplay", id:cWord.id, language:"en"})} 
            switchJaIsDisplayed={() => wordListDataDispatch({type:"changeOneDisplay", id:cWord.id, language:"ja"})} />;
        wordList.push(wordBox);
    }

    return (
        <>
        {/* <div> */}
        <header className="header">
            <SectionPullDown whenSectionChanged={handleSectionChanged} />                      
            <div className="tool-space">
                <FilterIcon isPushed={popupIsShown} whenPushed={handlePopupIsPushed} />
                <ShuffleIcon isPushed={shuffleState.isShuffled} whenPushed={handleShuffled} />
                <ToggleBox whenPushed={switchButton} toggleIsPushed={toggleIsPushed} />
            </div>
            <PopupBox popupIsShown={popupIsShown} isShownCategory={isShownCategory} whenChanged={isShownCategoryDispatch} />
        </header>
        <div className="word-list" id="word-list">
            {/* React要素の配列はそのままrenderできる */}
            {wordList}
        </div>
        {/* </div> */}
        </>
    )
}