import React from 'react'
import Items from './Items';

const Home = (props) => {
    const {showalert}=props;
    return (
        <>
            <div className="container my-3">
                <Items showalert={showalert} />
            </div>
        </>

    )
}

export default Home
