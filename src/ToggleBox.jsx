
export function ToggleBox(props) {
    // props:
    //     whenPushed      <Function>
    //     ToggleIsPushed     <boolean>

    const commonClass = "fa-solid fa-slash" + ' ';
    const enSlashClass = commonClass + (props.toggleIsPushed.en ? "show" : '');
    const jaSlashClass = commonClass + (props.toggleIsPushed.ja ? "show" : '');

    return (
        <div className="toggle-box">
            <div className="en" onClick={() => props.whenPushed("en")}>
                en
                <i className={enSlashClass}/>
            </div>
            <div className="ja" onClick={() => props.whenPushed("ja")}>
                ja
                <i className={jaSlashClass}/>
            </div>
        </div>
    )
}