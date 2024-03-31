import React from 'react';
import Main from './components/principal/main';
import MenuBar from './components/menu/MenuBar';
import Footer from './components/rodape/footer';

function App() {
  return (
    <div className="App">
      <MenuBar />
      <Main />
      <Footer />
    </div>
  );
}

export default App;