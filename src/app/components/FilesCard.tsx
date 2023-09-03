import { Toaster, toast } from 'sonner'
import { type UploadFileInfo } from '../interfaces/UploadFileInfo'

interface FileCardProps {
  files: UploadFileInfo[]
}

const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text)
    toast.success('Link copied successfully')
  } catch (err) {
    console.error(err)
  }
}

const FileCard: React.FC<FileCardProps> = ({ files }) => {
  const handleCopyButtonClick = (text: string): void => {
    copyToClipboard(text).catch((error) => {
      console.error('Error:', error)
    })
  }

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-zinc-900/50 shadow-md rounded-md max-w-sm w-full">
      <h2 className="text-lg font-semibold mb-2 text-gray-400">Uploaded Files:</h2>
      <ul className="max-h-[200px] overflow-y-auto py-0 px-5">
        {files.map((file, index) => (
          <li key={index} className="flex items-center mb-2">
            <span className="mr-2 truncate">{file.name}</span>
            <button
              className="px-2 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => handleCopyButtonClick(file.signedUrl)}
            >
              Copy
            </button>
          </li>
        ))}
      </ul>
      <Toaster richColors position="bottom-center"/>
    </div>
  )
}

export default FileCard
