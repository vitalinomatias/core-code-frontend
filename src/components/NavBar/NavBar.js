import { useContext, useState } from 'react';
import AuthContext from '../../context/auth-context';
import { Navbar, Container, Nav, NavDropdown, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = (props) => {
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const HandleLogout = async () => {
    setError('');
    try {
      await authCtx.logout();
      navigate('/login', { replace: true });
    } catch {
      setError('Failed to log out');
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Inicio
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/accounts">
                Cuentas
              </Nav.Link>
              <Nav.Link as={Link} to="/expenses">
                Gastos
              </Nav.Link>
              <Nav.Link as={Link} to="/incomes">
                Ingresos
              </Nav.Link>
              <Nav.Link as={Link} to="/transfers">
                Transferencias
              </Nav.Link>
              <NavDropdown  className='dropdown-toggle' title="Categorias" id="basic-nav-dropdown">
                <NavDropdown.Item>
                    <Link className='dropdown-item' to={`/category/${'income'}`} >Ingresos</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                    <Link className='dropdown-item' to={`/category/${'expense'}`} >Gastos</Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <NavDropdown
                title={`${authCtx.currentUser.first_name}`}
              >
                <NavDropdown.Item onClick={HandleLogout}>
                  Cerrar sesion
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {error && <Alert variant="danger">{error}</Alert>}
    </header>
  );
};
export default NavBar;
