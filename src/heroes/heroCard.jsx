// @flow
import React, { Component } from "react"
import { fetchData } from "../services/httpRequests.js"
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

    const URL = "https://gateway.marvel.com:443/v1/public/characters"

    fetchData({
      url: URL,
      requestParams: [this.state.id],
    })
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
    const comicsList =
      comics.items.length > 0 &&
        (
          <article className="hero-card-article">
            <h6>Comics</h6>
            <ul>
              { comics.items.map( comic => (
                <li key={comic.name}>{comic.name}</li>
              ))}
            </ul>
          </article>
        )
    const seriesList =
      series.items.length > 0 &&
        (
          <article className="hero-card-article">
            <h6>Series</h6>
            <ul>
              { series.items.map( serie => (
                <li key={serie.name}>{serie.name}</li>
              ))}
            </ul>
          </article>
        )

    return(
      <div className="container hero-card">
        <section className="col-sm-12 col-lg-3">
          <img src={imgUrl} alt={name} />
        </section>

        <section className="col-sm-12 col-lg-9">
          <header className="hero-card-header">
            <h2>{name}</h2>
            <p>{description}</p>
          </header>
          { comicsList }
          { seriesList }
        </section>
      </div>
    )
  }
}

export default HeroCard
