import { useState } from 'react'
import './App.css'
import { Quote } from './components/quote'

function App() {
  const [quoteId, setQuoteId] = useState<number | null>(null)
  const [quoteContent, setQuoteContent] = useState<string | null>(null)
  const [quoteAuthor, setQuoteAuthor] = useState<string | null>(null)
  

  const handleOnClick = async () => {
    try {
      const res = await fetch("http://localhost:3000/quote/random")
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      console.log(data);
      setQuoteId(data.id)
      setQuoteContent(data.quote)
      setQuoteAuthor(data.author)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <header>
        <h1>Clair de Lune</h1>
      </header>
      <main>

        <div className="card">
          <Quote
            quote_author={quoteAuthor ? quoteAuthor : ""}
            quote_content={quoteContent ? quoteContent : ""}
            />
          <button className='btn' onClick={handleOnClick}>{quoteId ? "Regénérer" : "Générer"}</button>
        </div>
      </main>
      <footer></footer>
    </>
  )
}

export default App
