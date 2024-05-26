import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Invite from './components/invitePage/InviteComp';
import InviteResponseDetails from './components/InviteResponseDetail/InviteResponseDetail';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Invite />} />
          <Route path="/:parameterName" element={<Invite />} />
          <Route path="/admin" element={<InviteResponseDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

// http://localhost:3000/?n=tarkeshwar%20modi&a=kalar%20road,%20barki%20suriya&t=full%20family&l=hindi
