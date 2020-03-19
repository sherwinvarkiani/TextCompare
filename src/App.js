import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/* Render the user uploaded images */
function Image1Render(props) {
  if (props.selectedImg1 != null) {
    return <img src={URL.createObjectURL(props.selectedImg1)} class="img-fluid img-max-size m-5 border border-dark"/>
  }
    return <img src={require("./placeholder-image.png")} class="img-fluid img-max-size m-5 border border-dark"/>
}

function Image2Render(props) {
  if (props.selectedImg2 != null) {
    return <img src={URL.createObjectURL(props.selectedImg2)} class="img-fluid img-max-size m-5 border border-dark"/>
  }
  return <img src={require("./placeholder-image.png")} class="img-fluid img-max-size m-5 border border-dark"/>
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
      <div className="App" class="bg-light container-fluid">
        <div class="row">
          <div class="col bg-dark mb-3 header">
            <h1 class="vcenter" id="title">Text Compare</h1>
            <h2 class="vcenter" id="subtitle">By Sherwin Varkiani</h2>
          </div>
        </div>
        <div class="row">
          <div class="col text-center">
            {this.state.comparedImages ? (<img src={require("./comparison/comparison.jpg")} class="img-fluid img-max-size m-5 border border-dark"/>) : null}
          </div>
        </div>
        <div class="row">
          <div class="col text-center">
            <div class="input-block">
            <input type="file" style={{display: 'none'}} onChange={this.fileSelectedHandlerImg1} ref={fileInput1 => this.fileInput1 = fileInput1}/>
              <button class="btn btn-dark mr-5" onClick={() => this.fileInput1.click()}>Choose a file</button>
              <button class="btn btn-dark" onClick={this.fileUploadHandlerImg1}>Upload the original image</button>
              <Image1Render selectedImg1 = {this.state.selectedImg1}/>
            </div>
          </div>
          <div class="col text-center">
            <div class="input-block">
              <input type="file" style={{display: 'none'}} onChange={this.fileSelectedHandlerImg2} ref={fileInput2 => this.fileInput2 = fileInput2}/>
              <button class="btn btn-dark mr-5" onClick={() => this.fileInput2.click()}>Choose a file</button>
              <button class="btn btn-dark" onClick={this.fileUploadHandlerImg2}>Upload the comparison image</button>
              <Image2Render selectedImg2 = {this.state.selectedImg2}/>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col text-center">
            <button class="btn btn-dark" onClick={this.compareImagesHandler} disabled={this.state.uploadedImg1 === false || this.state.uploadedImg2 === false}>Compare Images</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
