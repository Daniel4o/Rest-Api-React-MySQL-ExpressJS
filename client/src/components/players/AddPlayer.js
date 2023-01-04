import { Form, Spinner, Button } from 'react-bootstrap';
import { Formik, ErrorMessage } from "formik";
import useFormAddPlayer from './useFormAddPlayer';
import './Players.css';

const AddPlayer = (submitForm) => {
    const { initialValues, validationSchema, onSubmit, error, isLoading, teamName } = useFormAddPlayer(submitForm)

    if (isLoading) {
        return (<Spinner animation="border" variant="primary" />)
    }
    if (error) {
        return <div>There was an error: {error}</div>
    }

    return (
        <div className="createPlayerPage">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({ values, errors, handleBlur, handleChange, handleSubmit }) => (
                    <Form className="formContainer" onSubmit={handleSubmit}>
                        <Form.Group >
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
                        <Form.Group >
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
                        <Form.Group >
                            <div> <Form.Label>Position:</Form.Label></div>
                            <ErrorMessage name="position" component="span" />
                            <Form.Control
                                type="text"
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
                            <ErrorMessage name="age" component="span" />
                            <Form.Control
                                autocomplete="off"
                                id="inputCreatePlayer"
                                name="age"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.age}
                                isInvalid={!!errors.age}
                            />
                        </Form.Group>
                        <Button variant="success" type="submit"> Create Player </Button>
                        <Button variant="danger" href='/players' className='edit'>Cancel</Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default AddPlayer