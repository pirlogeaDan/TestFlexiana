import { useState } from 'react';

import { produce } from 'immer';

export const AppStatus = {
  CONTRIBUTORS: 'contributors',
  REPOS: 'repos',
  USERS: 'users',
}

export const usePresenter = (props) => {

  const [state, setState] = useState({
    search_word: '',
    repos: [],
    repos_holder: [],
    contributors: [],
    users: [],
    status: AppStatus.REPOS
  });

  //functions for state setting
  const setSearchWord = (value) => {
    setState(state => produce(
      state, draft => {
        draft.search_word = value;
      }
    ))
  }
  const setUsers = (value) => {
    setState(state => produce(
      state, draft => {
        draft.users = value;
      }
    ))
  }

  const setRepos = (value) => {
    setState(state => produce(
      state, draft => {
        draft.repos = value;
      }
    ))
  }

  const setStatus = (value) => {
    setState(state => produce(
      state, draft => {
        draft.status = value;
      }
    ))
  }

  const setReposAndReposHolder = (value) => {
    setState(state => produce(
      state, draft => {
        draft.repos = value;
        draft.repos_holder = value;
      }
    ))
  }

  const setContributors = (value) => {
    setState(state => produce(
      state, draft => {
        draft.contributors = value;
      }
    ))
  }

  //api functions

  const getUserRepos = async () => {
    const url = `https://api.github.com/repositories`;
    try {
      return fetch(url).then((res) => res.json());
    } catch (e) {
      __DEV__ && console.log('Failed to get repos', e);
    }
  }

  const getUsers = async () => {
    const url = `https://api.github.com/users`;
    var users = [];
    try {
      users = await fetch(url).then((res) => res.json());
      setUsers(users);
    } catch (e) {
      __DEV__ && console.log('Failed to get users', e);
    }
  }

  const getReposContributorsApi = async (owner, repo) => {
    const url = `https://api.github.com/repos/${owner}/${repo}/contributors`;
    try {
      return fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': 'e50de377956d03dad56126a4b7344b6eab92f220',
          Accept: 'application/vnd.github.v3+json',
          // 'ContentType': 'application/json'
        }
      }).then((res) => res.json());
    } catch (e) {
      __DEV__ && console.log('Failed to get contributors api', e);
    }
  }

  //search filter function
  const searchFilterFunction = (text) => {
    setSearchWord(text);
    const newData = state.repos_holder.filter(item => {
      const itemData = `${item.full_name.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    setRepos(newData);
  };

  //init to get repos
  const init = async () => {
    var repos = [];
    var users = [];
    try {
      repos = await getUserRepos();
      await getUsers();
      setReposAndReposHolder(repos);
    } catch (e) {
      __DEV__ && console.log('Failed to get repos', e);
    }
  };

  //get Contributors button to get repos individual data
  const getContributorsForRepo = async (owner, repo) => {
    var contributors = [];
    try {
      contributors = await getReposContributorsApi(owner, repo);
      setContributors(contributors);
    } catch (e) {
      __DEV__ && console.log('Failed to get contributors', e);
    }
  };
  return [state, {
    init, setSearchWord, setUsers, setRepos, setStatus, setReposAndReposHolder, setContributors,
    getUserRepos, getUsers, getReposContributorsApi, searchFilterFunction, getContributorsForRepo
  }];
}