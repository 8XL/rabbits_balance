import React, { ReactElement } from 'react';
import './App.css';
import { Playground, Panel } from './components';

const App:React.FC = ():JSX.Element => {
  return (
    <div className="App">
      <Playground />
      <Panel />
    </div>
  );
}

export default App;