import React, { useEffect, useState } from 'react'
import { Row, Col, Badge } from 'reactstrap'

function Person({person}) {
    const paid = person.paid;
    const owes = person.owes;
    const getBills = () => {
        const bills = person.bills;
        return bills.map(({name}, i)=>{
            return <Badge style={{fontSize: 'small', margin: '2px'}} color="info" key={name+i}>{name}</Badge>
        })
    }
    return (
        <Col xs={12} md={6} className="my-1">
            <div className="border rounded">
                <div className="p-2 py-3 bg-light">
                    <div style={{fontSize: 'x-large', fontWeight: 'bold'}}>{person.name}</div>
                    {/* <div style={{fontSize: 'small', color: 'var(--secondary)'}}>{new Date(bill.date).toDateString()}</div> */}
                    <Row>
                        <Col className="border-right">
                            <div style={{fontWeight: 'bold'}}>{paid}</div>
                            <div style={{fontSize: 'x-small', color: 'var(--secondary)'}}>paid</div>
                        </Col>
                        <Col className="border-right">
                            <div style={{fontWeight: 'bold'}}>{owes}</div>
                            <div style={{fontSize: 'x-small', color: 'var(--secondary)'}}>owes</div>
                        </Col>
                        <Col style={{color: owes-paid<0 ? 'var(--danger)' : 'var(--success)'}}>
                            <div style={{fontWeight: 'bold'}}>{owes-paid}</div>
                            <div style={{fontSize: 'x-small', color: 'var(--secondary)'}}>total</div>
                        </Col>
                    </Row>
                </div>
                <div className="p-2">
                    <div>
                        <span style={{fontSize: 'x-large', marginRight: '5px'}}>
                        <svg className="bi bi-receipt" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z"/>
                            <path fillRule="evenodd" d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                        </span>
                        {getBills()}
                    </div>
                </div>
            </div>
        </Col>
    )
}

function AllPeople(props) {

    const [people, setPeople] = useState([]);

    useEffect(()=>{
        setPeople(Object.values(props.people));
    }, [props.people])

    return (
        <Row>
            {people.map(person => <Person person={person} key={person.name}/>)}
        </Row>
    )
}

export default AllPeople
