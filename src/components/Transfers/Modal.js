import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { setShow } from '../../redux/actions';
import { post } from '../../services/api';
import FormTransfer from './Form';
import { useEffect } from 'react';

function ModalTransfer({id}) {
  const [cookies] = useCookies(['auth_token']);
  const show = useSelector(state => state.show)
  const [transfer, setTransfer] = useState({})
  const [error, setError] = useState({
    status: false,
    message: {}    
  })
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(setShow(false))
  }

  const handleChange = (event) => {
    setTransfer({
      ...transfer,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const result = await post('transfer', `Bearer ${cookies.auth_token}`, transfer)    
    if (result.status){
      dispatch(setShow(false))
    } else {
      if(typeof result.message !== 'object'){
        setError({
          ...error,
          status: true,
          message: result.message
        })
      } else {
        setError({
          ...error,
          status: true,
          message: 'Todos los datos son requeridos'
        })
      }
    }
  }

  useEffect(() => {  
    if (id){
      setTransfer({
        debit_account: id
      })
    }
}, []);


  return (

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Crear transferencia
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormTransfer handleChange={handleChange} handleSubmit={handleSubmit} error={error} id={id}  />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} >Cerrar</Button>
        </Modal.Footer>
      </Modal>
  );
}

export default ModalTransfer