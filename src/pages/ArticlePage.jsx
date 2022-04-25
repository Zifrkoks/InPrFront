import { observer } from "mobx-react";
import ArticleData from "../components/ArticleData";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";

const ArticlePage = observer(()=>{
    const params = useParams();
    return(
        <Container>
        <ArticleData id = {params.id} />
       </Container>
)

});

export default ArticlePage;