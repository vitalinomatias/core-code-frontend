function FormType({handleChange, handleSubmit, error}) {
    
    return (
        <section>
            <div className="container">
                <form onSubmit={(event) => handleSubmit(event)}>
                {error.status ? <div className="form-group text-danger">{error.message}</div>: '' }
                    <div className="mb-4 form-group">
                        <label className="col-lg-12" >Nombre</label> 
                        <input 
                            className="form-control" 
                            type="text"
                            name="name"
                            onChange={(event) => handleChange(event)}
                        />
                    </div>
                    <div className="mb-4 form-group">
                        <button type="submit" className="btn btn-success">Crear Categoria</button>
                    </div>

                </form>
            </div>
        </section>
    )
}

export default FormType