import express from "express"; // Importa o framework Express para criar a aplicação web
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js"; // Importa as funções controladoras para lidar com a lógica dos posts
import multer from "multer"; // Importa o middleware Multer para lidar com uploads de arquivos
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

const storage = multer.diskStorage({ // Configura o armazenamento dos arquivos no disco
  destination: function (req, file, cb) { // Define o diretório de destino para os arquivos
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) { // Define o nome do arquivo
    cb(null, file.originalname);
  }
});

const upload = multer({ dest: "./uploads", storage }); // Cria uma instância do Multer com a configuração de armazenamento
// A linha acima é equivalente a: const upload = multer({ dest: "./uploads" }); em sistemas Linux/macOS

const routes = (app) => {
  app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições
  app.use(cors(corsOptions))
  // Define as rotas da aplicação
  app.get("/posts", listarPosts); // Rota para listar todos os posts
  app.post("/posts", postarNovoPost); // Rota para criar um novo post
  app.post("/upload", upload.single("imagem"), uploadImagem); // Rota para fazer upload de uma imagem

  app.put("/upload/:id", atualizarNovoPost)
};

export default routes; // Exporta a função das rotas para ser utilizada em outros módulos