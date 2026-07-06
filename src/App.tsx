
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Sponsors from './pages/Sponsors';
import Gallery from './pages/Gallery';
import JudgesMentors from './pages/JudgesMentors';
import Guests from './pages/Guests';
import ProblemStatements from './pages/ProblemStatements';
import TimelinePage from './pages/TimelinePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/judges-mentors" element={<JudgesMentors />} />
        <Route path="/guests" element={<Guests />} />
        <Route path="/problem-statements" element={<ProblemStatements />} />
        <Route path="/timeline" element={<TimelinePage />} />
      </Routes>
    </Router>
  );
}

export default App;