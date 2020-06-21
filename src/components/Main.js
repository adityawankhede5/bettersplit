import React, {useState} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import uniqid from 'uniqid';
import {wrapper, appWrapper} from '../styles/main.module.css'
import Header from './Header'
import Home from './Home'
import EditBill from './EditBill';

function Main() {
    // STATES RELATED TO DATA
    const meID = uniqid();
    const tempMap = new Map();
    tempMap.set("me", meID);
    const [people, setPeople] = useState({
        [meID]: {
            name: "me",
            paid: 0,
            owes: 0,
            bills: []
        }
    });
    const [bills, setBills] = useState({});
    const [peopleMap, setPeopleMap] = useState(new Map(tempMap));

    return (
        <div className={`${wrapper}`}>
            <Header />
            <div className={`${appWrapper}`}>
                {/* ROUTES */}
                <Router>
                    <Switch>
                        <Route path="/:billID">
                            <EditBill bills={bills} setBills={setBills} />
                        </Route>
                        <Route path="/" >
                            <Home people={people} 
                                setPeople={setPeople}
                                bills={bills}
                                setBills={setBills}
                                peopleMap={peopleMap}
                                setPeopleMap={setPeopleMap}
                            />
                        </Route>
                    </Switch>
                </Router>
            </div>
        </div>
    )
}

export default Main
