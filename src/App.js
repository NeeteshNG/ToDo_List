import './App.css';
import TodoList from './Components/ToDoList';

function App() {
  return (
    <div className="App">
      <TodoList/>
      <div className="ul_git">
            <div className="il_git">
              <a
                href="https://github.com/NeeteshNG/MyTaskBestPeers_3"
                rel="noreferrer"
                target="_blank"
                title="Git Repo"
                className="git-click"
              >
                <i className="fab fa-github size_git"></i>
              </a>
            </div>
          </div>
    </div>
  );
}

export default App;
