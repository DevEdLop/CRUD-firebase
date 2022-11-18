import React from 'react'

const TableData = (props) => {
    const { userForm, eliminar, editar } = props
    return (
        <>
            {userForm.length !== 0 ? (
                <div className='text-center d-flex justify-content-between'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>NOMBRE</th>
                                <th>APELLIDO</th>
                                <th>OCUPACION</th>
                                <th>IDENTIFICACION</th>
                                <th>PAIS</th>
                                <th>EDAD</th>
                                <th>GENERO</th>
                                <th>ACCCIONES</th>
                            </tr>
                        </thead>
                        <tbody id='usersTable'>
                            {
                                userForm.map((item) => {
                                    return (<>
                                        <tr key={item.id}>
                                            <td>{item.nombre}</td>
                                            <td>{item.apellido}</td>
                                            <td>{item.ocupacion}</td>
                                            <td>{item.nidentificacion}</td>
                                            <td>{item.npais}</td>
                                            <td>{item.nedad}</td>
                                            <td>{item.nsexo}</td>
                                            <td>
                                                <div className='d-flex justify-content-between'>
                                                    <button className="btn btn-danger m-1"
                                                        onClick={() => eliminar(item.id)}>Eliminar</button>
                                                    <button className="btn btn-warning m-1"
                                                        onClick={() => editar(item)}>Editar</button>
                                                </div>
                                            </td>
                                        </tr>

                                    </>

                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>) : (<p className='text-center'>No existen registros. Por favor, ingrese los datos</p>)}
        </>
    )
}

export default TableData
