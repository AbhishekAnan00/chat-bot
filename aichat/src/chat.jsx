import React, { useState, useEffect, useRef } from 'react';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = new WebSocket('ws://localhost:5000');

        socketRef.current.onmessage = async (event) => {
        //event.data is obj,having error for blob obj
            let receivedMessage = event.data;

            if (receivedMessage instanceof Blob) {
                receivedMessage = await receivedMessage.text();
            }

            setMessages((prev) => [...prev, receivedMessage]);
        };

        socketRef.current.onclose = () => console.log("WebSocket disconnect ho gaya");
        socketRef.current.onerror = (error) => console.error("WebSocket Error:", error);

        return () => {
            socketRef.current?.close();
        };
    }, []);

    const sendMessage = () => {
        if (socketRef.current && message.trim()) {
            socketRef.current.send(message);
            setMessage('');
        }
    };

    return (
        <div>
            <h2>WebSocket Chat</h2>
            <div style={{ border: '1px solid black', padding: '10px', height: '200px', overflowY: 'scroll' }}>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input 
                type="text" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;






















