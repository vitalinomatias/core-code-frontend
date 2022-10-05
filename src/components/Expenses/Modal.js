import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { setShow } from '../../redux/actions';
import { post } from '../../services/api';
import FormExpense from './Form';

function ModalExpense() {
  const [cookies] = useCookies(['auth_token']);
  const show = useSelector(state => state.show)
  const [expense, setExpense] = useState({})  
  const [error, setError] = useState({
    status: false,
    message: {}
    
  })
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(setShow(false))
  }

  const handleChange = (event) => {
    setExpense({
      ...expense,
      [event.target.name]: event.target.value
    })
    console.log(expense);
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const result = await post('expense', `Bearer ${cookies.auth_token}`, expense)
    
    if (result.status){
      dispatch(setShow(false))
    } else if (result.message === 'Saldo insuficiente') {
      setError({
        ...error,
        status: true,
        message: 'Saldo insuficiente'
      })
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
            Crear Gasto
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormExpense handleChange={handleChange} handleSubmit={handleSubmit} error={error}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} >Cerrar</Button>
        </Modal.Footer>
      </Modal>
  );
}

export default ModalExpense