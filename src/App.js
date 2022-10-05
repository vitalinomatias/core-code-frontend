import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Accounts from './components/Accounts/Accounts';
import History from './components/Accounts/History';
import Expenses from './components/Expenses/Expenses';
import Incomes from './components/Incomes/Incomes';
import Transfers from './components/Transfers/Transfers';
import Categories from './components/category/Category';

function App() {
  return (
    <AuthProvider>
      <Container fluid className="ps-0 pe-0">
        <Routes>
          <Route exact path="/" element={<Layout component={Dashboard} />} />
          <Route exact path="/accounts" element={<Layout component={Accounts} />} />
          <Route exact path='/account/:id' element={<Layout component={History}/>}/>
          <Route exact path="/expenses" element={<Layout component={Expenses} />} />
          <Route exact path="/incomes" element={<Layout component={Incomes} />} />
          <Route exact path="/transfers" element={<Layout component={Transfers} />} />
          <Route exact path="/category/:type" element={<Layout component={Categories} />} />
          <Route exact path="/category/:type" element={<Layout component={Categories} />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Container>
    </AuthProvider>
  );
}

export default App;
