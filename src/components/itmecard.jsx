import { Card, Button } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ItemCard = ({title, imgLink, email, password}) => {
  return (
    <Card style={{ width: '15rem', margin: '5px', height: '380px' }}>
        <Card.Img variant="top" src={imgLink} />
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
                {email}
            </Card.Text>
            <CopyToClipboard text={password}>
            <Button variant="primary">Copy Password</Button>
            </CopyToClipboard>
        </Card.Body>
    </Card>
  );
}

export default ItemCard;
