// @flow
import React, { Component } from "react"
import "./heroCard.css"


type Props = {
  routeParams: {
    history: Object,
    location: Object,
    match: Object,
  },
};

type State = {
  id: number,
  name: string,
  description: string,
  imgUrl: string,
  comics: {
    items: Array<Object>,
  },
  series: {
    items: Array<Object>,
  },
};


class HeroCard extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      id: props.routeParams.match.params.characterId,
      name: "",
      description: "",
      imgUrl: "",
      comics: {
        items: [],
      },
      series: {
        items: [],
      },
    }
  }

  componentDidMount() {
    this.fetchHero(this.state.id)
  }

  fetchHero(characterId: number) {
    const url = "https://gateway.marvel.com:443/v1/public/characters"
    const apiKey = "6c3b02b3371becf9e0a3b670e224e35a"

    fetch(`${url}/${characterId}?apikey=${apiKey}`)
      .then( res => (
        res.json()
      ))
      .then( res => {
        const {name, description, thumbnail, comics, series} = res.data.results[0]

        this.setState( (prevState, prevProps) => ({
          name: name,
          description: description,
          imgUrl: `${thumbnail.path}.${thumbnail.extension}`,
          comics: comics,
          series: series,
        }))
      })
  }

  render() {
    const {name, description, imgUrl, comics, series} = this.state

    return(
      <div className="container">
        <section className="col-sm-12 col-lg-3">
          <img src={imgUrl} alt={name} />
        </section>

        <section className="col-sm-12 col-lg-9">
          <header>
            <h2>{name}</h2>
            <p>{description}</p>
          </header>

          <article>
            <h6>Comics:</h6>
            <ul>
              {comics.items && comics.items.map( comic => (
                <li key={comic.name}>{comic.name}</li>
              ))}
            </ul>
          </article>
          <article>
            <h6>Series:</h6>
            <ul>
              {series.items && series.items.map( serie => (
                <li key={serie.name}>{serie.name}</li>
              ))}
            </ul>
          </article>
        </section>
      </div>
    )
  }
}

export default HeroCard
