import './App.css';
import EmailForm from './components/EmailForm';
import EmailRestAPI from './components/EmailRestAPI';

function App() {
  return (
    <div className="App">
        <h1>Send Email</h1>
        <EmailForm/>
        {/* <EmailRestAPI/> */}
    </div>
  );
}

export default App;
