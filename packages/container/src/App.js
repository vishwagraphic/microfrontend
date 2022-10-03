import React, { lazy, Suspense, useState } from "react";
/* import MarketingApp from "./components/MarketingApp";
import AuthApp from "./components/AuthApp"; */
import Header from "./components/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  createGenerateClassName,
  StylesProvider
} from "@material-ui/core/styles";
import Progress from "./components/Progress";

const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const AutLazy = lazy(() => import("./components/AuthApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "con"
});

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  return (
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <div>
          <Header
            onSignOut={() => setIsSignedIn(false)}
            isSignedIn={isSignedIn}
          />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AutLazy onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/" component={MarketingLazy} />
            </Switch>
          </Suspense>
        </div>
      </BrowserRouter>
    </StylesProvider>
  );
};
