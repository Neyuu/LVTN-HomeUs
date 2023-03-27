import {
    Routes,
    Route,
    Link,
    Navigate,
    Outlet,
} from 'react-router-dom';
import Header from './pages/Admin/layouts/Header';
import NavBar from "./pages/Admin/layouts/NavBar";
  
  const ProtectedRoute = ({ user, redirectPath = '/' }) => {
    if (!user) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return (
      <div>
        <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
          {/* Header */}
          <Header/>
          {/* ./Header */}
          {/* Sidebar */}
            <NavBar/>
          {/* ./Sidebar */}
          <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
              <Outlet/>
          </div>
        </div>
      </div>
    );
  };
  
export default ProtectedRoute