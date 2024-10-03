import io from 'socket.io-client';
const socket = io.connect('http://localhost:3001');

function App() {
  
  const sendMessage = () => {
    socket.emit('sendMessage', {
      message: 'Hello'
    });
  }

  return (
    <div>
      <input placeholder="Message" />
      <button
        onClick={sendMessage}
      >Send</button>
    </div>
  );
}

export default App
