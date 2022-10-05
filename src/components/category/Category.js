import ModalCategory from "./Modal";
import { useDispatch, useSelector } from "react-redux"
import { setShow, setActionForm } from "../../redux/actions"
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import { get } from "../../services/api";
import { useParams } from "react-router-dom"

function Categories(){
    const show = useSelector(state => state.show)
    const actionForm = useSelector(state => state.actionForm)
    const dispatch = useDispatch()
    const [cookies] = useCookies(['auth_token']);
    const [categories, setCategories] = useState([]);
    const {type} = useParams()

    const getCategories = async () => {
        const result = await get('category', `Bearer ${cookies.auth_token}`);
        if (result.status){
            setCategories(result.data)
        }
    }

    const handleShow = (type) => {
        dispatch(setShow(true))
        dispatch(setActionForm(type))
    }

    useEffect(() => {
        getCategories();
    }, [show]);

    return (
        <>
        {
            show && actionForm === 'New' ? <ModalCategory type={type} />: null            
        }
        <section className="vh-100">
            <div className="container py-5 h-100">
                <button className="mb-4 btn btn-success btn-lg" onClick={()=> handleShow('New')}>{ type === 'income' ? 'Crear nuevo ingreso': 'Crear nuevo gasto'}  </button>
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>No.</th>
                            <th>Categoria</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories.map((category, index) => (
                                category.type === type ? (
                                    <tr key={category.category}>
                                        <td>{index+1}</td>
                                        <td>{category.name}</td>
                                        <td><button className="btn btn-sm btn-danger">Eliminar</button></td>
                                    </tr>
                                ) : null
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </section>
        </>
    )
}

export default Categories