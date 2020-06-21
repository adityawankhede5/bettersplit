import React, { useEffect, useState } from 'react'
import { Row, Col, Badge, Button } from 'reactstrap'
import { Link } from 'react-router-dom';

function Bill({bill, meID}) {
    const getPeople = () => {
        const people = Object.values(bill.details.people);
        return people.map((person)=>{
            return <Badge style={{fontSize: 'small', margin: '2px'}} color="info" key={person.name}>{person.name}</Badge>
        })
    }
    const me = bill.details.people[meID];
    const paid = me ? me.paid : 0;
    const owes = me ? me.owes : 0;
    return (
        <Col xs={12} md={6} className="my-1">
            <div className="border rounded">
                <div className="p-2 py-3 bg-light">
                    <div style={{fontSize: 'x-large', fontWeight: 'bold'}}>{bill.name}</div>
                    <div style={{fontSize: 'small', color: 'var(--secondary)'}}>{new Date(bill.date).toDateString()}</div>
                    <Row>
                        <Col className="border-right">
                            <div style={{fontWeight: 'bold'}}>{paid}</div>
                            <div style={{fontSize: 'x-small', color: 'var(--secondary)'}}>paid</div>
                        </Col>
                        <Col className="border-right">
                            <div style={{fontWeight: 'bold'}}>{owes}</div>
                            <div style={{fontSize: 'x-small', color: 'var(--secondary)'}}>owes</div>
                        </Col>
                        <Col style={{color: paid-owes<0 ? 'var(--danger)' : 'var(--success)'}}>
                            <div style={{fontWeight: 'bold'}}>{paid-owes}</div>
                            <div style={{fontSize: 'x-small', color: 'var(--secondary)'}}>total</div>
                        </Col>
                    </Row>
                </div>
                <div className="p-2">
                    <div>
                        <span style={{fontSize: 'x-large', marginRight: '5px'}}>
                            <svg className="bi bi-people" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.995-.944v-.002.002zM7.022 13h7.956a.274.274 0 0 0 .014-.002l.008-.002c-.002-.264-.167-1.03-.76-1.72C13.688 10.629 12.718 10 11 10c-1.717 0-2.687.63-3.24 1.276-.593.69-.759 1.457-.76 1.72a1.05 1.05 0 0 0 .022.004zm7.973.056v-.002.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10c-1.668.02-2.615.64-3.16 1.276C1.163 11.97 1 12.739 1 13h3c0-1.045.323-2.086.92-3zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                            </svg>
                        </span>
                        {getPeople()}
                    </div>
                </div>
                <div className="p-1 d-flex justify-content-end">
                    <Button className="m-1" size="sm" color="primary">
                        <svg className="bi bi-eye" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.134 13.134 0 0 0 1.66 2.043C4.12 11.332 5.88 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0 0 14.828 8a13.133 13.133 0 0 0-1.66-2.043C11.879 4.668 10.119 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 0 0 1.172 8z"/>
                            <path fillRule="evenodd" d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                        </svg>
                        {" "}
                        View
                    </Button>
                    <Link to={"/"+bill.id}>
                    <Button className="m-1" size="sm" color="success">
                        <svg className="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>
                            <path fillRule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>
                        </svg>
                        {" "}
                        Edit
                    </Button>
                    </Link>
                </div>
            </div>
        </Col>
    )
}



function AllBills(props) {

    const [bills, setBills] = useState([]);

    useEffect(()=>{
        setBills(Object.values(props.bills));
    }, [props.bills])

    return (
        <Row>
            {bills.map((bill, i) => <Bill bill={bill} key={bill.name + i} meID={props.meID} setSelectedBill={props.setSelectedBill} />)}
        </Row>
    )
}

export default AllBills
