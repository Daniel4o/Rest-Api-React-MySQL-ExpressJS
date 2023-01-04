import { Formik, ErrorMessage } from "formik";
import './Teams.css';
import { Form, Spinner, Button, ButtonGroup } from 'react-bootstrap'
import useFormAddTeam from './useFormAddTeam';

const AddTeam = (submitForm) => {
    const { initialValues, validationSchema, error, isLoading, onSubmit } = useFormAddTeam(submitForm);

    if (isLoading) {
        return (<Spinner animation="border" variant="primary" />)
    }
    if (error) {
        return <div>There was an error: {error}</div>
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
                            <ErrorMessage name="team_name" component="span" />
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