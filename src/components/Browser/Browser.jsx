import {
    Container,
    Divider,
    Typography,
} from "@mui/material";

const Browser = () => {

    localStorage.setItem('color','red');

    const color = localStorage.getItem('color');

    // localStorage.removeItem('number');

    // JSON.stringify(7);

    return ( 
        <Container maxWidth="lg" sx={{ py: 5 }}>
            <Typography>Browser {color}</Typography>
        </Container>
     );
}
 
export default Browser;