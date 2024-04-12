
export default function SeacrhBar({ type }: { type: number }) {


    const style = getStyle(type);

    function getStyle(type: number) {
        if (type === 1) {
            return {
                borderRadius: "10px",
            };
        }
        if (type === 2) {
            return {
                borderTop: '0px',
                borderLeft: '0px',
                borderRight: '0px',
            }
        }
    }

    return (
        <div className="header">
            <div id="searchBarItem" style={style}>
                <input></input>
            </div>
        </div>
    );
}