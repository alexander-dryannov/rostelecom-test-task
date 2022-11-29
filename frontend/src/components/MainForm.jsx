import axios from 'axios'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

function MainForm() {
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        telephone: '',
        text: ''
    })
    
    const handleChange = name => e => {
    setValues({ ...values, [name]: e.target.value })
    };
    
    const handlerSubmit = async (event) => {
    event.preventDefault()
    const data = JSON.stringify(values)
    axios.defaults.headers = {'Content-Type': 'application/json'}
    const response = await axios.post('http://127.0.0.1:8888/processing', data)
    }

    return(
        <Form onSubmit={handlerSubmit} className="form mx-auto">
            <h2 className='text-center mb-5'>Форма для обращений граждан</h2>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Фамилия</Form.Label>
                <Form.Control type="text" placeholder="Фамилия" value={values.lastName} onChange={handleChange('lastName')} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Имя</Form.Label>
                <Form.Control type="text" placeholder="Имя" value={values.firstName} onChange={handleChange('firstName')} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Отчество</Form.Label>
                <Form.Control type="text" placeholder="Отчество" value={values.middleName} onChange={handleChange('middleName')} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Телефон</Form.Label>
                <Form.Control type="tel" placeholder="Телефон" maxLength={10} value={values.telephone} onChange={handleChange('telephone')} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Обращение</Form.Label>
                <Form.Control as="textarea" placeholder="Обращение" rows={5} value={values.text} onChange={handleChange('text')} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Отправить
            </Button>
        </Form>
    )
}

export default MainForm