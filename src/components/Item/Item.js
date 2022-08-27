import './Item.css'
import { Link } from 'react-router-dom'


const Item = ({id, name, img, price}) => {

    return (
        <article className="CardItem">
             <picture>
                <img src={img} alt={name} className="ItemImg"/>
            </picture>
            <div className='container'>
            <header className="Header">
                <h2 className="ItemHeader">
                    {name}
                </h2>
            </header>
           
            <section>
                <p className="Info">
                    Precio: ${price}
                </p>
            </section>           
            <footer className='ItemFooter'>
                <Link to={`/detail/${id}`} className='Option'>Ver detalle</Link>
            </footer>
            </div>
        </article>
    )
}

export default Item