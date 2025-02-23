'use client'

import axios from 'axios'
import { useState } from 'react'
import Navbar from './components/home/navbar'
import TabsMenu from './components/home/tabs'

export default function Home () {
  const [file, setFile] = useState<File | null>(null)
  const [message, setMessage] = useState('Upload')
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
    }
  }
  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file')
      setTimeout(() => {
        setMessage('Upload')
        setFile(null)
      }, 2000)
      return
    }
    const formData = new FormData()
    formData.append('file', file)
    try {
      await axios.post('/api/drive', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: progressEvent => {
          setMessage(
            `Upload progress: ${(progressEvent.progress! * 100).toFixed(2)}%`
          )
        }
      })
      setMessage('Upload successful')
      setTimeout(() => {
        setMessage('Upload')
        setFile(null)
      }, 2000)
    } catch (error: any) {
      setMessage(error.response?.data?.error || 'Upload failed')
      setTimeout(() => {
        setMessage('Upload')
        setFile(null)
      }, 3000)
    }
  }

  return (
    <div className='container mx-auto p-5'>
      <Navbar />
      <div className='shadow-lg mt-2 p-6 rounded-md w-full'>
        <div className='flex flex-row items-center justify-between'>
          <h2 className='text-lg font-bold'>Upload Your File</h2>
          <button
            className='btn btn-secondary'
            onClick={() =>
              (
                document.getElementById('my_modal') as HTMLDialogElement
              )?.showModal()
            }
          >
            Upload File
          </button>
          <dialog id='my_modal' className='modal'>
            <div className='modal-box h-64'>
              <form method='dialog'>
                <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border-none'>
                  X
                </button>
              </form>
              <h3 className='font-bold text-xl'>Upload File</h3>
              <div className='form-control p-2'>
                <label className='label'>
                  <span className='label-text'>Choose a file</span>
                </label>
                <input
                  type='file'
                  className='file-input file-input-bordered file-input-warning w-full'
                  onChange={handleFileChange}
                />
                <div className='divider my-1' />
                <button
                  className='btn btn-active btn-neutral'
                  onClick={handleUpload}
                  disabled={message == 'Upload' ? false : true}
                >
                  {message && <p>{message}</p>}
                </button>
              </div>
            </div>
          </dialog>
        </div>
        <div className='divider my-2' />
        <TabsMenu />
      </div>
    </div>
  )
}
