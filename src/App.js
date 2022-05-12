import { BrowserRouter as Router} from "react-router-dom";
import { AppRoutes } from "./routes";

function App() {
  return (
    <Router>
      <section>
        <AppRoutes/>
      </section>
    </Router>
  );
}

export default App;
