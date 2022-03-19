import Product from '../../models/Product';
import {v4 as uuid} from "uuid";

const initialState = []


const productsReducer = (state = initialState, action) => {
    switch (action.type){
        case "FETCH_PRODUCTS":
            const data = action.payload.documents.map((document) => {
                const title = document.fields.title.stringValue;
                const description = document.fields.description.stringValue;
                const imageUrl = document.fields.imageUrl.stringValue;
                const price = document.fields.price.doubleValue;


                return new Product(uuid(),title, imageUrl, description, price )
            })

            return data;

        default:
            return state
    }
}


export default productsReducer;