import React,{useState,useEffect} from "react";
import {db} from '../Firebase';
import {collection , doc , addDoc, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";

const Formulario = () => {
    const[elemento, setelemento] = useState('');
    const[apellido, setapellido] = useState('');
    const[numero, setnumero] = useState('');
    const[descripcion, setdescripcion] = useState('');
    const[pais, setpais] = useState('');
    const[cedula, setcedula] = useState('');
    const[edad, setedad] = useState('');
    const Image = ('https://picsum.photos/100/100?random');
    const[id, setId] = useState(0);
    const[Edicion, setEdicion] = useState(false);
    const[Lista, setLista] = useState([]);


    useEffect(()=>{
       const obtenerDatos = async () =>{
        try {
            await onSnapshot(collection(db,'Elemento'), (query)=>{
                setLista(query.docs.map((doc) => ({...doc.data(), id:doc.id,})));
            });
        } catch (x) {
           console.log(x);
        }
       }
       obtenerDatos();
      
    },[]);

    const guardarElement = async (e) =>  {
        e.preventDefault();
       
        try {
            const data = await addDoc(collection(db,'Elemento'),{
                nombreElemento: elemento,
                nombreApellido: apellido,
                nombreDescripcion: descripcion,
                numeroCedula: cedula,
                numeroEdad: edad,
                numeroCelular: numero,
                nombrePais: pais,    
                img: Image, 
            })
            setLista(
                [...Lista, {
                    nombreElemento: elemento,
                    nombreApellido: apellido,
                    nombreDescripcion: descripcion,   
                    numeroCedula: cedula,
                    numeroEdad: edad,
                    numeroCelular: numero,
                    nombrePais: pais,
                    id: data.id,
                    img: Image,
                }]
            );
            setelemento('');
            setdescripcion('');
            setapellido('');
            setpais('');
            setcedula('');
            setnumero('');
            setedad('');
        } catch (error) {
            console.log(error);
        }
    }

    const Eliminar = async id =>{
        try {
            await deleteDoc(doc(db,'Elemento',id));
        } catch (error) {
            console.log(error);
        }

    }

    const Editar = item =>{
        setelemento(item.nombreElemento);
        setdescripcion(item.nombreDescripcion);
        setapellido(item.nombreApellido);
        setpais(item.nombrePais);
        setcedula(item.numeroCedula);
        setnumero(item.numeroCelular);
        setedad(item.numeroEdad);
        setId(item.id);
        setEdicion(true);
    }

    const EditarElemento = async e =>{
        e.preventDefault();
        try {
            const docRef = doc(db,'Elemento',id);
            await updateDoc(docRef,{
                nombreElemento: elemento,
                nombreApellido: apellido,
                nombreDescripcion: descripcion,
                numeroCedula: cedula,
                numeroEdad: edad,
                numeroCelular: numero,
                nombrePais: pais, 
                img: Image,

            });
            const Array = Lista.map(
                item => item.id === id ? {
                    id:id, 
                    nombreElemento:elemento, 
                    nombreDescripcion:descripcion, 
                    nombreApellido:apellido, 
                    numeroCedula: cedula,
                    numeroEdad: edad,
                    numeroCelular: numero,
                    nombrePais: pais, 
                    img:Image, 
                }
                :
                item
            );
            setLista(Array);
            setelemento('');
            setapellido('');
            setnumero('');
            setedad('');
            setcedula('');
            setpais('');
            setdescripcion('');
            setId('');
            setEdicion(false);
        } catch (error) {
            console.log(error);
        }
    }
    const Cancelar = () =>{
        setEdicion(false);
        setelemento('');
        setdescripcion('');
        setapellido('');
        setpais('');
        setcedula('');
        setnumero('');
        setedad('');
        setId('');
    }

    return (
        <div className=" container mt-5">
            <h1 className="text-center">Crud Desarrollo</h1>
            <hr />
            <div className="row">
                <div className="col-8">
                    <h4 className="text-center">Listado Elementos</h4>
                    <ul className="list-group">
                        {
                            Lista.map(item => (
                                <li className="list-group-item" key={item.id}>
                                    <span className="lead font-size:200px"><img src={item.img} alt=''/> {item.nombreElemento} - {item.nombreApellido} 
                                    - {item.numeroCelular} - {item.numeroCedula} - {item.numeroEdad} - {item.nombrePais} -  {item.nombreDescripcion} </span>
                                    <button className="btn btn-danger btn-sm float-end mx-2" onClick={()=>Eliminar(item.id)}>Eliminar</button>
                                    <button className="btn btn-warning btn-sm float-end" onClick={()=> Editar(item)}>Editar</button>
                                </li>

                            ))
                        }
                    </ul>
                </div>
            <div className=" container col-4">
                <h4 className="text-center"> { Edicion ? 'Edicion Elemento':'Agregar Elemento'}</h4>
                <form onSubmit={ Edicion ? EditarElemento :  guardarElement}>
                    
                    <input type="text" className="form-control mb-2" placeholder="Registre el Nombre"  pattern="[a-zA-Z]+++" required value={elemento} onChange={(e)=>setelemento(e.target.value)}/>
                    <input type="text" className="form-control mb-2" placeholder="Registre el Apellido "  pattern="[a-zA-Z]+++" required value={apellido} onChange={(e)=>setapellido(e.target.value)}/>
                    <input type="number" className="form-control mb-2" placeholder="Digite su Numero de Celular" ondrop="return false;" onpaste="return false;"
                        onkeypress="return event.charCode>=48 && event.charCode<=57" required value={numero} onChange={(e)=>setnumero(e.target.value)}/>
                    <input type="number" className="form-control mb-2" placeholder="Digite su Numero  de Cedula" ondrop="return false;" onpaste="return false;"
                        onkeypress="return event.charCode>=48 && event.charCode<=57" required value={cedula} onChange={(e)=>setcedula(e.target.value)}/>
                    <input type="number" className="form-control mb-2" placeholder="Registre la Edad" ondrop="return false;" onpaste="return false;"
                        onkeypress="return event.charCode>=48 && event.charCode<=57" required value={edad} onChange={(e)=>setedad(e.target.value)}/>
                    <input type="text" className="form-control mb-2" placeholder="Registre Pais Origen"  pattern="[a-zA-Z]+++" required value={pais} onChange={(e)=>setpais(e.target.value)}/>
                    <input type="text" className="form-control mb-2" placeholder="Ingrese una Descripcion de la Persona" required value={descripcion} onChange={(e)=>setdescripcion(e.target.value)}/>
                    {
                        Edicion ?
                        (
                            <>
                           
                                <button className="btn btn-warning btn-block" on="submit">Editar</button>
                                <button className="btn btn-dark btn-block mx-2" onClick={()=>Cancelar()}>Cancelar</button>
                            
                            </>
                        )
                        :
                        
                            <button className="btn btn-primary btn-block" on="submit">Agregar</button>
                        
                        
                    }
                </form>
                </div>
            </div>
        </div>
    )
}

export default Formulario;
