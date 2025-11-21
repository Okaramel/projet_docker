import { useState } from 'react'
import './App.css'
import { Quote } from './components/quote'

function App() {
  const [quoteId, setQuoteId] = useState<number | null>(34)

  const handleOnClick = async () => {
    try {
      const res = await fetch("http://localhost:3000/quote/random")
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      console.log(data);
      setQuoteId(data.id)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <h1>Clair de Lune</h1>
      <div className="card">
        <Quote
          quote_author='Aldric'
          quote_content="C'est soit une bonne idée, soit une bonne histoire"
        />
        <button className='btn' onClick={handleOnClick}>{quoteId ? "Regénérer" : "Générer"}</button>
      </div>
    </>
  )
}

export default App
