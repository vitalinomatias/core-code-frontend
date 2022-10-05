import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { setShow } from '../../redux/actions';
import { post } from '../../services/api';
import FormType from './Form';

function ModalCategory({type}) {

  const [cookies] = useCookies(['auth_token']);
  const show = useSelector(state => state.show)  
  const [category, setCategory] =useState({
    type: type
  })
  const [error, setError] = useState({
    status: false,
    message: {}    
  })

  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(setShow(false))
  }

  const handleChange = (event) => {
    setCategory({
      ...category,
      [event.target.name]: event.target.value
      
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const result = await post('category', `Bearer ${cookies.auth_token}`, category)    
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
            Crear Categoria
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormType handleChange={handleChange} handleSubmit={handleSubmit} error={error} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} >Cerrar</Button>
        </Modal.Footer>
      </Modal>
  );
}

export default ModalCategory