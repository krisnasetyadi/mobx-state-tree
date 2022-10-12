import {Instance, types} from 'mobx-state-tree'

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
const RootModel = types.model("Root", {
    // childnode
    employer: EmployerModel
})

export { RootModel }
// just for ts
export type Root = Instance<typeof RootModel>
export type Employer = Instance<typeof EmployerModel>
export type Employee = Instance<typeof EmployeeModel>