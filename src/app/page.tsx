import Dropzone from './components/Dropzone'

export default function Home () {
  return (
    <main className="h-screen relative bg-gray-900">
      <div className="absolute inset-0">
        <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
          <div className="relative">
            <video className="w-full h-full object-cover" autoPlay loop muted>
              <source src="video/particles-compressed-new.mp4" type="video/mp4" />
              Tu navegador no admite el elemento de video.
            </video>
          </div>
          <div className="relative">
            <video className="w-full h-full object-cover" autoPlay loop muted>
              <source src="video/particles-compressed-new.mp4" type="video/mp4" />
              Tu navegador no admite el elemento de video.
            </video>
          </div>
          <div className="relative">
            <video className="w-full h-full object-cover" autoPlay loop muted>
              <source src="video/particles-compressed-new.mp4" type="video/mp4" />
              Tu navegador no admite el elemento de video.
            </video>
          </div>
          <div className="relative">
            <video className="w-full h-full object-cover" autoPlay loop muted>
              <source src="video/particles-compressed-new.mp4" type="video/mp4" />
              Tu navegador no admite el elemento de video.
            </video>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-slate-700 opacity-50"></div>
      <div className="flex flex-col items-center justify-center h-full relative z-10 text-white">
        <h1 className="text-4xl font-bold mb-10">
          Upload anything, from anywhere
        </h1>
        <div>
          <Dropzone />
        </div>
      </div>
    </main>
  )
}
