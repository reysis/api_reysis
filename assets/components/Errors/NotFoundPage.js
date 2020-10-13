import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class NotFoundPage extends Component{
    render(){
        return (
            <div className="page">
                <p style={{textAlign:"center"}}>
                    <span>Page not Found: click <Link to="/">here </Link> to go to Home</span>
                </p>
            </div>
        )
    }
}
export default NotFoundPage;