import React, { useState, useEffect } from 'react' //el useEffect genera la vizualizacion del estado
import TableData from './TableData';
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';


const Formulario = () => {

    const initialState = {
        nombre: '',
        ocupacion: '',
        apellido: '',
        identificacion: '',
        pais: '',
        edad: '',
        sexo: '',
    }

    const [form, setForm] = useState(initialState);
    const [errors, setErrors] = useState({})
    const [userForm, setUserForm] = useState([])
    const [modoEdicion, setModoEdicion] = useState(false)
    const [id, setId] = useState('')




    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                onSnapshot(collection(db, "Users"), (query) => {
                    setUserForm(query.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
                })
            } catch (error) {
                console.log(error)
            }
        }
        obtenerDatos();
    }, [])

    const eliminar = async id => {
        try {
            await deleteDoc(doc(db, 'Users', id))
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.nombre.trim()) {
            setErrors({ nombre: "El Nombre es requerido" });
            return;
        }

        if (!form.apellido.trim()) {
            setErrors({ apellido: "El Apellido  es requerido" });
            return;
        }

        if (!form.ocupacion) {
            setErrors({ ocupacion: "La ocupacion es requerida" });
            return;
        }

        if (!form.identificacion) {
            setErrors({ identificacion: "La identificacion es requerida" });
            return;
        }
        if (!form.pais) {
            setErrors({ pais: "El pais es requerido" });
            return;
        }
        if (!form.edad) {
            setErrors({ edad: "La edad es requerida" });
            return;
        }

        if (!form.sexo) {
            setErrors({ sexo: "el genero es requerido" });
            return;
        }


        setForm({})


        console.log("Registrado");
        guardarFrutas();
    };


    const guardarFrutas = async (e) => {
        try {
            const data = await addDoc(collection(db, 'Users'), {
                nombre: form.nombre,
                ocupacion: form.ocupacion,
                apellido: form.apellido,
                nidentificacion: form.identificacion,
                npais: form.pais,
                nedad: form.edad,
                nsexo: form.sexo,
            })
            setUserForm([
                ...userForm,
                {
                    id: data.id,
                    nombre: form.nombre,
                    ocupacion: form.ocupacion,
                    apellido: form.apellido,
                    nidentificacion: form.identificacion,
                    npais: form.pais,
                    nedad: form.edad,
                    nsexo: form.sexo,
                }
            ])

            setForm({})
            setErrors('')

        } catch (error) {
            console.log(error)
        }
    }

    const editarFrutas = async () => {
        try {
            const docRef = doc(db, 'Users', id);
            await updateDoc(docRef, {
                nombre: form.nombre,
                ocupacion: form.ocupacion,
                apellido: form.apellido,
                nidentificacion: form.identificacion,
                npais: form.pais,
                nedad: form.edad,
                nsexo: form.sexo,
                //imagen
            })

            const nuevoArray = userForm.map(
                item => item.id === id ? {
                    id: id,
                    nombre: form.nombre,
                    ocupacion: form.ocupacion,
                    apellido: form.apellido,
                    nidentificacion: form.identificacion,
                    npais: form.pais,
                    nedad: form.edad,
                    nsexo: form.sexo,
                } : item
            )

            setUserForm(nuevoArray)
            setForm(initialState)
            setErrors('')

        } catch (error) {
            console.log(error)
        }
    }

    const handleEditar = async (e) => {
        e.preventDefault();

        if (!form.nombre.trim()) {
            setErrors({ nombre: "El Nombre es requerido" });
            return;
        }

        if (!form.apellido.trim()) {
            setErrors({ apellido: "El Apellido  es requerido" });
            return;
        }

        if (!form.ocupacion.trim()) {
            setErrors({ ocupacion: "La ocupacion es requerida" });
            return;
        }

        if (!form.identificacion.trim()) {
            setErrors({ identificacion: "La identificacion es requerida" });
            return;
        }
        if (!form.pais.trim()) {
            setErrors({ pais: "El pais es requerido" });
            return;
        }
        if (!form.edad.trim()) {
            setErrors({ edad: "La edad es requerida" });
            return;
        }

        if (!form.sexo.trim()) {
            setErrors({ sexo: "el genero es requerido" });
            return;
        }


        setForm({})


        console.log("Registrado");
        editarFrutas();
    };



    const editar = item => {
        setForm({
            nombre: item.nombre,
            ocupacion: item.ocupacion,
            apellido: item.apellido,
            identificacion: item.nidentificacion,
            pais: item.npais,
            edad: item.nedad,
            sexo: item.nsexo


        })
        setId(item.id)
        setModoEdicion(true)
        setErrors('')
    }

    const cancelar = () => {
        setId('')
        setModoEdicion(false)
        setForm(initialState)
    }


    return (

        <div className='container mt-5'>
            <h1 className="text-center">CRUD CON FIREBASE</h1>
            <hr />
            <div className='text-center d-flex justify-content-between'>

                <div>
                    {(
                        errors.nombre ||
                        errors.apellido ||
                        errors.ocupacion ||
                        errors.identificacion ||
                        errors.pais ||
                        errors.edad ||
                        errors.sexo
                    ) ? (
                        <div className="alert alert-danger mt-4">
                            <p>{
                                errors.nombre ||
                                errors.apellido ||
                                errors.ocupacion ||
                                errors.identificacion ||
                                errors.pais ||
                                errors.edad ||
                                errors.sexo}</p>
                        </div>
                    ) : null}
                </div>

                <div className='col-4'>
                    <h4 className='text-center'>
                        {
                            modoEdicion ? 'Editar Datos' : 'Datos Personales'
                        }
                    </h4>
                    <form onSubmit={modoEdicion ? handleEditar : handleSubmit}>
                        <input type="text"
                            className="form-control mb-2"
                            placeholder='Ingrese su Nombre'
                            value={form.nombre}
                            onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
                        <input type="text"
                            className="form-control mb-2"
                            placeholder='Ingrese su Apellido'
                            value={form.apellido}
                            onChange={(e) => setForm({ ...form, apellido: e.target.value })} />
                        <input type="text"
                            className="form-control mb-2"
                            placeholder='Ingrese su Ocupacion'
                            value={form.ocupacion}
                            onChange={(e) => setForm({ ...form, ocupacion: e.target.value })} />
                        <input type="number"
                            className="form-control mb-2"
                            placeholder='Ingrese su identificacion'
                            value={form.identificacion}
                            onKeyDown={e => ['e', 'E', '-', '+', ',', '.'].includes(e.key) && e.preventDefault()}
                            onChange={(e) => setForm({ ...form, identificacion: e.target.value })} />
                        <input type="text"
                            className="form-control mb-2"
                            placeholder='Ingrese el pais'
                            value={form.pais}
                            onChange={(e) => setForm({ ...form, pais: e.target.value })} />
                        <input type="number"
                            className="form-control mb-2"
                            placeholder='Ingrese su edad'
                            value={form.edad}
                            onKeyDown={e => ['e', 'E', '-', '+', ',', '.'].includes(e.key) && e.preventDefault()}
                            onChange={(e) => setForm({ ...form, edad: e.target.value })} />
                        <select className='form-select' value={form.sexo} onChange={(e) => setForm({ ...form, sexo: e.target.value })}>
                            <option target hidden>Seleccione su genero...</option>
                            <option value='Masculino'>Masculino</option>
                            <option value='Femenino'>Femenino</option>
                            <option value='Basado'>Basado</option>
                        </select>

                        {
                            modoEdicion ?
                                (
                                    <>
                                        <button
                                            className='btn btn-warning btn-block'
                                            on='submit'>Editar</button>
                                        <button
                                            className='btn btn-dark btn-block mx-2'
                                            onClick={() => cancelar()}>Cancelar</button>
                                    </>
                                )
                                :

                                <button
                                    type='submit'
                                    className='btn btn-primary btn-block' >
                                    agregar
                                </button>
                        }
                    </form>

                </div>
            </div>
            <hr />
            < div className='row d-flex justify-content-center'>
                <div className='col-8'>
                    <h4 className='text-center'>Tabla de Datos</h4>
                    <TableData userForm={userForm} eliminar={eliminar} editar={editar} />
                </div>
            </div>
        </div>




    )


}
export default Formulario
