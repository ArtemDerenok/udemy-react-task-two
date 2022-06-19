import { Formik, Form, Field, ErrorMessage } from 'formik';
import useMarvelService from '../../services/MarvelService';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import * as Yup from 'yup';
import './charSearchForm.scss';
import { useState } from 'react';

const CharSearchForm = () => {
  
  const {loading, getCharacterByName} = useMarvelService();
  const [char, setChar] = useState({});

  const onCharLoaded = (char) => {
    setChar(char);
  }
  
  const updateChar = (name) => {
    getCharacterByName(name).then(onCharLoaded);
  }
  
  const spinner = loading ? <Spinner /> : null;
;  
  return (
    <div className='char__search-form'>
       <Formik 
      initialValues ={{name: ''}} 
      validationSchema = {Yup.object({
        name: Yup.string().min(2, 'Must be 2 characters or more').required('Required'),
      })}
      onSubmit = {(values) => {
        updateChar(values.name);
      }}
      >
      <Form>
        <label htmlFor='name' className='char__search-label'>Or find a character by name:</label>
        {spinner}
        <div className='char__search-wrapper'>
            <Field type='text' name='name' id='name' placeholder='Enter name' />
            <button className='button button__main' disabled={loading}><div className='inner'>find</div></button>
        </div>
        <ErrorMessage name='name' component='div' className='char__search-error' />
        {char === false ? <div className='char__search-error'>The character was not found. Check the name and try again</div> : null}
      </Form>
    </Formik>
      <div className='char__search-wrapper'>
          {char.name ?  <div className='char__search-success'>{`There is! Visit ${char.name} page?`}</div> : null}
          {char.name ? <Link to={`/characters/${char.id}}`} className='button button__secondary'><div className='inner'>to page</div></Link> : null}
      </div>
    </div>
  )
};

export default CharSearchForm;
