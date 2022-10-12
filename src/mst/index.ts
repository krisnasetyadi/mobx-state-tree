import {Instance, types, applySnapshot} from 'mobx-state-tree'
import { v4 as uuid} from 'uuid'
const EmployeeModel = types.model("Employee",{
    id: types.identifier,
    name: types.string,
    hours_worked: types.number,
})

const EmployerModel = types.model("Employer",{
    // leafs nya
    id:types.identifier,
    name: types.string,
    location: types.string,
    employees: types.array(EmployeeModel)
})
.actions(self =>{
    // specified list of function, only way you're suposed to edit the tree
    function newEmployee(name: string, hours_worked: number){
        const id = uuid();
        // run apply => allow to use an immutable copy or to create
        //  a new immutable copy of our tree
        // specified the new snapshot
        applySnapshot(self , {...self, employees: [{id,name,hours_worked}, ...self.employees] })
    }
    return { newEmployee }
})
.views(self =>({
    // explicit object return and specify each view in comment delimited list
    get num_employees(){
        return self.employees.length
    }
}))
// 
const RootModel = types.model("Root", {
    // childnode
    employer: EmployerModel
})

export { RootModel }
// just for ts
export type Root = Instance<typeof RootModel>
export type Employer = Instance<typeof EmployerModel>
export type Employee = Instance<typeof EmployeeModel>