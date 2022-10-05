import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { setShow } from '../../redux/actions';
import { post } from '../../services/api';
import FormIncome from './Form';

function ModalIncome() {
  const [cookies] = useCookies(['auth_token']);
  const show = useSelector(state => state.show)
  const [income, setIncome] = useState({})  
  const [error, setError] = useState({
    status: false,
    message: {}
    
  })

  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(setShow(false))
  }

  const handleChange = (event) => {
    setIncome({
      ...income,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
  
    const result = await post('income', `Bearer ${cookies.auth_token}`, income)
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
            Crear Ingreso
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormIncome handleChange={handleChange} handleSubmit={handleSubmit} error={error} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} >Cerrar</Button>
        </Modal.Footer>
      </Modal>
  );
}

export default ModalIncome