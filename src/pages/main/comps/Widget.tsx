

export default function Widget({isShown}: {isShown: boolean}) {
    
    const sizeClassName: string | undefined = isShown ? 'widget-item': undefined;


    return (
        <div className={sizeClassName} >

        </div>
    );
}