import React, { Component } from "react"
import HeroesList from "./heroes/heroesList"
import { BrowserRouter, Route } from "react-router-dom"


class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route to="/" render={ () => (
            <HeroesList></HeroesList>
          )} />
        </BrowserRouter>
      </div>
    )
  }
}


export default App
