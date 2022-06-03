import MainContainer from "./containers/MainContainer/MainContainer";
import Header from "./containers/Header/Header"
import { fetchPosts } from "./redux/slugAction"

import './App.scss';

function App() {
    fetchPosts()
    return (
    <div className="App">
      <Header />
      <MainContainer />
    </div>
    );
}

export default App;
