import { useParams } from 'react-router-dom'

export default function Product() {
  const { id } = useParams()

  return (
    <div className="min-h-screen">
      <div className="max-w-[1400px] mx-auto px-8 py-20">
        <h1 className="font-heading text-5xl">Product {id}</h1>
      </div>
    </div>
  )
}
