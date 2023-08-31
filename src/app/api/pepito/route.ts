// import { NextResponse } from 'next/server'

// interface ResponseData {
//   message: string
// }

// export default function GET (
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//   res.status(200).json({ message: 'Hello from Next.js!' })
// }

import { type NextRequest, NextResponse } from 'next/server'

// esto es una opción de Next.js, para evitar que cachee de forma
// estática la ruta, y que siempre se ejecute en el servidor
export const dynamic = 'force-dynamic'

export async function GET (request: NextRequest) {
  console.log('PEPE')
  return NextResponse.json({ status: 'tumadre' })
}
