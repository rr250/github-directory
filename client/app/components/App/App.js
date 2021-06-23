import React, { Component } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const App = ({ children }) => (
  <>
    {/* <Header /> */}

    <div className="app">
      <div className="app-body">
        <main className="main">
          {children}
        </main>
      </div>
    </div>

    {/* <Footer /> */}
  </>
);

export default App;
