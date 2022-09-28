
export function FilterIcon(props) {
    // props:
    //     isPushed    <Boolean>
    //     whenPushed      <Function>

    const c = "fa-solid fa-filter fa-lg" + ' ' + (props.isPushed ? "pushed" : '');
    return (
        <i className={c} onClick={props.whenPushed} />
    )   
}
