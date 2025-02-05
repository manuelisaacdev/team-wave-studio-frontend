# TeamWave Studio

## 📌 Descrição
O **TeamWave Studio** é a dashboard do artista dentro do ecossistema **TeamWave**, permitindo a gestão de **músicas, vídeo clips, álbuns, playlists e conta do artista**.

Este projeto foca na simplicidade e eficiência, proporcionando uma interface moderna e responsiva para artistas gerenciarem seu conteúdo de forma intuitiva.

## 🚀 Tecnologias Utilizadas
- **🖥️ Frontend:** Next.js
- **🎨 Estilização:** Tailwind CSS
- **🔄 Gerenciamento de Estado:** Context API / Zustand (se aplicável)
- **🛠️ Backend:** Microsserviços do TeamWave
- **🔐 Autenticação:** JWT / OAuth2 (se aplicável)
- **🗄️ Banco de Dados:** PostgreSQL / MongoDB (dependendo do microsserviço)
- **☁️ Hospedagem:** Vercel / Docker (se aplicável)

## 🎯 Funcionalidades Principais
✅ Gerenciamento de músicas (upload, edição, remoção)  
✅ Gerenciamento de álbuns e playlists  
✅ Upload e gestão de capas para álbuns e playlists  
✅ Controle e estatísticas sobre o desempenho das músicas  
✅ Personalização do perfil do artista  
✅ Integração com serviços de streaming do TeamWave  
✅ Sistema de notificações e interações  

## 🛠️ Instalação e Execução
### 🔧 Requisitos
- Node.js 18+
- npm ou yarn
- Docker (opcional, para microsserviços locais)

### 📥 Passos
1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/teamwave-studio.git
   cd teamwave-studio
   ```
2. Instale as dependências:
   ```sh
   npm install
   # ou
   yarn install
   ```
3. Configure as variáveis de ambiente (**.env.local**):
   ```ini
   NEXT_PUBLIC_API_URL=https://api.teamwave.com
   NEXT_PUBLIC_AUTH_TOKEN=seu-token-aqui
   ```
4. Execute o projeto:
   ```sh
   npm run dev
   # ou
   yarn dev
   ```

O projeto rodará em `http://localhost:3000`.

## 🤝 Contribuição
1. Fork o repositório
2. Crie uma branch: `git checkout -b minha-feature`
3. Commit suas alterações: `git commit -m 'Adiciona nova funcionalidade'`
4. Envie para o repositório: `git push origin minha-feature`
5. Abra um Pull Request

## 📜 Licença
Este projeto está sob a licença MIT. Consulte o arquivo [`LICENSE`](LICENSE) para mais detalhes.

---

Feito com ❤️ por [Paciência Isaac Manuel](https://github.com/manuelisaacdev).

