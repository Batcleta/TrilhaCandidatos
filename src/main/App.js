import "./App.css";
import { Switch, Route, useLocation } from "react-router-dom";
import { useTransition, animated } from "react-spring";

// Templates
import Menu from "../components/templates/Menu";
import MenuItem from "../components/templates/MenuItem";

// Pages
import GetVagas from "../pages/main/getVagas";
import Cadastro from "../pages/main/Cadastro";
// SubPages
import Passo01 from "../pages/sub/Passo01";
import PassoMeio from "../pages/sub/passoMeio";
import Passo02 from "../pages/sub/Passo02";
import Passo03 from "../pages/sub/Passo03";
import Passo04 from "../pages/sub/Passo04";
import Passo05 from "../pages/sub/Passo05";
import Passo06 from "../pages/sub/Passo06";
import Passo07 from "../pages/sub/Passo07";
import PassoFinal from "../pages/sub/PassoFinal";

function App() {
  const location = useLocation();
  const transitions = useTransition(location, (location) => location.pathname, {
    from: { opacity: 0, transform: "translateX(100%)" },
    enter: { opacity: 1, transform: "translateX(0%)" },
    leave: { opacity: 0, transform: "translateX(-50%)" },
  });

  return (
    <div className="App">
      <Menu>
        <a className="link-menu" href href="http://trilhatecnologia.com">
          {" "}
          <i className="fa fa-arrow-left"> </i>
          {`  voltar ao site`}
        </a>
      </Menu>
      <div className="container">
        {transitions.map(({ item: location, props, key }) => (
          <animated.div key={key} style={props}>
            <Switch location={location}>
              <Route exact path="/" component={GetVagas} />
              <Cadastro>
                <Route path="/cadastro" component={Cadastro}>
                  <Route exact path="/cadastro" component={Passo01} />
                  <Route
                    exact
                    path="/cadastro/passoMeio"
                    component={PassoMeio}
                  />
                  <Route exact path="/cadastro/passo02" component={Passo02} />
                  <Route exact path="/cadastro/passo03" component={Passo03} />
                  <Route exact path="/cadastro/passo04" component={Passo04} />
                  <Route exact path="/cadastro/passo05" component={Passo05} />
                  <Route exact path="/cadastro/passo06" component={Passo06} />
                  <Route exact path="/cadastro/passo07" component={Passo07} />
                  <Route exact path="/cadastro/final" component={PassoFinal} />
                </Route>
              </Cadastro>
            </Switch>
          </animated.div>
        ))}
      </div>
    </div>
  );
}

export default App;
