import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ItemForm from './ItemForm';
import { Container } from 'reactstrap';

function EditBill({bills, setBills}) {
    const {billID} = useParams();
    const [bill, setBill] = useState({});
    const [isBillValid, setIsBillValid] = useState(false);
    useEffect(()=>{
        if(bills[billID]){
            setIsBillValid(true);
            console.log(bills[billID]);
        }else{
            console.table({"Invalid Bill": bills[billID]})
        }
    }, [bills, billID]);
    return (
        <div>
            <Container>
                <ItemForm />
            </Container>
        </div>
    )
}

export default EditBill
