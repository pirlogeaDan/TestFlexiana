import React, { useEffect } from 'react';
import { Text, View, TextInput, Dimensions, TouchableOpacity, VirtualizedList } from 'react-native';
import { AppStatus } from './app_presenter';
import { usePresenter as usePresenter } from './app_presenter';
import styles from './app.styles';

const App = (props) => {

  const [{ search_word, repos, contributors, users, status },
    { init, setStatus, searchFilterFunction, getContributorsForRepo }] = usePresenter(props);

  //Handles the data loading
  useEffect(() => {
    init().then().
      catch((e) => __DEV__ && console.log('Failed Repos Init', e));
  }, []);

  //render the list for the Users
  const renderList = (list) => {
    return (
      <VirtualizedList
        data={list}
        // removeClippedSubviews={true}
        initialNumToRender={10}
        maxToRenderPerBatch={20}
        windowSize={40}
        getItemCount={(data) => list.length}
        getItem={(data, index) => {
          return list[index];
        }}
        keyExtractor={(item, index) => {
          return item.id.toString();
        }}
        renderItem={_renderItem}
      />
    )
  }
  const _renderItem = ({ item, index }) => {
    return (
      < TouchableOpacity
        onPress={() => {
          if (status == AppStatus.REPOS) {
            getContributorsForRepo(item.owner.login, item.name)
            setStatus(AppStatus.CONTRIBUTORS)
          } else {
            return
          }
        }}
        key={index.toString()}>
        {status == AppStatus.REPOS && <Text style={styles.list_text}>{'Name: ' + JSON.stringify(item.full_name)}</Text>}
        {status == AppStatus.CONTRIBUTORS && <Text style={styles.list_text}>{'Name: ' + JSON.stringify(item.login) + ' Contributions: ' + JSON.stringify(item.contributions)}</Text>}
        {status == AppStatus.USERS && <Text style={styles.list_text}>{'Name: ' + JSON.stringify(item.login)}</Text>}
      </TouchableOpacity>
    )
  }

  //render the list for the contributors
  const renderButtons = () => {
    return (
      <View style={styles.button}>
        < TouchableOpacity
          style={styles.back_button}
          onPress={() => { setStatus(AppStatus.USERS) }}>
          <Text style={styles.buttonText}>{'USERS'}</Text>
        </TouchableOpacity>
        {status != AppStatus.REPOS &&
          < TouchableOpacity
            style={styles.back_button}
            onPress={() => {
              if (status == AppStatus.REPOS) {
                return
              } else {
                setStatus(AppStatus.REPOS)
              }
            }}>
            <Text style={styles.buttonText}>{status == AppStatus.CONTRIBUTORS && 'PUBLIC REPOSITORIES' || 'PUBLIC REPOSITORIES'}</Text>
          </TouchableOpacity>
        }
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {status == AppStatus.REPOS &&
        <TextInput
          placeholder="Search for desired repo"
          style={styles.input}
          onChangeText={searchFilterFunction}
          value={search_word}
        />
        ||
        renderButtons()
      }
      {status == AppStatus.REPOS && renderButtons()}
      {<Text style={[styles.buttonText, { padding: 15 }]}>{status.toUpperCase()}</Text>}
      {status == AppStatus.REPOS && renderList(repos)}
      {status == AppStatus.CONTRIBUTORS && renderList(contributors)}
      {status == AppStatus.USERS && renderList(users)}
    </View>
  );
}

export default App;