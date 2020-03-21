import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/* Render the user uploaded images */
function Image1Render(props) {
  if (props.selectedImg1 != null) {
    return <img src={URL.createObjectURL(props.selectedImg1)} alt="Pic 1" class="img-fluid img-max-size m-5 border border-dark"/>
  }
    return <img src={require("./placeholder-image.png")} alt="placeholder" class="img-fluid img-max-size m-5 border border-dark"/>
}

function Image2Render(props) {
  if (props.selectedImg2 != null) {
    return <img src={URL.createObjectURL(props.selectedImg2)} alt="Pic 2" class="img-fluid img-max-size m-5 border border-dark"/>
  }
  return <img src={require("./placeholder-image.png")} alt="placeholder" class="img-fluid img-max-size m-5 border border-dark"/>
}

function ComparisonImageRender(props) {
  if (props.comparedImg != null) {
    return <img src={props.comparedImg} alt="Pic 2" class="img-fluid img-max-size m-1 border border-dark"/>
  }
  return <h1>Upload your Images to Start Comparing</h1>
}

class App extends Component {
  // state = {
  //   selectedImg1: null,
  //   selectedImg2: null,
  //   uploadedImg1: false,
  //   uploadedImg2: false,
  //   comparedImages: false
  // }
  constructor(props) {
    super(props)
    this.state = {
      selectedImg1: null,
      selectedImg2: null,
      uploadedImg1: false,
      uploadedImg2: false,
      comparedImages: false,
      comparedImg: null
    }
  }

  fileSelectedHandlerImg1 = event => {
    // console.log("HELLO2 " + this.state.comparedImages)
    // if (this.state.comparedImages !== false) {
    //   console.log("ye")
    //   window.location.reload();
    // }
    

    this.setState ({
      selectedImg1: event.target.files[0],
      comparedImages: false,
      comparedImg: null
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
          uploadedImg1: true,
          comparedImages: false,
          comparedImg: null
        })
      } else {
        this.setState({
          uploadedImg1: false,
          comparedImages: false,
          comparedImg: null
        })
      }
    });
  }

  fileSelectedHandlerImg2 = event => {
    // console.log("HELLO " + this.state.comparedImages)
    // if (this.state.comparedImages !== false) {
    //   console.log("yes")
    //   window.location.reload();
    // }

    this.setState ({
      selectedImg2: event.target.files[0],
      comparedImages: false,
      comparedImg: null
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
          uploadedImg2: true,
          comparedImages: false,
          comparedImg: null
        })
      } else {
        this.setState({
          uploadedImg2: false,
          comparedImages: false,
          comparedImg: null
        })
      }
    });
  }

  compareImagesHandler = () => {
    this.setState({
      comparedImg: null,
      comparedImages: false
    })
    fetch('http://localhost:5000/compare', {
      method: 'POST'
    }).then((response) => {
      console.log(response.text())
      if (response.ok) {
        this.setState({
          comparedImages: true,
          comparedImg: require('./comparison/comparison.jpg')
        })
      }
      else {
        this.setState({
          comparedImages: false,
          comparedImg: null
        })
      }
      console.log(this.state.comparedImages)
    });
  }

  swapImagesHandler = () => {
    var temp = this.state.selectedImg1;
    this.setState({
      selectedImg1: this.state.selectedImg2,
      selectedImg2: temp
    })
  }

  render() {
    return (
      
      <div className="App" class="bg-light container-fluid">
        <div class="row">
          <div class="col bg-dark mb-3 header">
            <div><h1 id="title">Text Compare</h1></div>
            <div><h2 id="subtitle">By Sherwin Varkiani</h2></div>
          </div>
        </div>
        <div class="row">
          <div class="col text-center">
            <ComparisonImageRender comparedImg = {this.state.comparedImg}/>
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
          <div class="row">
            <div class="col my-auto"><button class="btn btn-dark swap" onClick={this.swapImagesHandler}>
            <i class="icon-exchange"></i>
            </button></div>
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
