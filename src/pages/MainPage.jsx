import {Container,Carousel} from "react-bootstrap";
const MainPage = () => {
    return (
        <Container>
            <h1 class="text-xs-center" >Проект выполнен Архановым Яковом</h1>
            <Carousel>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src="/aspnet.jpg"
            height={450}
            width={800}
            alt="API был сделен на платформе"
            />
            
            <Carousel.Caption>
            </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
            <img
            className="d-block w-100"
            src="/react.png"
            height={450}
            width={800}
            alt="Frontend делался на"
            />

            <Carousel.Caption>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src="/bootstrap.jpg"
            alt="Помогал в оформлении frontend-части"
            height={450}
            width={800}
            />

            <Carousel.Caption>
            </Carousel.Caption>
        </Carousel.Item>
</Carousel>
        </Container>
    );
}

export default MainPage;