import React, { Component } from "react";
import { TextField, List, ListItem, Typography } from "@material-ui/core";
import { debounce } from "lodash";

export default class PlaylistSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      searchMusic: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleMusicSearch = this.handleMusicSearch.bind(this);
    this.handleMusicPick = this.handleMusicPick.bind(this);
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
        //console.log(res);

        if (res.tracks !== null)
          return res.tracks.items.map(item => {
            return {
              songName: item.name,
              artist: item.artists[0].name,
              imageLink: item.album.images[2].url,
              uri: item.uri
            };
          });
        else {
          return [];
        }
      })
      .then(searchMusic => this.setState({ searchMusic }));
  };

  //closure for delaying synthetic events in React
  debounceEvent = (...args) => {
    this.debouncedEvent = debounce(...args);
    return e => {
      e.persist();
      return this.debouncedEvent(e);
    };
  };

  //unmount the event
  componentWillUnmount = () => {
    this.debouncedEvent.cancel();
  };

  handleChange = e => {
    e.preventDefault();
    let value = e.target.value;
    value === "" || value === undefined
      ? this.setState({ searchMusic: [] })
      : this.handleMusicSearch(value);
  };

  handleMusicPick = songIndex => {
    let song = this.state.searchMusic[songIndex].uri;
    this.props.addSong(song);
  };

  render() {
    const { searchMusic } = this.state;
    return (
      <div>
        <React.Fragment>
          <TextField
            style={{ width: "100%" }}
            placeholder="Playlist"
            onChange={this.debounceEvent(this.handleChange, 500)}
          />
          {searchMusic.map((item, index) => {
            return (
              <div key={index}>
                <List>
                  <ListItem button onClick={() => this.handleMusicPick(index)}>
                    <img
                      src={item.imageLink}
                      alt="spotify art"
                      style={{
                        width: "5rem",
                        height: "5rem",
                        padding: "4px",
                        borderRadius: "10px",
                        marginRight: "5px"
                      }}
                    />
                    <Typography fontWeight="fontWeightMedium" fontSize={18}>
                      <strong>{item.songName}</strong> - {item.artist}
                    </Typography>
                  </ListItem>
                </List>
              </div>
            );
          })}
        </React.Fragment>
      </div>
    );
  }
}
