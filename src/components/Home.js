import React, { useState } from 'react'
import { Button, TabContent, TabPane, Badge, Container, Modal, ModalHeader, ModalBody} from 'reactstrap'
import {wrapper, navBar} from '../styles/home.module.css';
import NewBillForm from './NewBillForm';
import uniqid from 'uniqid'
import AllBills from './AllBills';
import AllPeople from './AllPeople';

function Home({people, setPeople, bills, setBills, peopleMap, setPeopleMap}) {
    // STATES RELATED TO UI
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("1");

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const toggleTab = (tab) => {
        if(activeTab !== tab) setActiveTab(tab);
    }


    const createNewBill = (billName, peopleInvolved) => {
        // HIDE THE FORM
        setIsModalOpen(false);
        
        const billId = uniqid();
        // console.log("BillMap:", billMap);
        // const billMapNew = new Map(billMap);
        // console.log("PeopleMap:",peopleMap);
        const peopleMapNew = new Map(peopleMap);
        
        // ADDING PEOPLE
        const peopleNew = {...people};
        for(const i in peopleInvolved) {
            let personId;
            if(peopleMapNew.has(peopleInvolved[i])){
                personId = peopleMapNew.get(peopleInvolved[i]);
                peopleNew[personId].bills.push({id: billId, name: billName})
            }else{
                personId = uniqid();
                peopleNew[personId] = {
                    name: peopleInvolved[i],
                    paid: 0,
                    owes: 0,
                    bills: [{id: billId, name: billName}]
                }
                peopleMapNew.set(peopleInvolved[i], personId);
            }
        }
        console.log("People", peopleNew);
        setPeopleMap(peopleMapNew);
        setPeople(peopleNew);

        // ADDING BILL
        const getPeopleAsObject = () => {
            let obj = {};
            let personId;
            for(const i in peopleInvolved){
                personId = peopleMapNew.get(peopleInvolved[i])
                obj = {
                    ...obj,
                    [personId]: {
                        name: peopleInvolved[i],
                        paid: 0,
                        owes: 0,
                        items: {
                            paidByMe: [],
                            paidForMe: [],
                        }
                    }
                }
            }
            return obj;
        }

        const bill = {
            id: billId,
            name: billName,
            date: new Date().toISOString(),
            brief: {
                paid: 0,
                owes: 0,
            },
            details: {
                items: {},
                people: getPeopleAsObject()
            },
        }
        // billMapNew.set(billName, billId);
        const billsNew = {...bills, [billId]: bill};
        console.log("Bills", billsNew);
        // console.log("Bill Map:", billMapNew)
        // setBillMap(billMapNew);
        setBills(billsNew);
    }

    return (
        <div className={`${wrapper}`}>
            <div>
                <nav className={`${navBar}`}>
                    <div className="navItem" onClick={()=>{toggleTab("1")}}
                        style={activeTab === "1" ? {borderBottom: '2px solid var(--primary)', color: 'var(--primary)'}: {}}
                    >Bills <Badge color={activeTab === "1" ? 'primary': 'secondary'}>{0}</Badge>
                    </div>
                    <div className="navItem" onClick={()=>{toggleTab("2")}}
                        style={activeTab === "2" ? {borderBottom: '2px solid var(--primary)', color: 'var(--primary)'}: {}}
                    >People <Badge color={activeTab === "2" ? 'primary': 'secondary'}>{peopleMap.size}</Badge>
                    </div>
                </nav>
                <Modal isOpen={isModalOpen} toggle={toggleModal} centered>
                    <ModalHeader toggle={toggleModal}>New Bill</ModalHeader>
                    <ModalBody>
                        <NewBillForm createNewBill={createNewBill} people={peopleMap} />
                    </ModalBody>
                </Modal>
            </div>
            <div>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId={"1"}>
                        <Container>
                            <AllBills bills={bills} meID={peopleMap.get("me")} />
                        </Container>
                    </TabPane>
                    <TabPane tabId={"2"}>
                        <Container>
                            <AllPeople people={people}/>
                        </Container>
                    </TabPane>
                </TabContent>
            </div>
            <div>
                <Button color="primary" onClick={toggleModal} className="btn-block">Add Bill</Button>
            </div>
        </div>
    )
}

export default Home
