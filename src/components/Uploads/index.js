import React from 'react';

import Dropzone from 'react-dropzone';

import { DropContainer, UploadMessage } from './Styles';

const Uploads = ({ onUpload }) => {

    function renderUploadMessage(isDragActive, isDragReject) {
        if(!isDragActive) {
            return <UploadMessage>deplacer vous fichiers ici</UploadMessage>
        }
        if(isDragReject) {
            return <UploadMessage type="error">Fichier n'est pas supporté</UploadMessage>
        }
        return <UploadMessage type="success">Laissez ici vous fichiers</UploadMessage>
    }

    return(
        <Dropzone accept="image/*" onDropAccepted={onUpload}>
            { ({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
               <DropContainer
                    {...getRootProps()}
                    isDragActive={isDragActive}
                    isDragReject={isDragReject}
               >
                    <input {...getInputProps()} />
                    {renderUploadMessage(isDragActive, isDragReject)}
               </DropContainer>
              ) 
            }
        </Dropzone>
    );
}

export default Uploads;