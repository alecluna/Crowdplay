import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";

export default class PlaylistSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      searchMusic: [],
      testState: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleMusicSearch = this.handleMusicSearch.bind(this);
  }

  handleMusicSearch = newQuery => {
    const { accessToken } = this.props;

    const request = new Request(
      `https://api.spotify.com/v1/search?q=${newQuery}&type=track&limit=5`,
      {
        headers: new Headers({
          Authorization: "Bearer " + accessToken,
          Accept: "application/json"
        })
      }
    );

    fetch(request)
      .then(res => {
        if (res.statusText === "Unauthorized") {
          window.location.href = "./";
        }
        return res.json();
      })
      .then(res => {
        if (res.tracks !== null)
          return res.tracks.items.map(item => {
            return {
              songName: item.name,
              artist: item.artists[0].name,
              imageLink: item.album.images[0].url
            };
          });
        else {
          return [];
        }
      })
      .then(searchMusic => this.setState({ searchMusic }));
  };

  handleChange = e => {
    e.preventDefault();
    let value = e.target.value;
    if (value !== "" && value !== undefined) this.handleMusicSearch(value);
  };

  debounce = (a, b, c) => {
    var d, e;
    return function() {
      function h() {
        (d = null), c || (e = a.apply(f, g));
      }
      var f = this,
        g = arguments;
      return (
        clearTimeout(d),
        (d = setTimeout(h, b)),
        c && !d && (e = a.apply(f, g)),
        e
      );
    };
  };

  render() {
    const { searchMusic } = this.state;
    console.log(searchMusic);
    return (
      <div>
        <React.Fragment>
          <TextField
            style={{ width: "100%" }}
            placeholder="Playlist"
            onChange={this.handleChange}
          />
          {searchMusic.map((item, index) => {
            return (
              <div key={index}>
                <Typography> {item.songName} </Typography>
              </div>
            );
          })}
        </React.Fragment>
      </div>
    );
  }
}
