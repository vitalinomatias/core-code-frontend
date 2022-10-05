import ModalTransfer from "./Modal"
import { useDispatch, useSelector } from "react-redux"
import { setShow, setActionForm } from "../../redux/actions"
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import { get } from "../../services/api";

function Transfers(){
    const show = useSelector(state => state.show)
    const actionForm = useSelector(state => state.actionForm)
    const dispatch = useDispatch()
    const [cookies] = useCookies(['auth_token']);
    const [transfers, setTransfers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [search, setSearch] = useState({
        date: '',
        debit: '',
        credit: ''
    })
    const [button, setButton] = useState(true)
    const [accounts, setAccounts] = useState([]);
    
    const getAccounts = async () => {
        const result = await get('account', `Bearer ${cookies.auth_token}`);
        if (result.status){
            setAccounts(result.data)
        }
    }

    const handleSearch = (event) => {
        setCurrentPage(0);
        setSearch({
            ...search,
            [event.target.name]: event.target.value
        })
    }

    const filterTransfers = (transfers) => {
        if (search.date.length>0 || search.debit.length>0 || search.credit.length>0){
            let filtered = transfers
            if (search.date.length>0)
                filtered = filtered.filter( transfer => transfer.date===search.date)
            if (search.debit.length>0)
                filtered = filtered.filter( transfer => `${transfer.number_debit_account}/${transfer.bank_debit}`===search.debit)
            if (search.credit.length>0)
                filtered = filtered.filter( transfer => `${transfer.number_credit_account}/${transfer.bank_credit}`===search.credit)

            return filtered.slice(currentPage, currentPage+10)
        }
        
        return transfers.slice(currentPage, currentPage+10)
    }

    const handleDate = () =>{
        setSearch({
            ...search,
            date: ''
        })
    }
    
    const nextPage = () => {
        if (transfers.length > currentPage + 10){
            setCurrentPage(currentPage+10)
            setButton(false)
        }
    }

    const prevPage = () => {
        if(currentPage > 0){
            setCurrentPage(currentPage-10)
        }
        if (currentPage <= 10){
            setButton(true)
        }
    }

    const getTransfers = async () => {
        const result = await get('transfer', `Bearer ${cookies.auth_token}`);
        if (result.status){
            setTransfers(result.data)
        }
    }

    const handleShow = (type) => {
        dispatch(setShow(true))
        dispatch(setActionForm(type))
    }

    useEffect(() => {
        getTransfers();
        getAccounts();
    }, [show]);


    return (
        <>
        {
            show && actionForm === 'New' ? <ModalTransfer/>: null
        }
        <section className="vh-100">
            <div class="container py-5 h-100">
                <button className="mb-4 btn btn-success btn-lg" onClick={()=> handleShow('New')}>Transferancia</button>
                <div className="row mb-4">
                    <div className="col-4">
                        <label className="form-label">Fecha</label>
                        <div className="row">
                            <div className="col-9">
                                <input
                                    className="form-control"
                                    type="date"
                                    name='date'
                                    value={search.date}
                                    onChange={handleSearch}
                                />
                            </div>
                            <div className="col-2">
                                <button
                                    className="btn btn-secondary"
                                    onClick={handleDate}
                                >Limpiar</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <label className="form-label">Cuenta Debito</label>
                        <select
                            className="form-select"
                            name="debit"
                            value={search.debit}
                            onChange={handleSearch}
                        >
                            <option value="">Todas</option>
                            {
                                accounts.map(account => (
                                    <option key={account.account} value={`${account.number_account}/${account.bank}`} >{account.number_account}/{account.bank}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="col-4">
                        <label className="form-label">Cuenta Credito</label>
                        <select
                            className="form-select"
                            name="credit"
                            value={search.credit}
                            onChange={handleSearch}
                        >
                            <option value="">Todas</option>
                            {
                                accounts.map(account => (
                                    <option key={account.account} value={`${account.number_account}/${account.bank}`} >{account.number_account}/{account.bank}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>No.</th>
                            <th>Fecha</th>
                            <th>Cuenta Debito</th>
                            <th>Cuenta Credito</th>
                            <th>Descripción</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filterTransfers(transfers).map(transfer => (
                                <tr key={transfer.transfer} >
                                    <td>{transfer.transfer} </td>
                                    <td>{transfer.date} </td>
                                    <td>{transfer.number_debit_account} / {transfer.bank_debit} </td>
                                    <td>{transfer.number_credit_account} / {transfer.bank_credit} </td>
                                    <td>{transfer.description} </td>
                                    <td>{transfer.total} </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <button
                    className="btn btn-primary"
                    onClick={prevPage}
                    disabled={button}
                >Anterior</button>
                &nbsp;
                <button
                    className="btn btn-primary"
                    onClick={nextPage}
                >Siguiente</button>
            </div>
        </section>
        </>
    )
}

export default Transfers