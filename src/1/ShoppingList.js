import { AppBar, Container, List, ListItem, ListItemText, Stack, Toolbar, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import AddItem from "./AddItem";

const ShoppingList = () => {

    const [items, setItems] = useState([]);

    const addItems = (item) => {
        setItems([item, ...items]);
    }

    useEffect(() => {
        console.log(items)
    }, [items])

    return (
        <div>
            <Container>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            Shopping List
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Stack alignItems="center">
                    <AddItem addItems={addItems} />
                    <List>
                        {
                            items.map((item, idx) =>
                                <ListItem key={idx} divider>
                                    <ListItemText
                                        primary={item.product}
                                        secondary={item.amount} />
                                </ListItem>
                            )
                        }
                    </List>
                </Stack>
            </Container>
        </div>
    )
}

export default ShoppingList
