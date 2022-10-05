// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement
// } from 'chart.js';

// import { Bar, Pie } from 'react-chartjs-2';
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import { get } from "../../services/api";
import ModalTransfer from '../Transfers/Modal';
import { useDispatch, useSelector } from "react-redux"
import { setShow, setActionForm } from "../../redux/actions"

function Dashboard() {

  const [cookies] = useCookies(['auth_token']);
  const [accounts, setAccounts] = useState([]);
  const show = useSelector(state => state.show)
  const actionForm = useSelector(state => state.actionForm)
  const dispatch = useDispatch()
  const [idAccount, setIdAccount] = useState('')
  const getAccounts = async () => {
      const result = await get('account', `Bearer ${cookies.auth_token}`);
      if (result.status){
          setAccounts(result.data)
      }
  }

  const handleShow = (type, id) => {
    dispatch(setShow(true))
    dispatch(setActionForm(type))
    setIdAccount(id)
  }

  // ChartJS.register(
  //   CategoryScale,
  //   LinearScale,
  //   BarElement,
  //   Title,
  //   Tooltip,
  //   Legend,
  //   ArcElement
  // );

  // const dataPie = {
  //   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //   datasets: [
  //     {
  //       label: '# of Votes',
  //       data: [12, 19, 3, 5, 2, 3],
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //         'rgba(255, 206, 86, 0.2)',
  //         'rgba(75, 192, 192, 0.2)',
  //         'rgba(153, 102, 255, 0.2)',
  //         'rgba(255, 159, 64, 0.2)',
  //       ],
  //       borderColor: [
  //         'rgba(255, 99, 132, 1)',
  //         'rgba(54, 162, 235, 1)',
  //         'rgba(255, 206, 86, 1)',
  //         'rgba(75, 192, 192, 1)',
  //         'rgba(153, 102, 255, 1)',
  //         'rgba(255, 159, 64, 1)',
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'top',
  //     },
  //     title: {
  //       display: true,
  //       text: 'Chart.js Bar Chart',
  //     },
  //   },
  // };

  // const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: 'Dataset 1',
  //       // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //       data: [ 1,2,3,4,5,6,7],
  //       backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //     },
  //     {
  //       label: 'Dataset 2',
  //       // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //       data: [ 8,9,0,1,2,3,4],
  //       backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //     },
  //   ],
  // };

  useEffect(() => {
    getAccounts();
}, []);




  return (
    <>
    {
      show && actionForm === 'New' ? <ModalTransfer id={idAccount}/>: null
    }
    <section className="vh-100">
      <div className="container py-5 h-100">

        <h3 className="card-title">Tipo de Cambio Q7.80</h3>
        <div className="row my-4">
          {
            accounts.map(account => (
              <div className="col-sm-4 my-4" key={account.account} >
                <div className="card">
                  <div className="card-header">
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">Numbero de Cuenta: {account.number_account}</h5>
                    <span className="card-text">{account.bank} - {account.type_account} </span>
                    <span className="card-text">{account.currency} </span>
                    <h5 className="card-text text-end">Saldo Actual {account.balance}</h5>
                  </div>
                  <div className="card-footer">
                    <button className="btn btn-sm btn-success mx-1" onClick={() => handleShow('New', account.account )}>Transferir</button>
                    <Link className="btn btn-sm btn-primary mx-1" to={`/account/${account.account}/`}>Historial</Link>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        {/* <div className="row mt-5">
          <div className="col-sm-6">
            <Bar options={options} data={data} />
          </div>
          <div className="col-sm-6">
            <Pie options={options} data={dataPie} />
          </div>
        </div> */}
      </div>
    </section>
    </>
  )
}
export default Dashboard;
