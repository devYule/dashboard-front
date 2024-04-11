import { DirectionBtnProps } from "../interfaces/Interfaces";




export default function DirectionBtn({ className, onClick, disabled, btnStyle, btnDirection }: DirectionBtnProps) {
    return (
        <button className={className} onClick={onClick} disabled={disabled}>
            {btnDirection === 'right' ? (
                <svg style={btnStyle} width="34" height="35" viewBox="0 0 34 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 26.3205L24 17.6603L9 9" stroke="black" />
                </svg>
            ) : (<>
                <svg width="34" height="35" viewBox="0 0 34 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 8.99998L9 17.6602L24 26.3205" stroke="black" />
                </svg>
            </>
            )}
        </button>
    )
}