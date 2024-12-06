import { useState } from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import RHome from "./loggedIn/restro/Dashboard.jsx";
import CHome from "./loggedIn/college/Dashboard.jsx";
import DHome from "./loggedOut/Home.jsx";
import Payment from "./loggedOut/Payment.jsx";
import Home from "./loggedIn/student/Home.jsx";
import Pricing from "./loggedOut/Pricing.jsx";
import Login from "./loggedOut/Login.jsx";
import SignUp from "./loggedOut/SignUp.jsx";
import BusinessSignUp from "./loggedOut/BusinessSignUp.jsx";
import PrivateRoute from "./PrivateRouter.jsx";
import Event from "./loggedIn/student/Event.jsx";
import EventView from "./loggedIn/student/EventView.jsx";
import GroupView from "./loggedIn/student/GroupView.jsx";
import RestroView from "./loggedIn/student/RestroView.jsx";
import ModuleView from "./loggedIn/student/ModuleView.jsx";
import Module from "./loggedIn/student/Module.jsx";
import CreateModules from "./loggedIn/college/pages/createModules.jsx";
import CreateEvents from "./loggedIn/college/pages/createEvents.jsx";
import CreateGroups from "./loggedIn/college/pages/createGroups.jsx";
import Group from "./loggedIn/student/Group.jsx";
import Events from "./loggedIn/college/Events.jsx";
import CEventView from "./loggedIn/college/EventView.jsx";
import CModuleView from "./loggedIn/college/ModuleView.jsx";
import Modules from "./loggedIn/college/Modules.jsx";
import Groups from "./loggedIn/college/Groups.jsx";
import CGroupView from "./loggedIn/college/GroupView.jsx";
import REvents from "./loggedIn/restro/Events.jsx";
import REventView from "./loggedIn/restro/EventView.jsx";
import RCreateEvents from "./loggedIn/restro/pages/createEvents.jsx";
import Food from "./loggedIn/student/Food.jsx";
import Chat from "./loggedIn/student/Chat.jsx";
import CChat from "./loggedIn/college/Chat.jsx";
import CSettings from "./loggedIn/college/settings.jsx";
import RSettings from "./loggedIn/restro/Settings.jsx";

