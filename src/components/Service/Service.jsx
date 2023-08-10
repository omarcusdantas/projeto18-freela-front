import { Container, Text, Check } from "./style";
import checkImg from "../../assets/check.png";
import { useState } from "react";

export default function Service(props) {
    const { info, type } = props;
    const [isWaiting, setIsWaiting] = useState(false);

    function handleStatus() {
        alert("oi");
    }

    return (
        <Container private={type==="private"? true : false}>
            <img src={info.image} />
            <Text>
                <h3>{info.title}</h3>
                {type === "private" ? (
                    <div>
                        <p>{info.category}</p>
                        <p>${info.price}</p>
                    </div>
                ) : (
                        <div>
                            <p>{info.state}</p>
                            <p>{info.city}</p>
                        </div>
                )}
            </Text>
            {type === "private" ? (
                    <>
                        <div>
                            <p>Active?</p>
                            <Check onClick={handleStatus} active={info.active} disabled={isWaiting}>
                                {isWaiting ? <TailSpin width="40" radius="0" color="#ffffff" /> : <img src={checkImg} alt="Check" />}
                            </Check>
                        </div>
                        <div>
                            <p>{info.description}</p>
                        </div>
                    </>
                ) : null}
        </Container>
    );
}
