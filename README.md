# **Fundamentos do NodeJS**

Esta branch foi construída para praticar os conhecimentos obtidos durante o projeto, na pasta TRAINING, onde ainda no meio do módulo, criei uma api seguindo o mesmo contexto do projeto, porém fixando melhor meus conhecimentos.

A aplicação foi desenvolvida  para explorar os principais **métodos HTTP**: `GET`, `POST`, `PUT`, e `DELETE`, além de processar **query params**, **route params** e o **corpo da requisição**.

---

## **Recursos da API**

A API foi projetada para demonstrar funcionalidades básicas. Cada funcionalidade é acessada através dos métodos HTTP:

### **1. GET**
- **Descrição:** Recupera informações do servidor.
- **Exemplo de rota:** `/users?search=nome`
  - **Query Params:** Usado para buscar usuários por algum termo específico.
  - **Exemplo de Query:** `search=John` (busca por "John").

### **2. POST**
- **Descrição:** Cria um novo recurso no servidor.
- **Exemplo de rota:** `/users`
  - **Body da Requisição:** Deve conter os dados do usuário a ser criado.
  - **Formato esperado:**
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com"
    }
    ```

### **3. PUT**
- **Descrição:** Atualiza um recurso existente.
- **Exemplo de rota:** `/users/:id`
  - **Route Params:** Identifica o recurso pelo `id`.
  - **Body da Requisição:** Deve conter os dados a serem atualizados.
  - **Formato esperado:**
    ```json
    {
      "name": "Jane Doe",
      "email": "jane.doe@example.com"
    }
    ```

### **4. DELETE**
- **Descrição:** Remove um recurso existente.
- **Exemplo de rota:** `/users/:id`
  - **Route Params:** Identifica o recurso pelo `id`.

