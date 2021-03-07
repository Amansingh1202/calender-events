import Calender from "./components/Calender.jsx";
import AddEvent from "./components/AddEvent.jsx";
import "./App.css";

function App() {
  let events = [];
  return (
    <div>
      <AddEvent events={events} />
      <Calender events={events} />
    </div>
  );
}

export default App;
