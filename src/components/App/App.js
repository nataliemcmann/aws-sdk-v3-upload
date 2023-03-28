//css import
import './App.css';
//component imports
import SingleUploadForm from '../SingleUploadForm/SingleUploadForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <main>
          <h1>Here are different ways to upload files:</h1>
          <div className="uploadForms">
              <SingleUploadForm />
          </div>
      </main>
    </div>
  );
}

export default App;
