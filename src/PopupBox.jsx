
export function PopupBox(props) {
    const popupClass = "popup-box" + ' ' + (props.isShown ? "show" : '');
    return (
        <div className={popupClass}>
            <p>表示するカテゴリー</p>
            <label className="popup-text">マークなし<input type="checkbox" /></label>
            <label className="popup-text">赤マーク<input type="checkbox" /></label>
            <label className="popup-text">黄マーク<input type="checkbox" /></label>
        </div>
    )
}