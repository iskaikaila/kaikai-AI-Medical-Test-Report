import  React  from  'react';
import  {  BrowserRouter  as  Router,  Routes,  Route  }  from  'react-router-dom';
import  Login  from  './pages/Login';
import  RegistrationForm  from  './pages/RegistrationForm';
import  Home  from  './pages/Home'; 
import  SearchFilter  from  './components/SearchFilter';
import  EditRecord  from  './components/EditRecord';
import  DownloadRecord  from  './components/DownloadRecord';

const  App  =  ()  =>  {
    return  (
      <Router>
        <Routes>
          <Route  path="/"  element={<Home  />}  />  {/*  主页路由  */}
          <Route  path="/login"  element={<Login  />}  />
          <Route  path="/register"  element={<RegistrationForm  />}  />
          <Route  path="/edit-record/:id"  component={EditRecord}  />
          <Route  path="/download-record/:id"  component={DownloadRecord}  />
        </Routes>
      </Router>
    );
};

export  default  App;

