import './App.css'
import { useState, useEffect } from 'react'

type ProdutoType = {
  _id: string,
  nome: string,
  preco: number,
  urlfoto: string,
  descricao: string
}
function App() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([])
  useEffect(() => {
    fetch('/api/produtos')
      .then((response) => response.json())
      .then((data) => setProdutos(data))
  }, [])
  return (
    <>
    <div>Loja de Celulares</div>
    {
      produtos.map((produto) => (
        <div key={produto._id}>
          <h2>{produto.nome}</h2>
          <p>{produto.descricao}</p>
          <p>R$ {produto.preco}</p>
          <img src={produto.urlfoto} alt={produto.nome} />
        </div>
      ))
    }
    </>
  )
}

export default App
