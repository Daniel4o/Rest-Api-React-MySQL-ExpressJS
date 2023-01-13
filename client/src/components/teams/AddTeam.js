import { Formik, ErrorMessage } from "formik";
import './Teams.css';
import { Form, Button, ButtonGroup, Container } from 'react-bootstrap';
import Loading from "../loading/loading";
import useFormAddTeam from './useFormAddTeam';

const AddTeam = (submitForm) => {
    const { initialValues, validationSchema, error, isLoading, onSubmit } = useFormAddTeam(submitForm);

    if (isLoading || error != null) {
        return Loading(isLoading, error);
    }

    return (
        <div className="createTeamPage">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({ values, errors, handleBlur, handleChange, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='formContainer' md="4">
                            <Form.Label>Team Name:</Form.Label>
                            <Form.Control
                                type="text"
                                autocomplete="off"
                                id="inputCreateTeam"
                                name="team_name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.team_name}
                                isInvalid={!!errors.team_name}
                            />
                            <ErrorMessage name="team_name" component="span" />
                            <Form.Label>Formation:</Form.Label>
                            <Form.Select
                                autocomplete="off"
                                id="inputCreateTeam"
                                name="formation"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.formation}
                                isInvalid={!!errors.formation}
                            >
                                <option label='Select Formation'></option>
                                <option value="4-4-2">4-4-2</option>
                                <option value="4-5-1">4-5-1</option>
                                <option value="4-3-3">4-3-3</option>
                                <option value="3-5-2">3-5-2</option>
                                <option value="4-2-2-3-1">4-2-3-1</option>
                                <option value="4-1-4-1">4-1-4-1</option>
                                <option value="4-4-1-1">4-4-1-1</option>
                                <option value="3-4-3">3-4-3</option>
                                <option value="3-5-1-1">3-5-1-1</option>
                            </Form.Select>
                            <ErrorMessage name="formation" component="span" />
                            <ButtonGroup className='buttonGroupTeams'>
                                <Button className="block-example border border-dark" variant="success" type="submit">Create Team</Button>
                                <Button className="block-example border border-dark" variant="danger" href='/teams'>Cancel</Button>
                            </ButtonGroup>
                        </Form.Group>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default AddTeam;