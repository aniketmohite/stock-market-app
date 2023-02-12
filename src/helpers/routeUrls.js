import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Details from "../pages/details";
import Variable from "../pages/variable";

import Wrapper from "./wrapper";

export default function RouteUrls() {
  return (
    <Wrapper>
      <Routes>
        <Route path={"/"} exact element={<Dashboard />} />
        <Route path={"/details/:listId"} exact element={<Details />} />
        <Route path={"/variable/:variableValue/:parentIndex/:stateDataId"} exact element={<Variable />} />
      </Routes>
    </Wrapper>
  );
}
