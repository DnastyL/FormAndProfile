import { BrowserRouter as Router} from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";
import { AppRoutes } from "./routes";

function App() {
  return (
    <Router>
      <section>
        <UserContextProvider>
          <AppRoutes/>
        </UserContextProvider>
      </section>
    </Router>
  );
}

export default App;
