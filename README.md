# IFRN Calc

O projeto calcula as médias necessárias para ser aprovado em todas as disciplina do IFRN. Tem integração com o SUAP para calcular as médias de maneira automática. O projeto

## Instalação

### Instalando o projeto

1. Clone o repositório

```bash
git clone https://github.com/ruangustavo/ifrncalc
```

2. Entre no diretório do projeto

```bash
cd ifrncalc
```

3. Instale as dependências

```bash
npm install
```

### Builde o projeto

```bash
npm run build
```

### Configurando o projeto

É necessário definir as variáveis de ambiente para que o projeto funcione corretamente. Para isso, crie um arquivo `.env` na raiz do projeto e defina as seguintes variáveis:

```bash
CLIENT_ID=<SEU_CLIENT_ID_AQUI>
CLIENT_SECRET=<SEU_CLIENT_SECRET_AQUI>
NEXTAUTH_SECRET=<SEU_NEXTAUTH_SECRET_AQUI>
NEXTAUTH_URL=<SEU_NEXTAUTH_URL_AQUI>
SUAP_URL=<SEU_SUAP_URL_AQUI>
```

Para obter o `CLIENT_ID` e o `CLIENT_SECRET`, é necessário criar um aplicativo no [Painel de Aplicativos do SUAP](https://suap.ifrn.edu.br/admin/api/aplicacaooauth2/). Para obter o `NEXTAUTH_SECRET`, basta gerar uma string aleatória e copiar o valor retornado. O `NEXTAUTH_URL` é a URL do seu site. O `SUAP_URL` é a URL do SUAP do seu campus.

## Contribuição

Para contribuir com o projeto, basta criar uma issue ou um pull request. O projeto está aberto para contribuições.
