import { useParams } from 'react-router-dom'

export default function Product() {
  const { id } = useParams()

  return (
    <div className="min-h-screen">
      <h1 className="font-heading text-5xl">Product {id}</h1>
    </div>
  )
}
