// @flow
import React, { Component } from "react"
import "./heroesList.css"


type State = {
  heroes: Array<Object>
};


class HeroesList extends Component<{}, State> {
  constructor(props: {}) {
    super(props)

    this.state = {
      heroes: [],
    }

  }

  componentDidMount() {
    this.fetchHeroes()
  }

  fetchHeroes() {
    const url = "https://gateway.marvel.com:443/v1/public/characters"
    const apiKey = "6c3b02b3371becf9e0a3b670e224e35a"

    fetch(`${url}?apikey=${apiKey}`)
      .then( res => (
        res.json()
      ))
      .then( res => {
        this.setState( (prevState, prevProps) => ({
          heroes: res.data.results,
        }))
      })
  }


  render() {
    const heroes = this.state.heroes

    return(
      <div>
        <ul className="container">
          { heroes.map( heroe => (
            <li key={heroe.id} className="col-sm-12 col-lg-4">
              <img src={`${heroe.thumbnail.path}.${heroe.thumbnail.extension}`} alt={heroe.name} />
              <h4>{heroe.name}</h4>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default HeroesList
