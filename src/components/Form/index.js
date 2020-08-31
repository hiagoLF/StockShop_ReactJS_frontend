import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './styles.css'
import baseApi from '../../services/baseApi'

export default class FormElement extends Component {
    previewImg = () => {
        const urlOfPreview = document.querySelector('input[name=image]').value
        document.getElementById('img-preview').src = urlOfPreview
    }

    UpDate = async () => {
        const title = document.querySelector('input[name="title"]').value
        const price = document.querySelector('input[name="price"]').value
        const stock = document.querySelector('input[name="stock"]').value
        const image = document.querySelector('input[name="image"]').value

        const response = await baseApi.post('/products', {title, price, stock, image})
    }

    
    render(){
        return (
            <div id='form-page'>
                <div id='link-content'>
                    <Link className='link-element' to='/'>Voltar</Link>
                </div>
                <form action='#'>
                    <fieldset>
                        <legend>Cadastrar novo produto</legend>
                        
                        <div className='formValue'>
                            <label htmlFor='title'>Nome do produto</label>
                            <input type='text' name='title'></input>
                        </div>
                        <div className='formValue'>
                            <label htmlFor='price'>Preço</label>
                            <input type='text' name='price' placeholder='R$'></input>
                        </div>
                        <div className='formValue'>
                            <label htmlFor='stock'>Estoque</label>
                            <input type='text' name='stock' placeholder='unidades'></input>
                        </div>
                        <div className='formValue'>
                            <label htmlFor='image'>Imagem</label>
                            <input type='text' name='image' placeholder='url'></input>
                            <button type='button' onClick={this.previewImg} >Preview</button>
                            <img id='img-preview'></img>
                        </div>
                        <button type='submit' onClick={this.UpDate}>Enviar</button>
                    </fieldset>
                </form>
            </div>
        )
    }
}