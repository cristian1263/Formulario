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
    const Image = ('https://picsum.photos/40');
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
}