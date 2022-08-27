import { getDocs, collection, query, where } from 'firebase/firestore'
import { db } from '.'
import { createAdaptedProductFromFirestore } from '../../adapters/productAdapter'

export const getProducts = (categoryId) => {
     const collectionRef = !categoryId 
            ? collection(db, 'products')
            : query(collection(db, 'products'), where('category', '==', categoryId))

        return getDocs(collectionRef).then(response => {
            const products = response.docs.map(doc => {
                return createAdaptedProductFromFirestore(doc)
            })
            return products
        }).catch(error => {
            return error
        })
}
