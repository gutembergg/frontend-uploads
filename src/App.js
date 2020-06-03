import React, { Component } from 'react';

import { uniqueId } from 'lodash';
import filesize from 'filesize';
import api from './services/api';

import GlobaStyles from './styles/global';
import { Container, Content } from './styles';
import FileList from './components/FileList';
import Uploads from './components/Uploads';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uploadedFiles: []
    }
  }

  async componentDidMount() {
    const response = await api.get('/post');

    this.setState({
      uploadedFiles: response.data.map(file => ({
        id: file._id,
        name: file.name,
        readableSize: filesize(file.size),
        preview: file.url,
        uploaded: true,
        url: file.url
      }))
    })
  }
 

   handleUpload = files => {
    const uploadsFiles = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null
    }));

    this.setState({
      uploadedFiles: this.state.uploadedFiles.concat(uploadsFiles)
    });

    uploadsFiles.forEach(this.processUpload);
  }

  updateFile = (id, data) => {
    this.setState({
      uploadedFiles: this.state.uploadedFiles.map(uploadedFile => {
        return id === uploadedFile.id
          ? { ...uploadedFile, ...data }
          : uploadedFile;
      })
    });
  };


   processUpload = uploadedFile => {
    const data = new FormData();

    data.append('file', uploadedFile.file, uploadedFile.name);

    api.post('/post', data, {
      onUploadProgress: e => {
        const progress = parseInt(Math.round((e.loaded * 100) / e.total));

        this.updateFile(uploadedFile.id, {
          progress,
        })
      }
    }).then(response => {
        this.updateFile(uploadedFile.id, {
          uploaded: true,
          id: response.data._id,
          url: response.data.url
        });
    })
      .catch(() => {
        this.updateFile(uploadedFile.id, {
          error: true
        });
      })
  }

  handleDelete = async id => {
   await api.delete(`/post/${id}`);

   this.setState({
     uploadedFiles: this.state.uploadedFiles.filter(file => file.id !== id)
   })
  }

  componentWillMount() {
    this.state.uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview));
  }

 render() {

  const { uploadedFiles } = this.state;

    return (
    <Container>
      <Content>
        <Uploads onUpload={this.handleUpload} />
        {!!uploadedFiles.length && 
          <FileList files={uploadedFiles} handleDelete={this.handleDelete} />
        }
      </Content>
       <GlobaStyles />
    </Container>
  
  );
}

}

export default App;
