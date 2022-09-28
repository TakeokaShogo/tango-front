
export function ShuffleIcon(props) {
    // props:
    //     isPushed    <Boolean>
    //     whenPushed      <Function>

    const c = "fa-solid fa-shuffle fa-lg" + ' ' + (props.isPushed ? "pushed" : '');
    return (
        <i className={c} onClick={props.whenPushed} />
    )
}