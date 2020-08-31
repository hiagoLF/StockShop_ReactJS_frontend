import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import baseApi from '../../services/baseApi'
import './styles.css'

export default class UpdateProduct extends Component {
    search = async (event) => {
        const searchValue = document.getElementById('search-input').value
        const response = await baseApi.get(`/search/${searchValue}`)
        const {data} = response

        document.querySelector('input[name="id"]').value = data._id
        document.querySelector('input[name="title"]').value = data.title
        document.querySelector('input[name="price"]').value = data.price
        document.querySelector('input[name="stock"]').value = data.stock
        document.querySelector('input[name="image"]').value = data.image
    }

    remove = async () => {
        const idOfDelete = document.querySelector('input[name=id]').value
        console.log(idOfDelete)
        await baseApi.post('/delete', {id: idOfDelete})

        const allInputs = document.querySelectorAll('input')

        console.log(allInputs.length)
        for(var i=0; i<allInputs.length; i++){
            allInputs[i].value = ''
        }
    }

    previewImg = async () => {
        const urlImage = document.querySelector('input[name=image]').value
        console.log(urlImage)
        document.getElementById('imgPreview').src = urlImage
    }

    UpDate = async () => {
        const id = document.querySelector('input[name="id"]').value
        const title = document.querySelector('input[name="title"]').value
        const price = document.querySelector('input[name="price"]').value
        const stock = document.querySelector('input[name="stock"]').value
        const image = document.querySelector('input[name="image"]').value

        const response = await baseApi.post('/productsupdate', {id, title, price, stock, image})
    }
    
    render(){
        return (
            <div id='form-page'>
                <div id='link-content' >
                    <Link className='link-element' to='/'>Página Inicial</Link>
                </div>
                <div id='get-product'>
                    <label>Produto</label>
                    <input id='search-input'></input>
                    <button onClick={this.search}>Buscar</button>
                </div>
                <form action='#'>
                    <fieldset>
                        <legend>Atualizar Produto</legend>

                        <div className='form-value'>
                            <label htmlFor='id'>ID</label>
                            <input name='id'></input>
                        </div>
                        <div className='form-value'>
                            <label htmlFor='title'>Produto</label>
                            <input name='title'></input>
                        </div>
                        <div className='form-value'>
                            <label htmlFor='price'>Valor</label>
                            <input name='price'></input>
                        </div>
                        <div className='form-value'>
                            <label htmlFor='stock'>Estoque</label>
                            <input name='stock'></input>
                        </div>
                        <div className='form-value'>
                            <label htmlFor='image'>Imagem</label>
                            <input name='image'></input>
                            <button type='button' onClick={this.previewImg}>Preview</button>
                            <img id='imgPreview'></img>
                        </div>
                        <div id='button-div'>
                            <button type='submit' onClick={this.UpDate}>Atualizar</button>
                            <button id='remove-button' onClick={this.remove}>Remover</button>
                        </div>
                    </fieldset>

                </form>
            </div>
        )
    }
}