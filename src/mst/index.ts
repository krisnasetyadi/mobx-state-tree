import {Instance, types, applySnapshot} from 'mobx-state-tree'
import { v4 as uuid} from 'uuid'
const EmployeeModel = types.model("Employee",{
    id: types.identifier,
    name: types.string,
    hours_worked: types.number,
})
.actions(self => {
    // action for empployee node
    function editEmployee(name: string, hours_worked: number) {
        // aplly snapshot, first param is essiantially what youare updating
        // and second is your new snapshot
        // goo deeper from employee model
        applySnapshot(self, {...self, name, hours_worked} )
    }
    return { editEmployee }
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
    },
    // can't do "get" when use parameter
    filtered_employees(searchString: string){
        return self.employees.filter(employee => 
            employee.name.includes(searchString))
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