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

// Se usa useEddect y se crea un metodo para obtener los datos de firebase
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
       //console.log(Lista);
    },[]);

    const guardarElement = async (e) =>  {
        e.preventDefault();
       //const Image='https://picsum.photos/40'; 
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
}