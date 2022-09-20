import { useContext } from "react"
import { CartContext } from '../../context/CartContext'
import { addDoc, collection, Timestamp,  getDocs, query, where, documentId, writeBatch } from 'firebase/firestore'
import { db } from '../../services/firebase/index'
import { useForm } from "react-hook-form";  
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './Checkout.css'


const Checkout = () => {
    const { cart, clearCart, total } = useContext(CartContext)  
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const MySwal = withReactContent(Swal)

    const createOrder = async (data) => {
        console.log(data)
        try {
            const objOrder = {
                buyer: {
                    name: data.firstName,
                    lastName: data.LastName,
                  mail: data.mail
                },
                items: cart,
                total,
                date: Timestamp.fromDate(new Date())
            }

            const ids = cart.map(prod => prod.id)

            const productsRef = collection(db, 'products')

            const productsAddedFromFirestore = await getDocs(query(productsRef, where(documentId(), 'in', ids)))
            
            const { docs } = productsAddedFromFirestore

            const outOfStock = []

            const batch = writeBatch(db)

            docs.forEach(doc => {
                const dataDoc = doc.data()
                const stockDb = dataDoc.stock

                const productAdded = cart.find(prod => prod.id === doc.id)
                const prodQuaantity = productAdded?.quantity

                if(stockDb >= prodQuaantity) {
                    batch.update(doc.ref, { stock: stockDb - prodQuaantity})
                } else {
                    outOfStock.push({ id: doc.id, ...dataDoc})
                }
            })

            if(outOfStock.length === 0) {
                const orderRef = collection(db, 'orders')
                const orderAdded = await addDoc(orderRef, objOrder)
                batch.commit()
                new MySwal({
                    title: 'Se genero tu orden!',
                    text: "Id de tu orden es = "+ orderAdded.id,
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                  })
                clearCart()
            } else {
                console.log('Hay productos fuera de stock')
            }
        } catch (error) {
            console.log(error)
        } finally {
            console.log('se termino la ejecucion de la funcion createOrder')
        }

    }

    return (
        <div className="containerForm">

        <form onSubmit={handleSubmit(createOrder)}>
           
            <input defaultValue="Tu nombre" {...register("firstName")} />
            
            <input defaultValue="Tu apellido" {...register("LastName")} />
            <input defaultValue="Tu mail" {...register("mail")} />
            
            <input type="submit" />
            </form>

{/* 
            <h1>Checkout</h1>
            <h2>Formulario</h2>
            <button className="Button" onClick={createOrder}>Generar Orden</button> */}
        </div>
    )
}

export default Checkout