import AHome from "./loggedIn/admin/Dashboard.jsx";
import AEvents from "./loggedIn/admin/Events.jsx";
import AChat from "./loggedIn/admin/Chat.jsx";
import AModules from "./loggedIn/admin/Modules.jsx";
import AGroups from "./loggedIn/admin/Groups.jsx";
import AFood from "./loggedIn/admin/Food.jsx";
import AEventView from "./loggedIn/admin/EventView.jsx";
import AModuleView from "./loggedIn/admin/ModuleView.jsx";
import AGroupView from "./loggedIn/admin/GroupView.jsx";
import AFoodView from "./loggedIn/admin/RestroView.jsx";
import ACreateModules from "./loggedIn/admin/pages/createModules.jsx";
import ACreateEvents from "./loggedIn/admin/pages/createEvents.jsx";
import ACreateGroups from "./loggedIn/admin/pages/createGroups.jsx";
import Settings from "./loggedIn/student/Settings.jsx";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* Public routes */}
        <Route path="/" element={<DHome />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="businesssignup" element={<BusinessSignUp />} />
        <Route path="payment" element={<Payment />} />
        {/* Protected routes */}
        <Route
          path="std/home"
          element={<PrivateRoute element={<Home />} />}
        ></Route>
        <Route
          path="std/event"
          element={<PrivateRoute element={<Event />} />}
        ></Route>
        <Route
          path="event/:id"
          element={<PrivateRoute element={<EventView />} />}
        ></Route>
        <Route
          path="std/grp"
          element={<PrivateRoute element={<Group />} />}
        ></Route>
        <Route
          path="group/:id"
          element={<PrivateRoute element={<GroupView />} />}
        ></Route>
        <Route
          path="std/module"
          element={<PrivateRoute element={<Module />} />}
        ></Route>
        <Route
          path="module/:id"
          element={<PrivateRoute element={<ModuleView />} />}
        ></Route>
        <Route
          path="std/food"
          element={<PrivateRoute element={<Food />} />}
        ></Route>
        <Route
          path="std/chat"
          element={<PrivateRoute element={<Chat />} />}
        ></Route>
        <Route
          path="food/:id"
          element={<PrivateRoute element={<RestroView />} />}
        ></Route>
        <Route
          path="std/settings/:id"
          element={<PrivateRoute element={<Settings />} />}
        ></Route>
        {/* Admin */}
        <Route
          path="admin/home"
          element={<PrivateRoute element={<AHome />} />}
        ></Route>
        <Route
          path="admin/createModules"
          element={<PrivateRoute element={<ACreateModules />} />}
        ></Route>
        <Route
          path="admin/createEvents"
          element={<PrivateRoute element={<ACreateEvents />} />}
        ></Route>
        <Route
          path="admin/createGroups"
          element={<PrivateRoute element={<ACreateGroups />} />}
        ></Route>
        <Route
          path="admin/event"
          element={<PrivateRoute element={<AEvents />} />}
        ></Route>
        <Route
          path="admin/event/:id"
          element={<PrivateRoute element={<AEventView />} />}
        ></Route>
        <Route
          path="admin/chat"
          element={<PrivateRoute element={<AChat />} />}
        ></Route>
        <Route
          path="admin/module"
          element={<PrivateRoute element={<AModules />} />}
        ></Route>
        <Route
          path="admin/module/:id"
          element={<PrivateRoute element={<AModuleView />} />}
        ></Route>
        <Route
          path="admin/grp"
          element={<PrivateRoute element={<AGroups />} />}
        ></Route>
        <Route
          path="admin/grp/:id"
          element={<PrivateRoute element={<AGroupView />} />}
        ></Route>

        {/* college */}
        <Route
          path="clg/home"
          element={<PrivateRoute element={<CHome />} />}
        ></Route>
        <Route
          path="clg/createModules"
          element={<PrivateRoute element={<CreateModules />} />}
        ></Route>
        <Route
          path="clg/createEvents"
          element={<PrivateRoute element={<CreateEvents />} />}
        ></Route>
        <Route
          path="clg/createGroups"
          element={<PrivateRoute element={<CreateGroups />} />}
        ></Route>
        <Route
          path="clg/event"
          element={<PrivateRoute element={<Events />} />}
        ></Route>
        <Route
          path="clg/event/:id"
          element={<PrivateRoute element={<CEventView />} />}
        ></Route>
        <Route
          path="clg/chat"
          element={<PrivateRoute element={<CChat />} />}
        ></Route>
        <Route
          path="clg/module"
          element={<PrivateRoute element={<Modules />} />}
        ></Route>
        <Route
          path="clg/module/:id"
          element={<PrivateRoute element={<CModuleView />} />}
        ></Route>
        <Route
          path="clg/grp"
          element={<PrivateRoute element={<Groups />} />}
        ></Route>
        <Route
          path="clg/grp/:id"
          element={<PrivateRoute element={<CGroupView />} />}
        ></Route>
        <Route
          path="clg/settings/:id"
          element={<PrivateRoute element={<CSettings />} />}
        ></Route>

        {/* restaurant */}
        <Route
          path="restro/home"
          element={<PrivateRoute element={<RHome />} />}
        ></Route>
        <Route
          path="restro/createEvents"
          element={<PrivateRoute element={<RCreateEvents />} />}
        ></Route>
        <Route
          path="restro/event"
          element={<PrivateRoute element={<REvents />} />}
        ></Route>
        <Route
          path="restro/event/:id"
          element={<PrivateRoute element={<REventView />} />}
        ></Route>
        <Route
          path="restro/settings/:id"
          element={<PrivateRoute element={<RSettings />} />}
        ></Route>
        {/* Redirect to home if route not found */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
