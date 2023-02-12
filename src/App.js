import "./App.css";
import RouteUrls from "./helpers/routeUrls";
import Wrapper from "./helpers/wrapper";

function App() {
  return (
    <Wrapper>
      <div className="App">
        <main className="md:max-w-7xl mx-auto max-w-full flex justify-center items-center h-screen">
          <div>
            <RouteUrls />
          </div>
        </main>
      </div>
    </Wrapper>
  );
}

export default App;
