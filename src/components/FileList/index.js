import React from 'react';

import { CircularProgressbar } from 'react-circular-progressbar';
import { Container, FileInfo, Preview } from './styles';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';

const FileList = ({ files }) => {

    return (
        <Container>
           {files.map(uploadedFile => ( 
           <li key={uploadedFile.id}>
                <FileInfo>
                    <Preview src={uploadedFile.preview}/>
                    <div>
                        <strong>{uploadedFile.name}</strong>
                        <span>{uploadedFile.readableSize} 
                        {!!uploadedFile.url &&  <button onClick={() => {}}>Supprimer</button>}                       
                        </span>
                    </div>
                </FileInfo>

                <div>
                    {!uploadedFile.uploaded && !uploadedFile.error && (
                         <CircularProgressbar 
                            styles={{
                                root: { width: 24 },
                                path: { stroke: '#7159c1' },
                                trail: {
                                    stroke: '#d6d6d6',
                                }
                            }}
                            strokeWidth={10}
                            value={uploadedFile.progress}
                        />
                    )}
                   {uploadedFile.url && (
                       <a 
                            href="http://localhost:3001/file/c6562673af745a2086c82b5c4291680a-bindings_1.jpg"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <MdLink style={{ marginRight: "8px" }} size={24} color="#222" />
                       </a>
                   )}            
                    {uploadedFile.uploaded && <MdCheckCircle size={24} color="#78e5d5" />}
                    {uploadedFile.error && <MdError size={24} color="#e57878" />}
                </div>
            </li>
            ))}
        </Container>
    );
}

export default FileList;