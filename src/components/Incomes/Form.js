import { get } from "../../services/api";
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

function FormIncome({handleChange, handleSubmit, error}) {
    const [cookies] = useCookies(['auth_token']);    
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

    useEffect(() => {
        getAccounts();
        getCategories();
    }, []);

    return (
        <section>
            <div className="container">
                <form onSubmit={(event) => handleSubmit(event)}>
                    {error.status ? <div className="form-group text-danger">{error.message}</div>: '' }
                    <div className="mb-4 form-group">
                        <label className="col-lg-12" >Fecha</label> 
                        <input
                            className="form-control"
                            type="date"
                            name="dates"
                            onChange={(event) => handleChange(event)}
                        />
                    </div>
                    
                    <div className="mb-4 form-group">
                        <label className="col-lg-12" >Categoria de ingresos</label> 
                        <select
                            className="form-select"
                            name="category"
                            onChange={(event) => handleChange(event)}
                        >
                            <option value="" hidden>Eliga una categoria</option>
                            {
                                categories.map(category => (
                                    category.type === "income" ? (<option key={category.category} value={category.name}>{category.name}</option>): null
                                ))
                            }
                        </select>
                    </div>
                    <div className="mb-4 form-group">
                        <label className="col-lg-12" >Cuenta</label> 
                        <select
                            className="form-select"
                            name="account"
                            onChange={(event) => handleChange(event)}
                        >
                            <option value="" hidden>Eliga una cuenta</option>
                            {
                                accounts.map(account => (
                                    <option key={account.account} value={account.account}>{account.number_account} / {account.bank}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="mb-4 form-group">
                        <label className="col-lg-12" >Observaciones</label> 
                        <input
                            className="form-control"
                            type="text"
                            name="observation"
                            onChange={(event) => handleChange(event)}
                        />
                    </div>
                    <div className="mb-4 form-group">
                        <label className="col-lg-12" >Total</label> 
                        <input
                            className="form-control"
                            type="text"
                            name="total"
                            onChange={(event) => handleChange(event)}
                        />
                    </div>
                    
                    <div className="mb-4 form-group">
                        <button type="submit" className="btn btn-success">Agregar Ingreso</button>
                    </div>

                </form>
            </div>
        </section>
    )
}

export default FormIncome