import React, { useState } from 'react';

import { uniqueId } from 'lodash';
import filesize from 'filesize';

import GlobaStyles from './styles/global';
import { Container, Content } from './styles';
import FileList from './components/FileList';
import Uploads from './components/Uploads';

const App = () => {

  const [ uploadedFiles, setUploadFiles ] = useState([]);

  function handleUpload(files) {
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

    setUploadFiles(uploadedFiles.concat(uploadsFiles));
  }

  return (
    <Container>
      <Content>
        <Uploads onUpload={handleUpload} />
        {!!uploadedFiles.length && 
          <FileList files={uploadedFiles} />
        }
      </Content>
       <GlobaStyles />
    </Container>
  
  );
}

export default App;
