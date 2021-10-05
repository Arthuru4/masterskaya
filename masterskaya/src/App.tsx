import React from "react";
import "./App.scss";
import Header from "./Components/Header/Header";
import Content from "./Components/Content/Content";
import NavMenu from "./Components/Navigation/NavMenu";
import { ChangeMobileDesktop } from "./scripts/custom-hooks/ChangeMobileDesktop";
import { Provider } from "mobx-react";
import StoreMobx from "./scripts/mobx/Store";
import CartIcon from "./Components/Cart/Cart";
import Footer from "./Components/Footer/Footer";
import CartModal from "./Components/Cart/CartModal";

function App() {
  return (
    <Provider {...StoreMobx}>
      <>
        <div className="App">
          <div className={'app_wrap'}>
            <NavMenu />
            {/*<Header />*/}
            <Content />

            <Footer />
          </div>

          <CartModal />
          <CartIcon />
          <ChangeMobileDesktop />
        </div>
      </>
    </Provider>
  );
}

export default App;
