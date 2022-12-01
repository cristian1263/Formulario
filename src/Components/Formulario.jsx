import React,{useState,useEffect} from "react";
import {db} from '../Firebase';
import {collection , doc , addDoc, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";

const Formulario = () => {
    const[Elemento, setElemento] = useState('');
    const[Apellido, setApellido] = useState('');
    const[Numero, setNumero] = useState('');
    const[Descripcion, setDescripcion] = useState('');
    const[Pais, setPais] = useState('');
    const[Cedula, setCedula] = useState('');
    const[Edad, setEdad] = useState('');
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
}