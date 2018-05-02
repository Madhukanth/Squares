import React, { Component } from "react";
import Draggable from "react-draggable";
import { Row, Col, Button, Input, Navbar } from "react-materialize";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

Modal.setAppElement(document.getElementById("root"));
var index;
var colorIndex;
var height;
var width;
var color;

class Square extends Component {
  componentWillMount() {
    this.setState({
      height: this.props.height ? this.props.height : 100,
      width: this.props.width ? this.props.width : 150,
      color: this.props.color ? this.props.color : "blue"
    });
  }

  render() {
    return (
      <div style={{ display: "flex" }}>
        <Draggable>
          <div>
            <p style={{ paddingLeft: 120 }}>
              {this.props.pos ? this.props.pos : 1}
            </p>
            <svg>
              <rect
                x={50}
                y={10}
                width={this.props.width ? this.props.width : 150}
                height={this.props.height ? this.props.height : 100}
                style={{
                  fill: "transparent",
                  stroke: this.props.color ? this.props.color : "blue",
                  strokeWidth: 3
                }}
              />
            </svg>
          </div>
        </Draggable>
      </div>
    );
  }
}

let square = <Square />;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: [<Square pos={1} />],
      deleteModalIsOpen: false,
      colorModalIsOpen: false,
      resizeModalIsOpen: false
    };
  }

  add = i => {
    this.state.squares.push(
      <Square
        pos={this.state.squares[this.state.squares.length - 1].props.pos + 1}
      />
    );
    console.log(this.state.squares[this.state.squares.length - 1].props.pos);
    this.setState(this.state);
  };

  delete = i => {
    this.state.squares.splice(i, 1, <p pos={i + 1} />);
    this.setState(this.state);
  };

  recolor = (i, color) => {
    let preheight = this.state.squares[i].props.height
      ? this.state.squares[i].props.height
      : 100;
    let prewidth = this.state.squares[i].props.width
      ? this.state.squares[i].props.width
      : 150;
    this.state.squares.splice(
      i,
      1,
      <Square
        pos={colorIndex}
        color={color}
        height={preheight}
        width={prewidth}
      />
    );
    this.setState(this.state);
  };

  resize = (i, height, width) => {
    let precolor = this.state.squares[i].props.color
      ? this.state.squares[i].props.color
      : "blue";
    this.state.squares.splice(
      i,
      1,
      <Square pos={i + 1} height={height} width={width} color={precolor} />
    );
  };

  closedeleteModal = () => {
    this.setState({
      deleteModalIsOpen: false
    });
  };

  closecolorModal = () => {
    this.setState({
      colorModalIsOpen: false
    });
  };

  closeresizeModal = () => {
    this.setState({
      resizeModalIsOpen: false
    });
  };
  render() {
    return (
      <div>
        <Navbar
          style={{ backgroundColor: "black" }}
          brand={<p style={{ marginLeft: 570, marginTop: 2 }}>SuspectTech</p>}
        />
        <center style={{ marginTop: 50 }}>
          <Button
            style={{ marginRight: 30 }}
            onClick={() => {
              this.add(this.state.squares.length + 1);
            }}
          >
            Add
          </Button>
          <Button
            style={{ marginRight: 30 }}
            onClick={() => {
              this.setState({ deleteModalIsOpen: true });
            }}
          >
            Delete
          </Button>
          <Button
            style={{ marginRight: 30 }}
            onClick={() => this.setState({ resizeModalIsOpen: true })}
          >
            Resize
          </Button>
          <Button onClick={() => this.setState({ colorModalIsOpen: true })}>
            Recolor
          </Button>
        </center>

        <Modal
          isOpen={this.state.deleteModalIsOpen}
          onRequestClose={this.closedeleteModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <Input
            s={12}
            label="Square's number to delete"
            onChange={event => {
              index = event.target.value;
            }}
          />
          <Button
            onClick={() => {
              this.closedeleteModal();
              this.delete(index - 1);
            }}
          >
            Delete
          </Button>
        </Modal>
        <Modal
          isOpen={this.state.colorModalIsOpen}
          onRequestClose={this.closecolorModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <Input
            s={12}
            label="Square's number to recolor"
            onChange={event => {
              colorIndex = event.target.value;
            }}
          />
          <Input
            s={12}
            label="Color"
            onChange={event => {
              color = event.target.value;
            }}
          />
          <Button
            onClick={() => {
              this.closecolorModal();
              this.recolor(colorIndex - 1, color);
            }}
          >
            Recolor
          </Button>
        </Modal>
        <Modal
          isOpen={this.state.resizeModalIsOpen}
          onRequestClose={this.closeresizeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <Input
            s={12}
            label="Square's number to resize"
            onChange={event => {
              index = event.target.value;
            }}
          />
          <Input
            s={12}
            label="Height"
            onChange={event => {
              height = event.target.value;
            }}
          />
          <Input
            s={12}
            label="Width"
            onChange={event => {
              width = event.target.value;
            }}
          />
          <Button
            onClick={() => {
              this.closeresizeModal();
              this.resize(index - 1, height, width);
            }}
          >
            Resize
          </Button>
        </Modal>
        <Row>
          {this.state.squares.map((sq, i) => (
            <Col key={i} s={2} style={{ marginRight: 20 }}>
              {sq}
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default App;
