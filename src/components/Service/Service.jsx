import { Container, Text } from "./style";

export default function Service(props) {
    const { info } = props;

    return (
        <Container>
            <img src={info.image}/>
            <Text>
                <h3>{info.title}</h3>
                <div>
                    <p>{info.state}</p>
                    <p>{info.city}</p>
                </div>
            </Text>
        </Container>
    );
}
