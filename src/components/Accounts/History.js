import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import { getOne } from "../../services/api";
import { useParams } from "react-router-dom"

function History(){
    const [cookies] = useCookies(['auth_token']);
    
    const [account, setAccount] = useState([]);
    const [infoAccount, setInfoAccount] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [buttonNext, setButtonNext] = useState(false)
    const [buttonPrev, setButtonPrev] = useState(true)

    const {id} = useParams()
    
    const getAccount = async () => {
        const result = await getOne('account', `Bearer ${cookies.auth_token}`, id);
        if (result.status){
            setAccount(result.data)
        }
    }

    const getInfoAccount = async () => {
        const result = await getOne('account_info', `Bearer ${cookies.auth_token}`, id);
        if (result.status){
            setInfoAccount(result.data[0])
        }
    }

    const filterHistory = (account) => {
        return account.slice(currentPage, currentPage+10)
    }
    
    const nextPage = () => {
        if (account.length > currentPage + 10){
            setCurrentPage(currentPage+10)
            setButtonPrev(false)
        }
        if (currentPage+20 > account.length){
            setButtonNext(true)
        }
    }

    const prevPage = () => {
        if(currentPage > 0){
            setCurrentPage(currentPage-10)
            setButtonNext(false)
        }
        if (currentPage <= 10){
            setButtonPrev(true)
        }
    }

    useEffect(() => {
        getAccount();
        getInfoAccount();
    }, []);


    return (
        <>
        <section className="vh-100">
            <div className="container py-5 h-100">
                <div className="row mb-4">
                    <div className="col-6">
                        <h4>Banco: {infoAccount.bank}</h4>
                    </div>
                    <div className="col-6">
                        <h4>Numero de cuenta: {infoAccount.number}</h4>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-6">
                        <h4>Tipo de Cuenta: {infoAccount.type}</h4>
                    </div>
                    <div className="col-6">
                        <h4>Moneda: {infoAccount.currency}</h4>
                    </div>
                </div>
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th style={{width:150}} >Fecha</th>
                            <th style={{width:300}}>Categoria</th>
                            <th style={{width:150}}>Credito</th>
                            <th style={{width:150}}>Debito</th>
                            <th style={{width:150}}>Saldo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filterHistory(account).map(account => (
                                <tr key={account.record} >
                                    <td>{account.dates}</td>
                                    <td>{account.category}</td>
                                    <td>{account.type === 'Income' ? account.total : " "}</td>
                                    <td>{account.type === 'Expense' ? account.total : " "}</td>
                                    <td>{account.balance}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <button
                    className="btn btn-primary"
                    onClick={prevPage}
                    disabled={buttonPrev}
                >Anterior</button>
                &nbsp;
                <button
                    className="btn btn-primary"
                    onClick={nextPage}
                    disabled={buttonNext}
                >Siguiente</button>
            </div>
        </section>
        </>
    )
}

export default History