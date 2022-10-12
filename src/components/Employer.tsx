import React from "react"
import {inject, observer} from 'mobx-react'
import { Root } from "../mst";
import { EmployeeComponent } from "./Employee";

interface EmployerComponentProps {
    // "?" allow to optional 
    rootTree?: Root
}

interface EmployerComponentState {
    employeeName: string;
    hours_worked: string,
}
@inject('rootTree')
@observer


class EmployerComponent extends React.Component<EmployerComponentProps, EmployerComponentState> {
    constructor(props: EmployerComponentProps){
        super(props);
        this.state = {
            employeeName: '',
            hours_worked: ''
        }
    }
    changeEmployeeName = (e: any) => {
        const employeeName = e.target.value
        this.setState({employeeName})
    }
    changeHoursWorked = (e: any) => {
        const hours_worked = e.target.value
        this.setState({hours_worked})
    }

    onSubmit = (e: any) =>{
        e.preventDefault();

        const { employeeName , hours_worked} = this.state
        const {rootTree} = this.props
        if(!rootTree) return null
        rootTree.employer.newEmployee(employeeName, parseInt(hours_worked))
    }
    render() {
        const {rootTree} = this.props
        const {employeeName, hours_worked} = this.state
        if(!rootTree) return null
        // this is the action that we just created
        // rootTree.employer.newEmployee
        const num_employees = rootTree.employer.num_employees
        return (
            <div>
                <h1>{rootTree.employer.name}</h1>
                <h3>{rootTree.employer.location}</h3>
                <p>{`Total number of employees ${num_employees}`}</p>
                <hr/>
                <p>New Employee</p>
                <form onSubmit={this.onSubmit}>
                    <p>Name: </p>
                    <input 
                    value={employeeName} 
                    onChange={this.changeEmployeeName} />
                    <p>Hours Worked: </p>
                    <input 
                    value={hours_worked} 
                    onChange={this.changeHoursWorked} />
                    <br />
                    <button>Submit</button>
                </form>
                <hr/>
                {rootTree.employer.employees.map(employee => (
                    <EmployeeComponent employee={employee} key={employee.id}/>
                ))}
            </div>
        )
    }
}

export { EmployerComponent }