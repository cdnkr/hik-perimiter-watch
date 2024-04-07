import { Redirect, Route, Switch } from "react-router-dom";

import Sidebar from "components/layout/Sidebar";
import CameraGrid from "pages/CameraGrid";
import ViewCamera from "pages/ViewCamera";

import "assets/styles/tailwind.css";

const App = () => (
        <>
            <Sidebar />
            <div className="md:ml-64" style={{ background: "#131417" }}>
                <Switch>
                    <Route exact path="/" component={CameraGrid} />
                    <Route exact path="/:camera" component={ViewCamera} />
                    <Redirect from="*" to="/" />
                </Switch>
            </div>
        </>
    );
export default App;
