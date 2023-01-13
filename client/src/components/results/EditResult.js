import { Form, Button } from 'react-bootstrap';
import { Formik, ErrorMessage } from "formik";
import useFormEditResult from './useFormEditResult';
import Loading from '../loading/loading';
import './Results.css';

const EditResult = (submitForm) => {
    const { validationSchema, initialValues, error, isLoading, hostName, guestName, onSubmit } = useFormEditResult(submitForm);

    if (isLoading || error != null) {
        return Loading(isLoading, error);
    }

    return (
        <div className="createResultPage">
            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({ values, errors, handleBlur, handleChange, handleSubmit }) => (
                    <Form className="formContainer" onSubmit={handleSubmit}>
                        <Form.Group md="4">
                            <Form.Label>Host Name: </Form.Label>
                            <Form.Select
                                id="inputCreateResult"
                                name="host_name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.host_name}
                                isInvalid={!!errors.host_name}
                            >
                                <option label='Select a Host'></option>
                                {hostName.map((id) => <option key={id} value={id}>{id}</option>)}
                            </Form.Select>
                            <ErrorMessage name="host_name" component="span" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Guest Name:</Form.Label>
                            <Form.Select
                                id="inputCreateResult"
                                name="guest_name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.guest_name}
                                isInvalid={!!errors.guest_name}
                            >
                                <option label='Select a Guest'></option>
                                {guestName.map((id) => <option key={id} value={id}>{id}</option>)}
                            </Form.Select>
                            <ErrorMessage name="guest_name" component="span" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Home Goals:</Form.Label>
                            <Form.Control
                                autocomplete="off"
                                id="inputCreateResult"
                                name="home_goals"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.home_goals}
                                isInvalid={!!errors.home_goals}
                            />
                            <ErrorMessage name="home_goals" component="span" />
                        </Form.Group>
                        <Form.Group>
                         <Form.Label>Away Goals: </Form.Label>
                            <Form.Control
                                autocomplete="off"
                                id="inputCreateResult"
                                name="away_goals"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.away_goals}
                                isInvalid={!!errors.away_goals}
                            />
                            <ErrorMessage name="away_goals" component="span" />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Date:</Form.Label>
                            <Form.Control
                                type="date"
                                autocomplete="off"
                                id="inputCreatePlayer"
                                name="date"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.date}
                                isInvalid={!!errors.date}
                            />
                            <ErrorMessage name="date" component="span" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Venue: </Form.Label>
                            <Form.Control
                                autocomplete="off"
                                id="inputCreateResult"
                                name="venue"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.venue}
                                isInvalid={!!errors.venue}
                            />
                            <ErrorMessage name="venue" component="span" />
                        </Form.Group>
                        <Button variant="success" type="submit"> Edit Result</Button>
                        <Button variant="danger" href={'/results'}>Cancel</Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default EditResult;