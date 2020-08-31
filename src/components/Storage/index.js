import React, { Component } from 'react'
import baseApi from '../../services/baseApi'
import './styles.css'
import { Link } from 'react-router-dom'

export default class Storage extends Component {
    state = {
        products: []
    }
    
    async componentDidMount(){
        const products = await baseApi.get('/products')
        this.setState({products: products.data})
        console.log(this.state.products)
    }

    searchProduct = () => {
        const searchTitle = document.querySelector('input[name="search-input"]').value
        var searchValue = ''
        const {products} = this.state

        for (var i=0; i<products.length; i++){
            if (products[i].title == searchTitle){
                searchValue = products[i]
                products.splice(i, 1)
                break
            }
        }
        if(searchValue != ''){
            products.unshift(searchValue)
        }

        this.setState({products})

    }

    sell = async (id, stockCurrent) => {
        const amount = document.getElementById(id).value
        const stock = stockCurrent - amount

        const products = this.state.products
        for (var i=0; i<products.length; i++){
            if(products[i]._id === id){
                products[i].stock = stock
                break
            }
        }
        this.setState({products})

        const response = await baseApi.post('/productsupdate', {id, stock})

        

    }
    
    render(){
        return (
            <div id='storage-component'>
                <div id='link-field'>
                    <Link className='link' to='/cadastro'>Cadastro</Link>
                    <Link className='link' to='/update'>Atualizar</Link>
                </div>
                <div className='search-field'>
                    <label htmlFor='seach-input'>Produto</label>
                    <input name='search-input'></input>
                    <button onClick={this.searchProduct}>Buscar</button>
                </div>
                <div className='storage-field'>
                    { this.state.products.map( (item) => {
                        return (
                            <div className='item-product'>
                                <img src={item.image}></img>
                                <h2>{item.title}</h2>
                                <p>R${item.price}</p>
                                <p>Estoque: {item.stock}</p>
                                <div className='sale-field'>
                                    <label>Qtd</label>
                                    <input id={item._id} className='sale-input'></input>
                                    <button onClick={ () => {this.sell(item._id, item.stock)} }>Vender</button>
                                </div>
                            </div>
                        )
                    } ) }
                </div>
            </div>
        )
    }
}