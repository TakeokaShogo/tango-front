
export function PopupBox(props) {
    const popupClass = "popup-box" + ' ' + (props.popupIsShown ? "show" : '');
    return (
        <div className={popupClass}>
            <p>表示するカテゴリー</p>
            <label className="popup-text">
                マークなし<input type="checkbox" onClick={() => props.whenChanged({type:"none"})}
                 checked={props.isShownCategory.none} />
            </label>
            <label className="popup-text">
                <span className="red">赤</span>マーク<input type="checkbox" onClick={() => props.whenChanged({type:"red"})}
                 checked={props.isShownCategory.red} />
            </label>
            <label className="popup-text">
                <span className="yellow">黄</span>マーク<input type="checkbox" onClick={() => props.whenChanged({type:"yellow"})}
                 checked={props.isShownCategory.yellow} />
            </label>
        </div>
    )
}