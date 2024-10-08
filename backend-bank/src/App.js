import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './pages/Admin';
import CheckClientForm from './pages/CheckClientForm';
import CheckProspectForm from './pages/CheckProspectForm';
import UserManagement from './pages/UserManagement';
import AccountManagement from './pages/AccountManagement';
import TransactionManagement from './pages/TransactionManagement';
import AdminLoginForm from './pages/AdminLoginForm';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './pages/ProtectedRoute';
import ClientLoginForm from './pages/ClientLoginForm';
import AdminTransaction from './pages/AdminTransaction.js' ;
import Settings from './pages/Settings.js';
import AdminAccountManagement from './pages/AdminAccountMangment.js';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/client" element={<Admin />} />
        <Route path="/check-client" element={<CheckClientForm />} />
        <Route path="/check-prospect" element={<CheckProspectForm />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/account-management" element={<AccountManagement /> } />
        <Route path="/settings" element={<Settings />} />
        <Route path="/admin/account-management" element={<AdminAccountManagement />} />
        <Route path="/transactions/:cin" element={<TransactionManagement />} />
        <Route path="/admin-login" element={<AdminLoginForm />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/login" element={<AdminLoginForm />} />
        
        <Route path="/admin-dashboard" element={<ProtectedRoute element={AdminDashboard} />} />
        
        <Route path="/login-client" element={<ClientLoginForm />} />
       
        <Route path='/transactions-Admin' element={<AdminTransaction />} />
     
      </Routes>
    </Router>
  );
};

export default App;
