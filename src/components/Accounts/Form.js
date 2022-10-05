function FormAccount({handleChange, handleSubmit, error}) {
    
    return (
        <section>
            <div className="container">
                <form onSubmit={(event) => handleSubmit(event)}>
                {error.status ? <div className="form-group text-danger">{error.message}</div>: '' }
                    <div className="mb-4 form-group">
                        <label className="col-lg-12" >Banco</label> 
                        <select 
                            className="form-select" 
                            name="bank"
                            onChange={(event) => handleChange(event)}
                        >
                            <option value="" hidden>Eliga un banco</option>
                            <option value="Bantrab">Bantrab</option>
                            <option value="Banrural">Banrural</option>
                            <option value="Banco Industrial">Banco Industrial</option>
                            <option value="Gyt Contientar">Gyt Continental</option>
                            <option value="Banco Internacional">Banco Internacional</option>
                            <option value="Promerica">Promerica</option>
                            <option value="BAM">BAM</option>
                            <option value="Banco Azteca">Banco Azteca</option>
                            <option value="Banco de Antigua">Banco de Antigua</option>
                            <option value="Banco Inmobiliario">Banco Inmobiliario</option>
                        </select>
                    </div>
                    <div className="mb-4 form-group">
                        <label className="col-lg-12" >Numero de cuenta</label> 
                        <input 
                            className="form-control" 
                            type="number"
                            name="number_account"
                            onChange={(event) => handleChange(event)}
                        />
                    </div>
                    <div className="mb-4 form-group">
                        <label className="col-lg-12" >Tipo de Cuenta</label> 
                        <select 
                            className="form-select" 
                            name="type_account"
                            onChange={(event) => handleChange(event)}
                        >
                            <option value="" hidden>Eliga un tipo de cuenta</option>
                            <option value="Monetaria">Monetaria</option>
                            <option value="Ahorro">Ahorro</option>
                        </select>
                    </div>
                    <div className="mb-4 form-group">
                        <label className="col-lg-12" >Moneda</label> 
                        <select 
                            className="form-select" 
                            name="currency"
                            onChange={(event) => handleChange(event)}
                        >
                            <option value="" hidden>Eliga un tipo de moneda</option>
                            <option value="Quetzales">Quetzales</option>
                            <option value="Dolares">Dolares</option>
                        </select>
                    </div>
                    <div className="mb-4 form-group">
                        <label className="col-lg-12" >Saldo Inicial</label> 
                        <input
                            className="form-control" 
                            type="number"
                            name='balance'
                            onChange={(event) => handleChange(event)}
                        />
                    </div>
                    
                    <div className="mb-4 form-group">
                        <button type="submit" className="btn btn-success">Crear Cuenta</button>
                    </div>

                </form>
            </div>
        </section>
    )
}

export default FormAccount