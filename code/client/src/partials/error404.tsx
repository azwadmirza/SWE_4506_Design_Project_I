import '../assets/css/error-view.css';

const Error404 = () => {
    return ( 
        <div className="error-view">
            <h1>Error 404</h1>
            <p>The Page is Broken</p>
            <img src="/robot.jpg" width={"40%"}/>
        </div>
     );
}
 
export default Error404;