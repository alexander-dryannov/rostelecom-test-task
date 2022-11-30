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

    const [isValidF, setIsValidF] = useState({
        firstName: false,
        lastName: false,
        middleName: false,
        telephone: false,
        text: false
    })

    const checkValidForm = () => {
        return Object.values(isValidF).every(field => field === true)
    }

    const validField = (e, len, name) => {
        if (e.target.value.length >= len) {
            setIsValidF({ ...isValidF, [name]: true })
        } else {
            setIsValidF({ ...isValidF, [name]: false })
        }
    }

    const handleChangeTextField = name => e => {
        setValues({ ...values, [name]: e.target.value })
        if (!values.text) {
            validField(e, 3, name)
        } else {
            validField(e, 100, name)
        }
    }

    const handleChangeNumberField = name => e => {
        if (!isNaN(parseInt(e.target.value))) {
            setValues({ ...values, [name]: Number(e.target.value) })
            validField(e, 10, name)
        } else {
            setValues({ ...values, [name]: '' })
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (checkValidForm()) {
            axios.defaults.headers = {'Content-Type': 'application/json'}
            await axios.post('http://127.0.0.1:8888/processing', values)
        }
    }
    return(
        <>
            <Form onSubmit={handleSubmit} className="form mx-auto">
                <h2 className='text-center mb-5'>Форма для обращений граждан</h2>
                <Form.Group className="mb-3" controlId="formLastName">
                    <Form.Label>Фамилия</Form.Label>
                    <Form.Control type="text" placeholder="Фамилия" value={values.lastName} onChange={handleChangeTextField('lastName')}
                    isValid={isValidF.lastName} isInvalid={!isValidF.lastName} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>Имя</Form.Label>
                    <Form.Control type="text" placeholder="Имя" value={values.firstName} onChange={handleChangeTextField('firstName')}
                    isValid={isValidF.firstName} isInvalid={!isValidF.firstName} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formMiddleName">
                    <Form.Label>Отчество</Form.Label>
                    <Form.Control type="text" placeholder="Отчество" value={values.middleName} onChange={handleChangeTextField('middleName')}
                    isValid={isValidF.middleName} isInvalid={!isValidF.middleName} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formTelephone">
                    <Form.Label>Телефон</Form.Label>
                    <Form.Control type="tel" placeholder="Телефон" maxLength={10} value={values.telephone} onChange={handleChangeNumberField('telephone')}
                    isValid={isValidF.telephone} isInvalid={!isValidF.telephone} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formText">
                    <Form.Label>Обращение</Form.Label>
                    <Form.Control as="textarea" placeholder="Обращение" rows={5} value={values.text} onChange={handleChangeTextField('text') }
                    isValid={isValidF.text} isInvalid={!isValidF.text} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Отправить
                </Button>
            </Form>
        </>
    )
}

export default MainForm