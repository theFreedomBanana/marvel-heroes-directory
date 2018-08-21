import React, { Component } from "react"
import HeroesList from "./heroes/heroesList"
import HeroCard from "./heroes/heroCard"
import { BrowserRouter, Route, Switch } from "react-router-dom"


class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={ () => (
              <HeroesList></HeroesList>
            )} />

            <Route path="/characters/:characterId" render={ (routeParams) => (
              <HeroCard routeParams={routeParams}></HeroCard>
            )} />
          </Switch>

        </BrowserRouter>
      </div>
    )
  }
}


export default App
