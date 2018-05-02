import React, { Component } from "react";

class Square extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: this.props.color ? this.props.color : "#ff0000",
      size: this.props.size ? this.props.size : 50
    };
  }

  componentDidMount() {
    this.setState({ color: this.props.bgcolor, size: this.props.size });
  }
  render() {
    return (
      <div style={{ display: "flex" }}>
        <div
          style={{
            margin: 8,
            height: this.state.size ? this.state.size : 50,
            width: this.state.size ? this.state.size : 50,
            backgroundColor: this.state.color ? this.state.color : "#ff0000"
          }}
        />
        <div>
          <input
            type="color"
            value={this.state.color}
            onChange={e => {
              console.log(e.target);
              this.setState({ color: e.target.value });
            }}
          />
          <br />
          <input
            type="number"
            defaultValue={this.state.size}
            onChange={e => {
              console.log(e.target);
              this.setState({ size: Number(e.target.value) });
            }}
          />
        </div>
      </div>
    );
  }
}

let square = <Square />;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: [<Square bgcolor="#f00000" size={40} />]
    };
  }

  render() {
    return (
      <div className="App">
        {this.state.squares.map(sq => sq)}
        <div
          style={{
            display: "flex",
            borderRadius: 20,
            height: 50,
            width: 100,
            margin: 24,
            borderColor: "#f00",
            borderWidth: 20,
            border: "4px solid white",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff"
          }}
          onClick={() => {
            console.log(this.state.squares);
            this.state.squares.push(square);
            this.setState(this.state);
          }}
        >
          <p
            style={{
              fontWeight: "800",
              fontFamily: "Roboto",
              fontSize: 14
            }}
          >
            +
          </p>
        </div>
      </div>
    );
  }
}

export default App;
