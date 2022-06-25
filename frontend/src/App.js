import React from 'react';
import axios from '../node_modules/axios/index';

import { useForm } from './hooks/useForm';
import './styles.css';

function App () {

    const [inputForm, handleForm] = useForm({
        title: '',
        servidor: '',
        url: '',
        numberChapter: ''
    });

    const { title, url, numberChapter, servidor } = inputForm;

    console.log( servidor );

    const handleSubmit = ( e ) => {

        e.preventDefault();

        axios({
            url: `${process.env.REACT_APP_URL}/api/novelasligeras`,
            method: 'GET',
            params: {
                title,
                url,
                numberChapter
            },
            responseType: 'blob'
        })
            .then( ( response ) => {

                const newUrl = window.URL.createObjectURL( new Blob([response.data]) );
                const link = document.createElement( 'a' );
                link.href = newUrl;
                link.setAttribute( 'download', `${title}.epub` ); // or any other extension
                document.body.appendChild( link );
                link.click();

            })
            .catch( ( error ) => {

                console.log( error );

            });

    };

    return (
        <form className="container">
            <h1> Epub App </h1>
            <select className="form-select" name="servidor">
                <option value="devilnovel"> Devilnovels </option>
                <option value="novelasligeras"> Novelas Ligeras </option>
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
