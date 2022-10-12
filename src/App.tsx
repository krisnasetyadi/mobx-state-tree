import React from 'react';
import logo from './logo.svg';
import './App.css';
import { setupRootStore } from './mst/setup';
import { Provider } from 'mobx-react';

interface Props {

}

interface State {
  rootTree:any;
}

class App extends React.Component<Props,State>{
  constructor(props: Props){
    super(props)
    this.state = { rootTree: null}
  }
  componentDidMount(): void {
    const {rootTree }= setupRootStore()
    this.setState({rootTree})
  }
  render(): React.ReactNode {
    const {rootTree} = this.state
    if(!rootTree) return null
    return (
      <Provider rootTree={rootTree}>
        <div>
          tes
        </div>
      </Provider>
    ); 
  }

}

export default App;
