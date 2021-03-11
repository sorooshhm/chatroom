import React from 'react';
import classes from '../Layout.module.css'
import Header from './components/Header';

const Home = () => {
    return (
        <div className="d-flex justify-content-center align-items-center h-100" style={{flexDirection : 'column', position : 'relative'}}> 
              <Header title={'Home'} />

            <img src="/img/newChat.svg" width="340"></img>
            <br></br>
            <div>Select a chat to start texting ...</div>
        </div>
    );
}

export default Home;
