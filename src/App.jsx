import { useState } from "react"
import axios from 'axios'
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop'
import { useRef } from "react";
import 'react-image-crop/dist/ReactCrop.css'

function App() {
  const [crop, setCrop] = useState()
  const [error, setError] = useState()
  const [imgSrc, setImgSrc] = useState()
  const [placa, setPlaca] = useState()
  const imgRef = useRef(null);
  const MIN_DIMENSIONS = 150

  async function submit(e) {
    e.preventDefault();

    if (!imgRef.current || !crop?.width || !crop?.height) {
      setError("Imagem ou crop inválido");
      return;
    }

    const croppedBlob = await getCroppedImg(imgRef.current, crop);

    const form = new FormData();
    form.append('file', croppedBlob, 'crop.jpg');

    try {
      const result = await axios.post('http://localhost:3001/upload', form);
      setPlaca(result.data);
      console.log(result.data);
    } catch (err) {
      console.log("erro na req: ", err);
    }
  }

  function onImageLoad(e) {
    const { width, height } = e.currentTarget
    const widthPer = (MIN_DIMENSIONS / width) * 100

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: widthPer,
      },
      1, // aspect ratio (largura / altura)
      width,
      height // agora com height correto
    );
    const centeredCrop = centerCrop(crop, width, height)
    setCrop(centeredCrop);
  }

  function getCroppedImg(image, crop) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width;
    canvas.height = crop.height;

    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/jpeg', 1);
    });
  }

  return (
    <>
      <header>
        <h1>Leitor de Placas</h1>
      </header>
      <main>
        <h1>Envie a sua imagem</h1>
        <form onSubmit={submit}>
          <label htmlFor="file" onClick={() => setPlaca(null)}>
            📁 Escolher imagem
          </label>
          <input type="file" id="file" onChange={e => {
            const img = e.target.files?.[0]
            if (!img) return

            const reader = new FileReader()
            reader.addEventListener('load', () => {
              const imageElement = new Image()
              const imgUrl = reader.result?.toString()
              imageElement.src = imgUrl

              imageElement.addEventListener('load', (e) => {
                const { naturalWidth, naturalHeight } = e.currentTarget;

                if (naturalWidth < MIN_DIMENSIONS || naturalHeight < MIN_DIMENSIONS) {
                  setError("A imagem precisa ter mais de 150 x 150px")
                  return setImgSrc("")
                } else {
                  setError("")
                }
              })
              setImgSrc(imgUrl)
              console.log(imgUrl)
            })
            reader.readAsDataURL(img)
            // setFile(e.target.files[0])
          }} />
          {file && (<p>{file.name}</p>)}
          {error && (<p>{error}</p>)}
          {imgSrc && (
            <div>
              <ReactCrop
                crop={crop}
                keepSelection
                onChange={(pixelCrop, percentCrop) => setCrop(pixelCrop)}>
                <img src={imgSrc} alt="Image" style={{ maxHeigth: "70vh" }} onLoad={onImageLoad} ref={imgRef} />
              </ReactCrop>
            </div>
          )}
          {placa && (<h2>Resultado: {placa}</h2>)}
          <button>Enviar</button>
        </form>
      </main>
    </>
  )
}

export default App
