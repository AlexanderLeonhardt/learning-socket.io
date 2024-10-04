import { useEffect, useState } from 'react';
import io from 'socket.io-client';
const serverIp = window.location.hostname === 'localhost' ? 'localhost' : '192.168.1.151';
const socket = io.connect(`http://${serverIp}:3001`);

function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  
  const handleSendMessage = (event) => {
    event.preventDefault();

    if (message.trim() !== '') {
      socket.emit('sendMessage', { message });
      setMessages(prevMessages => [
        ...prevMessages,
        message,
      ]);
      setMessage('');
    }
  }

  useEffect(() => {
    socket.on('messageHistory', (history) => {
      const parsedHistory = history.map((msgObj) => {
        return msgObj.message;
      });
      if (parsedHistory) setMessages(parsedHistory);
    });

    socket.on('recieveMessage', (data) => {
      setMessages(prevMessages => [
        ...prevMessages,
        data[data.length - 1].message,
      ]);
    });

    return () => {
      socket.off('messageHistory');
      socket.off('recieveMessage');
    }
  }, []);

  return (
    <div>
      <div>
        {messages.map((msg, index) => {
          return <div key={index}>{msg}</div>
        })}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          value={message}
          placeholder="Message"
          onChange={(event) => setMessage(event.target.value)} 
        />
        <button type='submit'>Send</button>
      </form>
    </div>
  );
}

export default App
