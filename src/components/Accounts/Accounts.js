import ModalAccount from "./Modal"
import { useDispatch, useSelector } from "react-redux"
import { setShow, setActionForm } from "../../redux/actions"
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import { get } from "../../services/api";
import { Link } from "react-router-dom"

function Accounts(){
    const show = useSelector(state => state.show)
    const actionForm = useSelector(state => state.actionForm)

    const dispatch = useDispatch()

    const [cookies] = useCookies(['auth_token']);    
    const [accounts, setAccounts] = useState([]);

    const getAccounts = async () => {
        const result = await get('account', `Bearer ${cookies.auth_token}`);
        if (result.status){
            setAccounts(result.data)
        }
    }

    //Modal
    const handleShow = (type) => {
        dispatch(setShow(true))
        dispatch(setActionForm(type))
    }

    useEffect(() => {
        getAccounts();
    }, [show]);

    


    return (
        <>
        {
            show && actionForm === 'New' ? <ModalAccount/>: null
        }
        <section className="vh-100">
            <div className="container py-5 h-100">
                <button className="mb-4 btn btn-success btn-lg" onClick={()=> handleShow('New')}>Crear cuenta nueva</button>
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>No.</th>
                            <th>Numero de cuenta / Banco</th>
                            <th>Moneda</th>
                            <th>Saldo</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            accounts.map((account, index) => (
                                <tr key={account.account}>
                                    <td>{index+1}</td>
                                    <td>{account.number_account}/{account.bank}</td>
                                    <td>{account.currency}</td>
                                    <td>{account.balance}</td>
                                    <td><button className="btn btn-sm btn-danger">Eliminar</button></td>
                                    <td><Link className="btn btn-sm btn-primary" to={`/account/${account.account}/`}>Ver Historial</Link></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </section>
        </>
    )
}

export default Accounts