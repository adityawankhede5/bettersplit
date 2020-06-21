import React, { useState } from 'react'
import { Form, FormGroup, InputGroup, Input, Button } from 'reactstrap';

function ItemForm() {
    const [itemName, setItemName] = useState('')
    const [itemAmount, setItemAmount] = useState('');
    
    
    const handleItemNameSubmission = (event) => {
        event.preventDefault();
        console.log(itemName, itemAmount);
    }

    return (
        <div>
            <Form onSubmit={handleItemNameSubmission}>
                <FormGroup>
                    <InputGroup>
                        <Input type="text" placeholder="Item Name"
                            value={itemName}
                            onChange={(e)=>{setItemName(e.target.value)}} />
                        <Input type="number" placeholder="Amount"
                            value={itemAmount}
                            onChange={(e)=>{setItemAmount(e.target.value)}} />
                        <Button type="submit" color="dark">Add</Button>
                    </InputGroup>
                </FormGroup>
            </Form>
        </div>
    )
}

export default ItemForm
