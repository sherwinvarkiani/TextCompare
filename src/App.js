import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

/* Render the user uploaded images */
function Image1Render(props) {
  if (props.selectedImg1 != null) {
    return <img src={URL.createObjectURL(props.selectedImg1)} height="300" width="400"/>
  }
  return null
}

function Image2Render(props) {
  if (props.selectedImg2 != null) {
    return <img src={URL.createObjectURL(props.selectedImg2)} height="300" width="400"/>
  }
  return null
}

class App extends Component {
  state = {
    selectedImg1: null,
    selectedImg2: null,
    uploadedImg1: false,
    uploadedImg2: false,
    comparedImages: false
  }

  fileSelectedHandlerImg1 = event => {
    this.setState ({
      selectedImg1: event.target.files[0]
    })
  }

  fileUploadHandlerImg1 = () => {
    const data = new FormData();
    data.append('file', this.state.selectedImg1);
    data.append('filename', this.state.selectedImg1.name)

    fetch('http://localhost:5000/uploadImage1', {
      method: 'POST',
      body: data,
    }).then((response) => {
      if (response.ok) {
        console.log("uploadedImg1")
        this.setState({
          uploadedImg1: true
        })
      } else {
        this.setState({
          uploadedImg1: false
        })
      }
    });
  }

  fileSelectedHandlerImg2 = event => {
    this.setState ({
      selectedImg2: event.target.files[0]
    })
  }

  fileUploadHandlerImg2 = () => {
    const data = new FormData();
    data.append('file', this.state.selectedImg2);
    data.append('filename', this.state.selectedImg2.name)

    fetch('http://localhost:5000/uploadImage2', {
      method: 'POST',
      body: data,
    }).then((response) => {
      console.log(response.status)
      if (response.ok) {
        console.log("uploadedImg2")
        this.setState({
          uploadedImg2: true
        })
      } else {
        this.setState({
          uploadedImg2: false
        })
      }
    });
  }

  compareImagesHandler = () => {
    fetch('http://localhost:5000/compare', {
      method: 'POST'
    }).then((response) => {
      console.log(response.status)
      if (response.ok) {
        this.setState({
          comparedImages: true
        })
      }
      else {
        this.setState({
          comparedImages: false
        })
      }
      console.log(this.state.comparedImages)
    });
  }

  render() {
    return (
      <div className="App">
        <div className="imageDiv" id="left">
          <input type="file" onChange={this.fileSelectedHandlerImg1}/>
          <button onClick={this.fileUploadHandlerImg1}>Upload the original image</button>
          <Image1Render selectedImg1 = {this.state.selectedImg1}/>
        </div>
        <div className="imageDiv">
          <input type="file" onChange={this.fileSelectedHandlerImg2}/>
          <button onClick={this.fileUploadHandlerImg2}>Upload the comparison image</button>
          <Image2Render selectedImg2 = {this.state.selectedImg2}/>
        </div>
        <div>
          <button onClick={this.compareImagesHandler} disabled={this.state.uploadedImg1 === false || this.state.uploadedImg2 === false}>Compare Images</button>
          {this.state.comparedImages ? (<img src={require("./comparison.jpg")} height="300" width="400"/>) : null}
        </div>
      </div>
    );
  }
}

export default App;
