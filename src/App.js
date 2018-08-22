import React, { Component } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import HeroesList from "./heroes/heroesList"
import HeroCard from "./heroes/heroCard"
import Header from "./header/header"


class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Header></Header>

            <Switch>
              <Route exact path="/" render={ () => (
                <HeroesList></HeroesList>
              )} />

              <Route path="/characters/:characterId" render={ (routeParams) => (
                <HeroCard routeParams={routeParams}></HeroCard>
              )} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}


export default App
