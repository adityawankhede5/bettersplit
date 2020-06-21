import React, { useState, useEffect } from 'react'
import { Form, FormGroup, InputGroup, Input, InputGroupAddon, Button, Badge, FormText } from 'reactstrap'

function NewBillForm(props) {
    const [existingPeople, setExistingPeople] = useState([]);
    const [people, setPeople] = useState([]);
    const [newPerson, setNewPerson] = useState('');
    const [personNameInvalidError, setPersonNameInvalidError] = useState("")
    const [newBill, setNewBill] = useState('');
    const [billNameInvalidError, setBillNameInvalidError] = useState("");

    function handleAddNewPerson(event) {
        const name = newPerson.trim();
        event.preventDefault();
        if (name === "") setPersonNameInvalidError("Cannot be empty")
        else if (existingPeople.includes(name)) setPersonNameInvalidError("Already exists. Select from below")
        else {
            setPersonNameInvalidError("");

            const newPeopleState = people.map(person => person);
            newPeopleState.push({ name: name, isIncluded: true });
            setPeople(newPeopleState);

            const newExistingPeopleState = existingPeople.map(person => person);
            newExistingPeopleState.push(name);
            setExistingPeople(newExistingPeopleState)

            setNewPerson("");
        }
    }

    function handleCreateNewBill(event) {
        event.preventDefault();
        const name = newBill.trim();
        if (name === "") setBillNameInvalidError("Cannot be empty")
        else {
            setBillNameInvalidError("");
            const involvedPeople = [];
            for (const person in people) {
                if (people[person].isIncluded) involvedPeople.push(people[person].name);
            }
            // console.log(involvedPeople);
            props.createNewBill(newBill, involvedPeople);
            setNewBill("")
        }
    }


    function togglePersonState(index) {
        const peopleNew = people.map(person => person);
        peopleNew[index].isIncluded = !peopleNew[index].isIncluded;
        setPeople(peopleNew);
    }

    useEffect(() => {
        const peopleNew = [];
        const existingPeopleNew = [];
        for (const person of props.people.keys()) {
            existingPeopleNew.push(person);
            peopleNew.push({ name: person, isIncluded: false });
        }
        setExistingPeople(existingPeopleNew);
        setPeople(peopleNew);
    }, [props.people]);

    return (
        <React.Fragment>
            <Form onSubmit={handleAddNewPerson}>
                <FormGroup>
                    <InputGroup>
                        <Input type="text" placeholder="Person Name"
                            value={newPerson}
                            onChange={(e) => { setNewPerson(e.target.value) }}
                            invalid={personNameInvalidError !== ""}
                        />
                        <InputGroupAddon addonType="append">
                            <Button type="submit" color="dark">Add</Button>
                        </InputGroupAddon>
                    </InputGroup>
                    <FormText color={"danger"}>{personNameInvalidError}</FormText>
                </FormGroup>
            </Form>
            <hr />
            <React.Fragment>
                {
                    people.map((person, i) => {
                        return (
                            <Badge style={{ margin: '2px', fontSize: 'large' }}
                                color={person.isIncluded ? 'success' : 'secondary'}
                                onClick={() => { togglePersonState(i) }}
                                key={person.name}
                            >{person.name}</Badge>
                        )
                    })
                }
            </React.Fragment>
            <hr />
            <Form onSubmit={handleCreateNewBill}>
                <FormGroup>
                    <InputGroup>
                        <Input type="text" placeholder="Bill Name/Purpose/Place"
                            value={newBill}
                            onChange={(e) => { setNewBill(e.target.value) }}
                            invalid={billNameInvalidError !== ""}
                        />
                        <InputGroupAddon addonType="append">
                            <Button type="submit" color="primary">Create</Button>
                        </InputGroupAddon>
                    </InputGroup>
                    <FormText color={"danger"}>{billNameInvalidError}</FormText>
                </FormGroup>
            </Form>
        </React.Fragment>
    )
}

export default NewBillForm
