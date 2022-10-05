import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { setShow } from '../../redux/actions';
import { post } from '../../services/api';
import FormAccount from './Form';

function ModalAccount() {
  const [cookies] = useCookies(['auth_token']);
  const show = useSelector(state => state.show)
  const [account, setAccount] = useState({
    bank: null,
    number_account: null,
    type_account: null,
    currency: null,
    balance: null
  })
  const [error, setError] = useState({
    status: false,
    message: {}    
  })

  const dispatch = useDispatch()

  //Modal
  const handleClose = () => {
    dispatch(setShow(false))
  }

  const handleChange = (event) => {
    setAccount({
      ...account,
      [event.target.name]: event.target.value
      
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const result = await post('account', `Bearer ${cookies.auth_token}`, account)
    console.log(result);
    if (result.status){
      dispatch(setShow(false))
    } else {
      setError({
        ...error,
        status: true,
        message: 'Todos los datos son requeridos'
      })
    }
  }

  return (

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Cuenta Nueva
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormAccount handleChange={handleChange} handleSubmit={handleSubmit} error={error} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} >Cerrar</Button>
        </Modal.Footer>
      </Modal>
  );
}

export default ModalAccount