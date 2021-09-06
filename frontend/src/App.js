import React from 'react';
import axios from '../node_modules/axios/index';
import { useForm } from './hooks/useForm';
import './styles.css';

function App () {

    const [inputForm, handleForm] = useForm({
        title: '',
        url: '',
        numberChapter: ''
    });

    const { title, url, numberChapter } = inputForm;

    const handleSubmit = ( e ) => {

        e.preventDefault();

        axios.get( 'http://localhost:4000/api/devilnovel', {
            params: {
                title,
                url,
                numberChapter
            }
        })
            .then( data => {

                console.log( data );

            });

    };

    return (
        <form className="container">
            <h1> Epub App </h1>
            <select className="form-select" name="paginas">
                <option value="Devilnovels"> Devilnovels </option>
            </select>
            <input
                className="form-control"
                type="text"
                placeholder="URL of the initial chapter"
                value={ url }
                name="url"
                onChange={ handleForm }
            />
            <input
                className="form-control"
                type="number"
                min="0"
                placeholder="Number of chapter to download"
                value={ numberChapter }
                name="numberChapter"
                onChange={ handleForm }
            />
            <input
                className="form-control"
                type="text"
                placeholder="Title of epub"
                value={ title }
                name="title"
                onChange={ handleForm }
            />
            <input
                type="submit"
                className="btn btn-primary"
                value="Descargar"
                onClick={ handleSubmit }
            />
        </form>
    );

}

export default App;
