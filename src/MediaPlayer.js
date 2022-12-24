import React, { useState } from 'react';

function MediaPlayer() {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [user, setUser] = useState(null);
    const [tracks, setTracks] = useState([]);

    function handlePlay() {
        setIsPlaying(true);
    }

    function handlePause() {
        setIsPlaying(false);
    }

    function handlePreviousTrack() {
        // Go to previous track
        const currentIndex = tracks.indexOf(currentTrack);
        if (currentIndex > 0) {
            setCurrentTrack(tracks[currentIndex - 1]);
        }
    }

    function handleNextTrack() {
        // Go to next track
        const currentIndex = tracks.indexOf(currentTrack);
        if (currentIndex < tracks.length - 1) {
            setCurrentTrack(tracks[currentIndex + 1]);
        }
    }

    function handleUpload(event) {
        event.preventDefault();
        const files = event.target.files;
        // Process the uploaded files and add them to the tracks list
        const newTracks = [...tracks, ...files];
        setTracks(newTracks);
    }

    function handleLogin(event) {
        document.querySelector('#regForm').addEventListener('submit', event =>{
        event.preventDefault();
        const formData = new FormData(event.target);
        // Send a request to the backend to authenticate the user
        // and set the user in the component's state if successful
            const username = formData.get('username');
            const password = formData.get('password');
          
            fetch('/login', {
              method: 'POST',
              body: JSON.stringify({
                username, password }),
                headers: {
                    'content-type': 'application/json'
                }
            })
              .then(response => response.json())
              .then(data => {
                if (data.success) {
                  setUser(data.user);
                } else {
                  // Handle error if login is unsuccessful
                }
              });
            });
          
          
    }

    function handleRegistration(event) {
        document.querySelector('#regForm').addEventListener('submit', event =>{
            event.preventDefault();
            const formData = new FormData(event.target);
            // Send a request to the backend to register the user
            // and set the user in the component's state if successful
            fetch('http://localhost:3002/register', {
                method: 'POST',
                body: formData,
                headers:{
                    "Access-Control-Allow-Origin":'*'
                }
            })
            .then(response => response.json())
            .then(data => {
              if (data.success) {
                  // Set the user in the component's state
                  setUser(data.user);
                }
            });
        })
          
    }

    return (
        <div>
            {user ? (
                <div>
                    <button onClick={handlePreviousTrack}>Previous Track</button>
                    {isPlaying ? (
                        <button onClick={handlePause}>Pause</button>
                    ) : (
                        <button onClick={handlePlay}>Play</button>
                    )}
                    <button onClick={handleNextTrack}>Next Track</button>
                    <form onSubmit={handleUpload}>
                        <label htmlFor="upload">Upload Music:</label>
                        <input type="file" id="upload" multiple />
                        <button type="submit">Upload</button>
                    </form>
                </div>
            ) : (
                <div>
                    <form onSubmit={handleLogin} id="loginForm">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" />
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" />
                        <button type="submit">Login</button>
                    </form>
                    <form id="regForm">
                        <label htmlFor="username1">Username:</label>
                        <input type="text" id="username1" />
                        <label htmlFor="password1">Password:</label>
                        <input type="password" id="password1" />
                        <button onClick={handleRegistration}>Sign Up</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default MediaPlayer;
