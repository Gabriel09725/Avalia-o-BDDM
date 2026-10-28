# Histórico de Prompts Utilizados

### Prompt 1
Desenvolver um aplicativo que consiste em um jogo de adivinhação de números. O jogador deverá tentar descobrir um número sorteado aleatoriamente pelo aplicativo entre 1 e 100 e recebendo dicas que informam se o número a ser descoberto é maior ou menor.
O aplicativo deverá contabilizar as tentativas realizadas e armazenar os resultados no Firebase. Os resultados serão usados para uma tela de ranking dos jogadores.
As dicas sobre o número a ser descoberto devem ser exibidas em cores diferente: em verde se o número a ser descoberto for maior e em vermelho se o número for menor.
Ao acertar o número o jogador ganha e é informado das suas tentativas.
Para começar uma partida o jogador precisa informar o seu nickname.

O número aleatório pode ser gerado usando:
const numeroSorteado = Math.floor(Math.random() * 100) + 1;

me ajude a fazer essa atividade

---

### Prompt 2
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQ5j7QexNg_hyXNYfG05kQOx3qrVvDdR8",
  authDomain: "aula-4b7fc.firebaseapp.com",
  projectId: "aula-4b7fc",
  storageBucket: "aula-4b7fc.firebasestorage.app",
  messagingSenderId: "690460486832",
  appId: "1:690460486832:web:1a4f82355a881a09651f75",
  measurementId: "G-LEL1G4NEES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

arrume o firebase.tsx

---

### Prompt 3
e agora ?

---

### Prompt 4
e agora ?

---

### Prompt 5
ta no terminal preciso tirar um repositorio conectado e colocar outro

---

### Prompt 6
nao atualizou as pastas.

---

### Prompt 7
PS C:\projetos_vscode\primeira-atividade> git status
On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   package-lock.json
        modified:   package.json
        deleted:    src/app/Filmes.tsx
        deleted:    src/app/Pagamento.tsx
        deleted:    src/app/Sessoes.tsx
        modified:   src/app/_layout.tsx
        modified:   src/app/index.tsx
        deleted:    src/components/Aluno.tsx
        deleted:    src/components/AnaliseCredito.tsx
        deleted:    src/components/Cachorro.tsx
        deleted:    src/components/CardAlunos.tsx
        deleted:    src/components/ExemploStyle_Text.tsx
        deleted:    src/components/ExemploStyle_View.tsx
        deleted:    src/components/FormularioCredito.tsx
        deleted:    src/components/Funcionario.tsx
        deleted:    src/components/Gato.tsx
        deleted:    src/components/ListaAlunos.tsx
        deleted:    src/components/Mutiplicacao.tsx
        deleted:    src/components/Pessoa.tsx
        deleted:    src/components/Tela1.tsx
        deleted:    src/components/Tela2.tsx
        deleted:    src/components/Tela3.tsx

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        FireBase.ts
        src/app/jogo.tsx
        src/app/ranking.tsx

no changes added to commit (use "git add" and/or "git commit -a")

---
