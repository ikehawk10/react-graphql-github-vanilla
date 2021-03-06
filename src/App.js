import React, { Component } from 'react';
import axios from 'axios';

const axiosGitHubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`
  }
});

const Title = 'React GraphQL Github Client';

const GET_ORGANIZATION = `
  {
    organization(login: "the-road-to-learn-react") {
      name
      url
    }
  }
`;

class App extends Component {
  state = {
    path: 'the-road-to-learn-react/the-road-to-learn-react'
  };

  componentDidMount() {
    this.onFetchFromGitHub();
  }

  onChange = event => {
    this.setState({ path: event.target.value })
  }

  onSubmit = event => {
    event.preventDefault();
  }

  onFetchFromGitHub = () => {
    axiosGitHubGraphQL.post('', { query: GET_ORGANIZATION }).then(result => console.log(result))
  }

  render() {
    const { path } = this.state;
    
    return (
      <div>
        <h1>{Title}</h1>

        <form onSubmit={this.onSubmit}>
          <label htmlFor="url">
            Show open issues for https://github.com/
          </label>
          <input 
            id="url"
            type="text"
            value={path}
            onChange={this.onChange}
            style={{ width: '300px'}}
          />
          <button type="submit">Search</button>
        </form>

        <hr />
      </div>
    );
  }
}

export default App;
