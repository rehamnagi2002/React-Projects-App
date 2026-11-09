import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Project from "./components/projects/Project";
import Projects from "./components/projects/Projects";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import HomePage from "./components/homePage/HomePage";
import Overview from "./components/overview/Overview";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/login/Login";
import Settings from "./components/settings/Settings";
import { AuthProvider } from "./AuthProvider";
import { withAuth } from "./hocs/withAuth";

const ProtectedDashboard = withAuth(Dashboard);
const ProtectedSettings = withAuth(Settings);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<ProtectedDashboard />}>
            <Route index element={<Navigate replace to="overview" />} />
            <Route path="overview" element={<Overview />} />
            <Route path="settings" element={<ProtectedSettings />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:projectId" element={<Project />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
