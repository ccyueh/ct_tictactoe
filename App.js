import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';

export default class App extends React.Component {
  constructor() {
    super();

    this.state= {
      'cells': [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      'currentPlayer': 1
    };
  }

  // reset game method
  initializeGame = () => {
    this.setState({
      'cells': [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      'currentPlayer': 1
    })
  }

  renderIcon = (row, col) => {
    let value = this.state.cells[row][col];

    // return x if 1, o if -1, empty view if 0
    switch(value) {
      case 1: return <Icon name="close" style={styles.tileX} />;
      case -1: return <Icon name="pac-man" style={styles.tileO} />;
      default: return <View />;
    }
  }

  onTilePress = (row, col) => {
    // if value is not 0 within chosen cell, return
    let value = this.state.cells[row][col];
    if (value != 0) { return; }

    // when tile is pressed, check whose turn it is and change cell to that player's value

    // get state variables to alter locally
    let player = this.state.currentPlayer;
    let cells = this.state.cells;

    // alter the proper cell with the player value
    cells[row][col] = player;
    player = player * -1;
    // ternary operator
    // let next_player = (player == 1) ? -1 : 1

    // set states with new values
    this.setState({ cells, 'currentPlayer': player });

    // check for winner
    let winner = this.getWinner();
    if (winner == 1) {
      alert('Player 1 wins.');
      this.initializeGame();
    }
    else if (winner == -1) {
      alert('Player 2 wins.');
      this.initializeGame();
    }

    let tie = this.checkTie();
    if (tie === true) {
      alert('You have tied.')
      this.initializeGame();
    }
  }

  // return 1 if player 1 won, -1 if player 2 won, or 0 for a tie
  getWinner = () => {
    const NUM_TILES = 3;
    let cells = this.state.cells;
    let sum = 0;

    // check rows
    for (let i = 0; i < NUM_TILES; i++) {
      sum = cells[i][0] + cells[i][1] + cells[i][2]
      if (sum == 3) { return 1; }
      else if (sum == -3) { return -1; }
    }

    // check cols
    for (let i = 0; i < NUM_TILES; i++) {
      sum = cells[0][i] + cells[1][i] + cells[2][i]
      if (sum == 3) { return 1; }
      else if (sum == -3) { return -1; }
    }

    // check diagonals
    sum = cells[0][0] + cells[1][1] + cells[2][2]
    if (sum == 3) { return 1; }
    else if (sum == -3) { return -1; }

    sum = cells[0][2] + cells[1][1] + cells[2][0]
    if (sum == 3) { return 1; }
    else if (sum == -3) { return -1; }

    // tie
    return 0;
  }

  checkTie = () => {
    let cells = this.state.cells;

    // 0 means empty clickable cell, no 0's means all cells are full
    for (let i in cells) {
      for (let j in cells[i]) {
        if (cells[i][j] == 0) { return false; }
      }
    }

    return true;
  }

  render() {
    return (
      <View style={styles.container}>

        {/* display current player turn */}
        <View style={{ paddingBottom: 50 }}>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
            Turn: Player {(this.state.currentPlayer == 1) ? 1 : 2}
          </Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => this.onTilePress(0,0)}
            style={[{ borderLeftWidth: 0, borderTopWidth: 0}, styles.tile]}
          >
            {this.renderIcon(0,0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(0,1)}
            style={[{ borderTopWidth: 0 }, styles.tile]}
          >
            {this.renderIcon(0,1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(0,2)}
            style={[{ borderRightWidth: 0, borderTopWidth: 0 }, styles.tile]}
          >
            {this.renderIcon(0,2)}
          </TouchableOpacity>
        </View>
        {/* end of first row */}

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => this.onTilePress(1,0)}
            style={[{ borderLeftWidth: 0 }, styles.tile]}
          >
            {this.renderIcon(1,0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(1,1)}
            style={styles.tile}
          >
            {this.renderIcon(1,1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(1,2)}
            style={[{ borderRightWidth: 0 }, styles.tile]}
          >
            {this.renderIcon(1,2)}
          </TouchableOpacity>
        </View>
        {/* end of second row */}

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => this.onTilePress(2,0)}
            style={[{ borderLeftWidth: 0, borderBottomWidth: 0 }, styles.tile]}
          >
            {this.renderIcon(2,0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(2,1)}
            style={[{ borderBottomWidth: 0 }, styles.tile]}
          >
            {this.renderIcon(2,1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(2,2)}
            style={[{ borderRightWidth: 0, borderBottomWidth: 0 }, styles.tile]}
          >
            {this.renderIcon(2,2)}
          </TouchableOpacity>
        </View>
        {/* end of third row */}

        <View style={{ paddingTop: 50 }}>
          <Button title="New Game" onPress={() => this.initializeGame()} />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile: {
    width: 100,
    height: 100,
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tileX: {
    color: 'red',
    fontSize: 60
  },
  tileO: {
    color: 'green',
    fontSize: 60
  }
});
