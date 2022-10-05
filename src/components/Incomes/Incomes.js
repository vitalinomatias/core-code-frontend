import ModalIncome from "./Modal"
import { useDispatch, useSelector } from "react-redux"
import { setShow, setActionForm } from "../../redux/actions"
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import { get } from "../../services/api";


function Incomes(){
    const show = useSelector(state => state.show)
    const actionForm = useSelector(state => state.actionForm)
    const dispatch = useDispatch()
    const [cookies] = useCookies(['auth_token']);
    const [incomes, setIncomes] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [search, setSearch] = useState({
        date: '',
        category: '',
        account: ''
    })
    const [button, setButton] = useState(true)
    const [accounts, setAccounts] = useState([]);
    const [categories, setCategories] = useState([]);

    const getAccounts = async () => {
        const result = await get('account', `Bearer ${cookies.auth_token}`);
        if (result.status){
            setAccounts(result.data)
        }
    }

    const getCategories = async () => {
        const result = await get('category', `Bearer ${cookies.auth_token}`);
        if (result.status){
            setCategories(result.data)
        }
    }
    
    const handleSearch = (event) => {
        setCurrentPage(0);
        setSearch({
            ...search,
            [event.target.name]: event.target.value
        })
    }

    const filterIncomes = (incomes) => {
        if (search.date.length>0 || search.category.length>0 || search.account.length>0){
            let filtered = incomes
            if (search.date.length>0)
                filtered = filtered.filter( income => income.date===search.date)
            if (search.category.length>0)
                filtered = filtered.filter( income => income.category===search.category)
            if (search.account.length>0)
                filtered = filtered.filter( income => `${income.number_account}/${income.bank}`===search.account)

            return filtered.slice(currentPage, currentPage+10)
        }
        
        return incomes.slice(currentPage, currentPage+10)
    }

    const handleDate = () =>{
        setSearch({
            ...search,
            date: ''
        })
    }
    
    const nextPage = () => {
        if (incomes.length > currentPage + 10){
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

    const getIncomes = async () => {
        const result = await get('income', `Bearer ${cookies.auth_token}`);
        if (result.status){
            setIncomes(result.data)
        }
    }

    const handleShow = (type) => {
        dispatch(setShow(true))
        dispatch(setActionForm(type))
    }

    useEffect(() => {
        getIncomes();
        getCategories();
        getAccounts();
    }, [show]);

    return (
        <>
        {
            show && actionForm === 'New' ? <ModalIncome/>: null
        }
        <section className="vh-100">
            <div class="container py-5 h-100">
                <button className="mb-4 btn btn-success btn-lg" onClick={()=> handleShow('New')}>Nuevo Ingreso</button>
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
                        <label className="form-label">Categoria</label>
                        <select
                            className="form-select"
                            name="category"
                            value={search.category}
                            onChange={handleSearch}
                        >
                            <option value="" >Todas</option>
                            {
                                categories.map(category => (
                                    category.type === "income" ? (<option key={category.category} value={category.name}>{category.name}</option>): null
                                ))
                            }
                            <option value="Transferencia">Transferencia</option>
                        </select>
                    </div>
                    <div className="col-4">
                        <label className="form-label">Cuenta</label>
                        <select
                            className="form-select"
                            name="account"
                            value={search.account}
                            onChange={handleSearch}
                        >
                            <option value="">Todas</option>
                            {
                                accounts.map(account => (
                                    <option key={account.account} value={`${account.number_account}/${account.bank}`}>{account.number_account} / {account.bank}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th style={{width:60}} >No.</th>
                            <th style={{width:100}} >Fecha</th>
                            <th style={{width:100}} >Categoria</th>
                            <th style={{width:100}} >Cuenta/Banco</th>
                            <th style={{width:150}} >Observaciones</th>
                            <th style={{width:75}} >Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filterIncomes(incomes).map(income=>(
                                <tr key={income.record}>
                                    <td>{income.record}</td>
                                    <td>{income.date}</td>
                                    <td>{income.category}</td>
                                    <td>{income.number_account} / {income.bank}</td>
                                    <td>{income.observation}</td>
                                    <td>Q.{income.total}</td>
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

export default Incomes