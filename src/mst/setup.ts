import { RootModel } from "."
import {onSnapshot, getSnapshot, applySnapshot }  from 'mobx-state-tree'
export const setupRootStore = () => {
    const rootTree = RootModel.create({
        // first parameter is default values
        employer:{
            id:'1',
            name:'Bob Burger',
            location: 'New York, NY',
            employees: []
        },
    })
    onSnapshot(rootTree, (snap) => console.log('snapshot', snap))
    // const currentRootTree = getSnapshot(rootTree)
    // applySnapshot (rootTree, {...currentRootTree, employer:{...currentRootTree.employer, location: "Manhattan, NY"}})
    return { rootTree }
}