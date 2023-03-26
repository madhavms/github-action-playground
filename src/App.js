import './App.css';
import GithubActionsComponent from './components/Github';
import GitHubActionsStats from './components/SearchWorkflows';

function App() {
  return (
    <div className="App" style={{display:'flex', alignItems:'center', flexDirection:'column', width:'100%'}}>
      <GithubActionsComponent/>
      <GitHubActionsStats/>
    </div>
  );
}

export default App;
