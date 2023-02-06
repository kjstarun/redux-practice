// import Counter from "./comp/calculator";
import { Provider } from "react-redux";
import store from "./redux/store";

import List from "./comp/List";

function App() {
  return (
    <Provider store={store}>
      <List />
    </Provider>
  );
}

export default App;
