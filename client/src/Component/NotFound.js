import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return(
        <>
            <div className="notFound">
                <h1>404</h1>
                <h4>Page Not Found</h4>
                <p>This page you're looking for does not seem to exist</p>
                <Link to={"/"}>Go to Home</Link>
            </div>
        </>
    )
}

export default NotFound;