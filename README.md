# Frontend – Leitor de Placas Veiculares

Este é o frontend do sistema de identificação de placas de veículos (carros e motos), desenvolvido em **React**. Ele permite fazer o upload de imagens e enviá-las para o backend para leitura via OCR.

## 🔧 Tecnologias Utilizadas

- React
- React Image Crop
- Axios (requisições HTTP)

---

## 🚀 Como rodar localmente

### 1. Clone este repositório
```bash
git clone https://github.com/seu-usuario/nome-do-repo-frontend.git
cd nome-do-repo-frontend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie a aplicação

```bash
npm start
```

> O frontend estará disponível em [http://localhost:5173](http://localhost:5173)

## ⚙️ Configuração

Certifique-se de que o backend está rodando em [http://localhost:3001](http://localhost:3001),  
ou atualize a URL das requisições no código (por exemplo, nas chamadas do Axios).

## 📸 Funcionalidades

- Captura de imagem  
- Envio da imagem para o backend  
- Exibição da placa identificada na resposta
