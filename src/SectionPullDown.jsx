
export function SectionPullDown(props) {
    //props:
    //      whenSectionChanged      <Function>

    return (
            <div className="pull-down">
                <select name="prefecture" onChange={props.whenSectionChanged} id="section-pulldown">
                    <option value={"ALL"}>ALL Section</option>
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