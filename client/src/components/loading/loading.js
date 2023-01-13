import { Container, Spinner } from "react-bootstrap";

const Loading = (isLoading, error) => {
 
    if (isLoading) {
        return (
            <Container className="content">
                <Spinner className="center" animation="border" variant="primary" />
            </Container>
        )
    }

    if (error != null) {
        return <Container className="content">
            <h3>There was an error: {error}</h3>
        </Container>
    }
}

export default Loading;
