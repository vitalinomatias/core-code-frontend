import { get } from "../../services/api";
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

function FormTransfer({handleChange, error, handleSubmit, id}) {
    const [cookies] = useCookies(['auth_token']);
    const [accounts, setAccounts] = useState([]);

    const getAccounts = async () => {
        const result = await get('account', `Bearer ${cookies.auth_token}`);
        if (result.status){
            setAccounts(result.data)
        }
    }

    const NewAccounts = (accounts) => {
        if (id) {
            return accounts.filter(account => account.account === id)
        }
        return accounts
    }

    useEffect(() => {
        getAccounts();
    }, []);

    return (
        <section>
            <div class="container">
                <form onSubmit={(event) => handleSubmit(event)}>
                    {error.status ? <div className="form-group text-danger">{error.message}</div>: '' }
                    <div className="mb-4 form-group">
                        <label className="col-lg-12" >Fecha</label> 
                        <input 
                            className="form-control" 
                            type="date"
                            name="date_transfer"
                            onChange={(event) => handleChange(event)}
                        />
                    </div>
                    <div className="mb-4 form-group">
                        <label className="col-lg-12" >Cuenta Debito</label> 
                        <select
                            className="form-select"
                            name="debit_account"
                            onChange={(event) => handleChange(event)}
                            disabled={id ? true : false}
                        >
                            { !id ? <option value="" hidden>Eliga una cuenta</option>: null}
                            
                            {
                                NewAccounts(accounts).map(account => (
                                    <option key={account.account} value={account.account}>{account.number_account} / {account.bank}</option>
                                ))
                            }
                            
                        </select>
                    </div>
                    <div className="mb-4 form-group">
                        <label className="col-lg-12" >Cuenta Credito</label> 
                        <select
                            className="form-select"
                            name="credit_account"
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
                        <label className="col-lg-12" >Descripción</label> 
                        <input
                            className="form-control"
                            type="text"
                            name="description"
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
                        <button type="submit" className="btn btn-success">Transferir</button>
                    </div>

                </form>
            </div>
        </section>
    )
}

export default FormTransfer