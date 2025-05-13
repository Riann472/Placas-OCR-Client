import { useState } from "react"
import axios from 'axios'

function App() {
  const [file, setFile] = useState()
  const [placa, setPlaca] = useState()

  async function submit(e) {
    e.preventDefault()

    const form = new FormData()
    form.append('file', file)

    try {
      const result = await axios.post(`http://localhost:3001/upload`, form)
      setPlaca(result.data)
      console.log(result.data)
    } catch (err) {
      console.log("erro na req: ", err)
    }
  }

  return (
    <>
      <header>
        <h1>Leitor de Placas</h1>
      </header>
      <main>
        <form onSubmit={submit}>
          <label htmlFor="file" onClick={() => setPlaca(null)}>
            📁 Escolher imagem
          </label>
          <input type="file" id="file" onChange={e => setFile(e.target.files[0])} />
          {file && (<p>Arquivo: {file.name}</p>)}
          <button>Enviar</button>

          {placa ? (<h2>Resultado: {placa}</h2>) : (<h2>Resultado: ...</h2>)}
        </form>
      </main>
    </>
  )
}

export default App
