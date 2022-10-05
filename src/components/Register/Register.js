import { useRef, useContext, useState, useEffect } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import AuthContext from '../../context/auth-context';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState('');
  const [disabledSubmit, setDisableSubmit] = useState(false);
  const firstNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRed = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    if (Object.entries(authCtx.currentUser).length !== 0) {
      navigate('/', { replace: true });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRed.current.value)
      return setError('Passwords do not match');
    try {
      setError('');
      setDisableSubmit(true);
      await authCtx.register(
        firstNameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value
      );
      return navigate('/login', { replace: true });
    } catch (error) {
      console.log(error);
      setError('Failed to create an account');
    }
    setDisableSubmit(false);
  };

  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: '100vh' }}
      >
        <div className="w-100" style={{ maxWidth: '400px' }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Registro</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="first_name">
                  <Form.Label>Nombres</Form.Label>
                  <Form.Control type="text" ref={firstNameRef} required />
                </Form.Group>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Confirmar Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRed}
                    required
                  />
                </Form.Group>
                <Button
                  disabled={disabledSubmit}
                  className="w-100 mt-3"
                  type="submit"
                >
                  Registrar
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <Link to="/login">Iniciar sesión</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
