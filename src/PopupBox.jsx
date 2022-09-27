
export function PopupBox(props) {
    return (
        <div className="popup-box">
            <p>表示するカテゴリー</p>
            <label className="popup-text">マークなし<input type="checkbox" /></label>
            <label className="popup-text">赤マーク<input type="checkbox" /></label>
            <label className="popup-text">黄マーク<input type="checkbox" /></label>
        </div>
    )
}