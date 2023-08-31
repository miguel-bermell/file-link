'use client'

import React, { useEffect, useState } from 'react'

import { FilePond } from 'react-filepond'
import { type FilePondInitialFile, type FilePondFile } from 'filepond'
import 'filepond/dist/filepond.min.css'
import { type UploadFileInfo } from '../interfaces/UploadFileInfo'
import FileCard from './FilesCard'

const labelIdle = 'Drag & Drop your files or <span class="filepond--label-action">Browse</span>'

const Dropzone = () => {
  const [files, setFiles] = useState<Array<FilePondInitialFile | File | Blob>>([])
  const [uploadFilesInfo, setUploadFilesInfo] = useState<UploadFileInfo[]>([])
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setIsReady(true)
  }, [])

  const handleUpdateFiles = (fileItems: FilePondFile[]) => {
    const updatedFiles: Array<FilePondInitialFile | File | Blob> = fileItems.map((fileItem) => fileItem.file)
    console.log(updatedFiles)
    setFiles(updatedFiles)
  }

  const handleFileProcessed = (response: any) => {
    const responseData = JSON.parse(response)
    setUploadFilesInfo((prevState) => [...prevState, responseData])
    return responseData
  }

  return (
    <div className='file-wrapper' style={ isReady ? { opacity: 1 } : undefined}>
      <FilePond
        files={files}
        onupdatefiles={handleUpdateFiles}
        allowMultiple={true}
        maxFiles={3}
        server={{
          process: {
            url: '/api/upload',
            method: 'POST',
            withCredentials: false,
            onload: handleFileProcessed,
            onerror: (response) => {
              console.error('Error al subir el archivo:', response)
            }
          }
        }}
        name="file"
        labelIdle={labelIdle}
      />
      {(uploadFilesInfo.length > 0) && <FileCard files={uploadFilesInfo} />}
    </div>
  )
}

export default Dropzone
