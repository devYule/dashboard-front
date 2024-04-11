export default function Main() {
    console.log('render Main');
    const user = JSON.parse(localStorage.getItem('user') as string);
    console.log('user: ', user);

    return (
        <div>
            <h1>Main</h1>
        </div>
    );
}