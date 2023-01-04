import { Form, Spinner, Button } from 'react-bootstrap';
import { Formik, ErrorMessage } from "formik";
import * as Yup from 'yup';
import useFormEditPlayer from './useFormEditPlayer';
import './Players.css';

const EditPlayer = (submitForm) => {
    const { initialValues, validationSchema, onSubmit, error, isLoading, teamName } = useFormEditPlayer(submitForm)

    if (isLoading) {
        return (<Spinner animation="border" variant="primary" />)
    }
    if (error) {
        return <div>There was an error: {error}</div>
    }

    return (
        <div className="createPlayerPage">
            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({ values, errors, handleBlur, handleChange, handleSubmit }) => (
                    <Form className="formContainer" onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Team Name:</Form.Label>
                            <ErrorMessage name="team_name" component="span" />
                            <Form.Select
                                id="inputCreatePlayer"
                                name="team_name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.team_name}
                                isInvalid={!!errors.team_name}
                            >
                                <option label='Select Team'></option>
                                {teamName.map((id) => <option key={id} value={id}>{id}</option>)}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Name:</Form.Label>
                            <ErrorMessage name="name" component="span" />
                            <Form.Control
                                type="text"
                                autocomplete="off"
                                id="inputCreatePlayer"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                isInvalid={!!errors.name}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Position:</Form.Label>
                            <ErrorMessage name="position" component="span" />
                            <Form.Control
                                autocomplete="off"
                                id="inputCreatePlayer"
                                name="position"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.position}
                                isInvalid={!!errors.position}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Age:</Form.Label>
                            <Form.Control
                                autocomplete="off"
                                id="inputCreatePlayer"
                                name="age"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.age}
                                isInvalid={!!errors.age}
                            />
                            <ErrorMessage name="age" component="span" />
                        </Form.Group>
                        <Button variant="success" type="submit"> Edit Player</Button>
                        <Button variant="danger" href='/players'> Cancel </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default EditPlayer