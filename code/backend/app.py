#De preferência criar uma venv antes de realizar o comando a seguir:

#pip install Flask mysql-connector-python Flask-Bcrypt flask-cors
#ou
#pip3 install Flask mysql-connector-python Flask-Bcrypt flask-cors


from flask import Flask, request, jsonify
import mysql.connector
from flask_bcrypt import Bcrypt

# Configuração de cabeçalhos CORS manualmente
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

#Necessario banco mysql já com o banco a ser utilizado criado e rodando. Colocar os dados de acesso do mesmo abaixo antes de inicializar:

# Configurações do banco de dados
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '123',
    'database': 'Laboratorio',
    'ssl_disabled': True,
}

# Função para conectar ao banco de dados
def get_db_connection():
    return mysql.connector.connect(**db_config)

def obter_usuario_por_login(username):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        query = "SELECT * FROM Usuarios WHERE Login = %s"
        cursor.execute(query, (username,))
        usuario = cursor.fetchone()
        return usuario

    except Error as e:
        print(f"Erro ao obter usuário por login: {e}")

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

    return None

def verificar_senha(password, senha_hash):
    try:
        # Use a função check_password_hash da biblioteca Flask-Bcrypt
        return bcrypt.check_password_hash(senha_hash, password)

    except Exception as e:
        print(f"Erro ao verificar senha: {e}")

    return False

@app.route('/login', methods=['POST'])
def login():
    dados_formulario = request.json
    username = dados_formulario['username']
    password = dados_formulario['password']

    # Verificar se o usuário existe
    usuario = obter_usuario_por_login(username)
    if not usuario:
        return jsonify({"message": "Usuário não encontrado"}), 401

    # Verificar a senha
    if not verificar_senha(password, usuario['Senha']):
        return jsonify({"message": "Credenciais inválidas"}), 401

    # Autenticação bem-sucedida
    # Aqui é possível gerar um token JWT ou criar uma sessão de usuário, dependendo da abordagem de autenticação.

    return jsonify({"message": "Login bem-sucedido"}), 200
######### CRUD USUARIOS

# Rota para criar um usuário
@app.route('/usuarios', methods=['POST'])
def criar_usuario_rota():
    dados_usuario = request.json

    # Verificar se o usuário já existe pelo Login
    usuario_existente = obter_usuario_por_login(dados_usuario['Login'])
    if usuario_existente:
        return jsonify({"message": "Login já em uso"}), 400

    # Criar o usuário
    criar_usuario(dados_usuario)

    return jsonify({"message": "Usuário criado com sucesso!"})

# Função para criar um usuário
def criar_usuario(dados_usuario):
    connection = get_db_connection()
    cursor = connection.cursor()

    senha_hash = bcrypt.generate_password_hash(dados_usuario['Senha']).decode('utf-8')

    cursor.execute("""
        INSERT INTO Usuarios (Nome, Sobrenome, Funcao, Login, Senha, URIFotoUsuario)
        VALUES (%s, %s, %s, %s, %s, %s)
    """, (
        dados_usuario['Nome'],
        dados_usuario['Sobrenome'],
        dados_usuario['Funcao'],
        dados_usuario['Login'],
        senha_hash,
        dados_usuario['URIFotoUsuario']
    ))

    connection.commit()
    connection.close()

# Rota para obter um usuário pelo ID
@app.route('/usuarios/<int:usuario_id>', methods=['GET'])
def obter_usuario(usuario_id):
    usuario = obter_usuario_por_id(usuario_id)
    if usuario:
        return jsonify(usuario)
    else:
        return jsonify({"message": "Usuário não encontrado"}), 404
    
# Função para obter um usuário pelo ID
def obter_usuario_por_id(usuario_id):
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM Usuarios WHERE ID = %s", (usuario_id,))
    usuario = cursor.fetchone()

    connection.close()

    if usuario:
        usuario_dict = {
            'ID': usuario[0],
            'Nome': usuario[1],
            'Sobrenome': usuario[2],
            'Funcao': usuario[3],
            'Login': usuario[4],
            'URIFotoUsuario': usuario[6]
        }
        return usuario_dict
    else:
        return None

# Rota para atualizar um usuário pelo ID
@app.route('/usuarios/<int:usuario_id>', methods=['PUT'])
def atualizar_usuario(usuario_id):
    dados_atualizados = request.json

    # Verificar se o usuário existe
    usuario_existente = obter_usuario_por_id(usuario_id)
    if not usuario_existente:
        return jsonify({"message": "Usuário não encontrado"}), 404

    # Atualizar os dados
    atualizar_usuario_por_id(usuario_id, dados_atualizados)

    return jsonify({"message": "Usuário atualizado com sucesso!"})

# Função para atualizar um usuário pelo ID
def atualizar_usuario_por_id(usuario_id, novos_dados):
    connection = get_db_connection()
    cursor = connection.cursor()

    # Montar a string de atualização
    update_query = "UPDATE Usuarios SET "
    update_values = []

    for chave, valor in novos_dados.items():
        update_query += f"{chave} = %s, "
        update_values.append(valor)

    # Remover a vírgula extra no final
    update_query = update_query[:-2]

    # Adicionar a condição WHERE
    update_query += f" WHERE ID = {usuario_id}"

    # Executar a atualização
    cursor.execute(update_query, tuple(update_values))
    connection.commit()

    connection.close()

# Rota para deletar um usuário pelo ID
@app.route('/usuarios/<int:usuario_id>', methods=['DELETE'])
def deletar_usuario(usuario_id):
    # Verificar se o usuário existe
    usuario_existente = obter_usuario_por_id(usuario_id)
    if not usuario_existente:
        return jsonify({"message": "Usuário não encontrado"}), 404

    # Deletar o usuário
    deletar_usuario_por_id(usuario_id)

    return jsonify({"message": "Usuário deletado com sucesso!"})

# Função para deletar um usuário pelo ID
def deletar_usuario_por_id(usuario_id):
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("DELETE FROM Usuarios WHERE ID = %s", (usuario_id,))
    connection.commit()

    connection.close()

######### 

######### CRUD LIVROS

# Rota para criar um livro
@app.route('/livros', methods=['POST'])
def criar_livro_rota():
    dados_livro = request.json

    # Verificar se o livro já existe pelo ISBN 
    livro_existente = obter_livro_por_isbn(dados_livro['ISBN'])
    if livro_existente:
        return jsonify({"message": "Livro já cadastrado"}), 400

    # Criar o livro
    criar_livro(dados_livro)

    return jsonify({"message": "Livro cadastrado com sucesso!"})

# Função para criar um livro
def criar_livro(dados_livro):
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO Livros (ISBN, Titulo, Autor, Descricao, Categoria, DataAquisicao, EstadoConservacao, LocalizacaoFisica, URICapaLivro)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        dados_livro['ISBN'],
        dados_livro['Titulo'],
        dados_livro['Autor'],
        dados_livro['Descricao'],
        dados_livro['Categoria'],
        dados_livro['DataAquisicao'],
        dados_livro['EstadoConservacao'],
        dados_livro['LocalizacaoFisica'],
        dados_livro['URICapaLivro']
    ))

    connection.commit()
    connection.close()

# Rota para obter todos os livros
@app.route('/livros', methods=['GET'])
def obter_todos_os_livros():
    livros = obter_todos_os_livros_db()
    return jsonify(livros)

# Função para obter todos os livros
def obter_todos_os_livros_db():
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM Livros")
    livros = cursor.fetchall()

    connection.close()

    lista_livros = []
    for livro in livros:
        livro_dict = {
            'ISBN': livro[0],
            'Titulo': livro[1],
            'Autor': livro[2],
            'Descricao': livro[3],
            'Categoria': livro[4],
            'DataAquisicao': livro[5].strftime('%Y-%m-%d'),
            'EstadoConservacao': livro[6],
            'LocalizacaoFisica': livro[7],
            'URICapaLivro': livro[8]
        }
        lista_livros.append(livro_dict)

    return lista_livros

# Rota para obter um livro pelo ISBN
@app.route('/livros/<string:isbn>', methods=['GET'])
def obter_livro(isbn):
    livro = obter_livro_por_isbn(isbn)
    if livro:
        return jsonify(livro)
    else:
        return jsonify({"message": "Livro não encontrado"}), 404

# Função para obter um livro pelo ISBN
def obter_livro_por_isbn(isbn):
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM Livros WHERE ISBN = %s", (isbn,))
    livro = cursor.fetchone()

    connection.close()

    if livro:
        livro_dict = {
            'ISBN': livro[0],
            'Titulo': livro[1],
            'Autor': livro[2],
            'Descricao': livro[3],
            'Categoria': livro[4],
            'DataAquisicao': livro[5].strftime('%Y-%m-%d'),
            'EstadoConservacao': livro[6],
            'LocalizacaoFisica': livro[7],
            'URICapaLivro': livro[8]
        }
        return livro_dict
    else:
        return None

# Rota para atualizar um livro pelo ISBN
@app.route('/livros/<string:isbn>', methods=['PUT'])
def atualizar_livro(isbn):
    dados_atualizados = request.json

    # Verificar se o livro existe
    livro_existente = obter_livro_por_isbn(isbn)
    if not livro_existente:
        return jsonify({"message": "Livro não encontrado"}), 404

    # Atualizar os dados
    atualizar_livro_por_isbn(isbn, dados_atualizados)

    return jsonify({"message": "Livro atualizado com sucesso!"})

# Função para atualizar um livro pelo ISBN
def atualizar_livro_por_isbn(isbn, novos_dados):
    connection = get_db_connection()
    cursor = connection.cursor()

    # Montar a string de atualização
    update_query = "UPDATE Livros SET "
    update_values = []

    for chave, valor in novos_dados.items():
        update_query += f"{chave} = %s, "
        update_values.append(valor)

    # Remover a vírgula extra no final
    update_query = update_query[:-2]

    # Adicionar a condição WHERE
    update_query += f" WHERE ISBN = %s"

    # Adicionar o ISBN aos valores de atualização
    update_values.append(isbn)

    # Executar a atualização
    cursor.execute(update_query, tuple(update_values))
    connection.commit()

    connection.close()

# Rota para deletar um livro pelo ISBN
@app.route('/livros/<string:isbn>', methods=['DELETE'])
def deletar_livro(isbn):
    # Verificar se o livro existe
    livro_existente = obter_livro_por_isbn(isbn)
    if not livro_existente:
        return jsonify({"message": "Livro não encontrado"}), 404

    # Deletar o livro
    deletar_livro_por_isbn(isbn)

    return jsonify({"message": "Livro deletado com sucesso!"})

# Função para deletar um livro pelo ISBN
def deletar_livro_por_isbn(isbn):
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("DELETE FROM Livros WHERE ISBN = %s", (isbn,))
    connection.commit()

    connection.close()

######### 

######### CRUD MATERIAIS DIDÁTICOS

# Rota para criar um material didático
@app.route('/materiaisdidaticos', methods=['POST'])
def criar_material_didatico_rota():
    dados_material_didatico = request.json
    
    # Criar o material didático
    criar_material_didatico(dados_material_didatico)

    return jsonify({"message": "Material didático cadastrado com sucesso!"})

# Função para criar um material didático
def criar_material_didatico(dados_material_didatico):
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO MateriaisDidaticos (Descricao, Categoria, NumeroSerie, DataAquisicao, EstadoConservacao, LocalizacaoFisica, URIFotoMaterial)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """, (
        dados_material_didatico['Descricao'],
        dados_material_didatico['Categoria'],
        dados_material_didatico['NumeroSerie'],
        dados_material_didatico['DataAquisicao'],
        dados_material_didatico['EstadoConservacao'],
        dados_material_didatico['LocalizacaoFisica'],
        dados_material_didatico['URIFotoMaterial']
    ))

    connection.commit()
    connection.close()

# Rota para obter todos os materiais didáticos
@app.route('/materiaisdidaticos', methods=['GET'])
def obter_todos_os_materiais_didaticos():
    materiais_didaticos = obter_todos_os_materiais_didaticos_db()
    return jsonify(materiais_didaticos)

# Função para obter todos os materiais didáticos
def obter_todos_os_materiais_didaticos_db():
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM MateriaisDidaticos")
    materiais_didaticos = cursor.fetchall()

    connection.close()

    lista_materiais_didaticos = []
    for material_didatico in materiais_didaticos:
        material_didatico_dict = {
            'ID': material_didatico[0],
            'Descricao': material_didatico[1],
            'Categoria': material_didatico[2],
            'NumeroSerie': material_didatico[3],
            'DataAquisicao': material_didatico[4].strftime('%Y-%m-%d'),
            'EstadoConservacao': material_didatico[5],
            'LocalizacaoFisica': material_didatico[6],
            'URIFotoMaterial': material_didatico[7]
        }
        lista_materiais_didaticos.append(material_didatico_dict)

    return lista_materiais_didaticos

# Rota para obter um material didático pelo ID
@app.route('/materiaisdidaticos/<int:material_id>', methods=['GET'])
def obter_material_didatico(material_id):
    material_didatico = obter_material_didatico_por_id(material_id)
    if material_didatico:
        return jsonify(material_didatico)
    else:
        return jsonify({"message": "Material didático não encontrado"}), 404

# Função para obter um material didático pelo ID
def obter_material_didatico_por_id(material_id):
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM MateriaisDidaticos WHERE ID = %s", (material_id,))
    material_didatico = cursor.fetchone()

    connection.close()

    if material_didatico:
        material_didatico_dict = {
            'ID': material_didatico[0],
            'Descricao': material_didatico[1],
            'Categoria': material_didatico[2],
            'NumeroSerie': material_didatico[3],
            'DataAquisicao': material_didatico[4].strftime('%Y-%m-%d'),
            'EstadoConservacao': material_didatico[5],
            'LocalizacaoFisica': material_didatico[6],
            'URIFotoMaterial': material_didatico[7]
        }
        return material_didatico_dict
    else:
        return None

# Rota para atualizar um material didático pelo ID
@app.route('/materiaisdidaticos/<int:material_id>', methods=['PUT'])
def atualizar_material_didatico(material_id):
    dados_atualizados = request.json

    # Verificar se o material didático existe
    material_didatico_existente = obter_material_didatico_por_id(material_id)
    if not material_didatico_existente:
        return jsonify({"message": "Material didático não encontrado"}), 404

    # Atualizar os dados
    atualizar_material_didatico_por_id(material_id, dados_atualizados)

    return jsonify({"message": "Material didático atualizado com sucesso!"})

# Função para atualizar um material didático pelo ID
def atualizar_material_didatico_por_id(material_id, novos_dados):
    connection = get_db_connection()
    cursor = connection.cursor()

    # Montar a string de atualização
    update_query = "UPDATE MateriaisDidaticos SET "
    update_values = []

    for chave, valor in novos_dados.items():
        update_query += f"{chave} = %s, "
        update_values.append(valor)

    # Remover a vírgula extra no final
    update_query = update_query[:-2]

    # Adicionar a condição WHERE
    update_query += f" WHERE ID = {material_id}"

    # Executar a atualização
    cursor.execute(update_query, tuple(update_values))
    connection.commit()

    connection.close()

# Rota para deletar um material didático pelo ID
@app.route('/materiaisdidaticos/<int:material_id>', methods=['DELETE'])
def deletar_material_didatico(material_id):
    # Verificar se o material didático existe
    material_didatico_existente = obter_material_didatico_por_id(material_id)
    if not material_didatico_existente:
        return jsonify({"message": "Material didático não encontrado"}), 404

    # Deletar o material didático
    deletar_material_didatico_por_id(material_id)

    return jsonify({"message": "Material didático deletado com sucesso!"})

# Função para deletar um material didático pelo ID
def deletar_material_didatico_por_id(material_id):
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("DELETE FROM MateriaisDidaticos WHERE ID = %s", (material_id,))
    connection.commit()

    connection.close()
    
############

######### CRUD EMPRÉSTIMOS

# Rota para criar um empréstimo
@app.route('/emprestimos', methods=['POST'])
def criar_emprestimo_rota():
    dados_emprestimo = request.json
    
    # Criar o empréstimo
    return criar_emprestimo(dados_emprestimo)

# Função para criar um empréstimo
def criar_emprestimo(dados_emprestimo):
    connection = get_db_connection()
    cursor = connection.cursor()

    tipo_emprestimo = dados_emprestimo['TipoEmprestimo']
      
    # Verificar se já existe um empréstimo
    emprestimo_existente = verificar_emprestimo_existente(
        tipo_emprestimo,
        dados_emprestimo.get('ISBNLivro'),  # Utilize get() para lidar com valores opcionais
        dados_emprestimo.get('IDMaterialDidatico')  # Utilize get() para lidar com valores opcionais
    )

    if emprestimo_existente:
        return jsonify({"message": "Já existe um empréstimo ativo para este item."}), 400

    if tipo_emprestimo == 'Livro':
        cursor.execute("""
            INSERT INTO Emprestimos (IDUsuario, TipoEmprestimo, ISBNLivro, DataEmprestimo, DataDevolucaoPrevista, Status)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (
            dados_emprestimo['IDUsuario'],
            tipo_emprestimo,
            dados_emprestimo['ISBNLivro'],
            dados_emprestimo['DataEmprestimo'],
            dados_emprestimo['DataDevolucaoPrevista'],
            'Emprestado'
        ))
    elif tipo_emprestimo == 'MaterialDidatico':
        cursor.execute("""
            INSERT INTO Emprestimos (IDUsuario, TipoEmprestimo, IDMaterialDidatico, DataEmprestimo, DataDevolucaoPrevista, Status)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (
            dados_emprestimo['IDUsuario'],
            tipo_emprestimo,
            dados_emprestimo['IDMaterialDidatico'],
            dados_emprestimo['DataEmprestimo'],
            dados_emprestimo['DataDevolucaoPrevista'],
            'Emprestado'
        ))

    connection.commit()
    connection.close()

    return jsonify({"message": "Empréstimo cadastrado com sucesso!"})
    
def verificar_emprestimo_existente(tipo_emprestimo, isbn_livro=None, id_material_didatico=None):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("""
        SELECT * FROM Emprestimos
        WHERE TipoEmprestimo = %s
        AND ((ISBNLivro = %s AND IDMaterialDidatico IS NULL)
             OR (IDMaterialDidatico = %s AND ISBNLivro IS NULL))
        AND Status = 'Emprestado'
    """, (tipo_emprestimo, isbn_livro, id_material_didatico))

    emprestimo_existente = cursor.fetchone()

    connection.close()

    return emprestimo_existente

# Rota para obter todos os empréstimos
@app.route('/emprestimos', methods=['GET'])
def obter_todos_os_emprestimos():
    emprestimos = obter_todos_os_emprestimos_db()
    return jsonify(emprestimos)

# Função para obter todos os empréstimos
def obter_todos_os_emprestimos_db():
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM Emprestimos")
    emprestimos = cursor.fetchall()

    connection.close()

    lista_emprestimos = []
    for emprestimo in emprestimos:
        emprestimo_dict = {
            'ID': emprestimo[0],
            'IDUsuario': emprestimo[1],
            'TipoEmprestimo': emprestimo[2],
            'ISBNLivro': emprestimo[3],
            'IDMaterialDidatico': emprestimo[4],
            'DataEmprestimo': emprestimo[5].strftime('%Y-%m-%d'),
            'DataDevolucaoPrevista': emprestimo[6].strftime('%Y-%m-%d'),
            'Status': emprestimo[7]
        }
        lista_emprestimos.append(emprestimo_dict)

    return lista_emprestimos

# Rota para obter um empréstimo pelo ID
@app.route('/emprestimos/<int:emprestimo_id>', methods=['GET'])
def obter_emprestimo(emprestimo_id):
    emprestimo = obter_emprestimo_por_id(emprestimo_id)
    if emprestimo:
        return jsonify(emprestimo)
    else:
        return jsonify({"message": "Empréstimo não encontrado"}), 404

# Função para obter um empréstimo pelo ID
def obter_emprestimo_por_id(emprestimo_id):
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM Emprestimos WHERE ID = %s", (emprestimo_id,))
    emprestimo = cursor.fetchone()

    connection.close()

    if emprestimo:
        emprestimo_dict = {
            'ID': emprestimo[0],
            'IDUsuario': emprestimo[1],
            'TipoEmprestimo': emprestimo[2],
            'ISBNLivro': emprestimo[3],
            'IDMaterialDidatico': emprestimo[4],
            'DataEmprestimo': emprestimo[5].strftime('%Y-%m-%d'),
            'DataDevolucaoPrevista': emprestimo[6].strftime('%Y-%m-%d'),
            'Status': emprestimo[7]
        }
        return emprestimo_dict
    else:
        return None
    
# Rota para obter todos os empréstimos de um usuário pelo ID do usuário
@app.route('/emprestimos/usuario/<int:id_usuario>', methods=['GET'])
def obter_emprestimos_por_usuario(id_usuario):
    emprestimos_usuario = obter_emprestimos_por_id_usuario(id_usuario)

    if emprestimos_usuario:
        return jsonify(emprestimos_usuario)
    else:
        return jsonify({"message": f"Empréstimos não encontrados para o usuário com ID {id_usuario}"}), 404

# Função para obter todos os empréstimos de um usuário pelo ID do usuário
def obter_emprestimos_por_id_usuario(id_usuario):
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT E.*, L.Titulo as titulo, L.Autor as autor,
               MD.NumeroSerie as num_serie
        FROM Emprestimos E
        LEFT JOIN Livros L ON E.ISBNLivro = L.ISBN
        LEFT JOIN MateriaisDidaticos MD ON E.IDMaterialDidatico = MD.ID
        WHERE E.IDUsuario = %s
    """, (id_usuario,))
    emprestimos_usuario = cursor.fetchall()

    connection.close()

    lista_emprestimos_usuario = []
    for emprestimo in emprestimos_usuario:
        emprestimo_dict = {
            'ID': emprestimo[0],
            'IDUsuario': emprestimo[1],
            'TipoEmprestimo': emprestimo[2],
            'Livro': {
                'ISBN': emprestimo[3],
                'Titulo': emprestimo[8],  # Índice 8 é o 'titulo'
                'Autor': emprestimo[9],   # Índice 9 é o 'autor'
            } if emprestimo[2] == 'Livro' else None,
            'MaterialDidatico': {
                'ID': emprestimo[4],
                'NumeroSerie': emprestimo[10],  # Índice 10 é o 'num_serie'
            } if emprestimo[2] == 'MaterialDidatico' else None,
            'DataEmprestimo': emprestimo[5].strftime('%Y-%m-%d'),
            'DataDevolucaoPrevista': emprestimo[6].strftime('%Y-%m-%d'),
            'Status': emprestimo[7]
        }
        lista_emprestimos_usuario.append(emprestimo_dict)

    return lista_emprestimos_usuario

# Rota para atualizar um empréstimo pelo ID
@app.route('/emprestimos/<int:emprestimo_id>', methods=['PUT'])
def atualizar_emprestimo(emprestimo_id):
    dados_atualizados = request.json

    # Verificar se o empréstimo existe
    emprestimo_existente = obter_emprestimo_por_id(emprestimo_id)
    if not emprestimo_existente:
        return jsonify({"message": "Empréstimo não encontrado"}), 404

    # Atualizar os dados
    atualizar_emprestimo_por_id(emprestimo_id, dados_atualizados)

    return jsonify({"message": "Empréstimo atualizado com sucesso!"})

# Função para atualizar um empréstimo pelo ID
def atualizar_emprestimo_por_id(emprestimo_id, novos_dados):
    connection = get_db_connection()
    cursor = connection.cursor()

    # Montar a string de atualização
    update_query = "UPDATE Emprestimos SET "
    update_values = []

    for chave, valor in novos_dados.items():
        update_query += f"{chave} = %s, "
        update_values.append(valor)

    # Remover a vírgula extra no final
    update_query = update_query[:-2]

    # Adicionar a condição WHERE
    update_query += f" WHERE ID = {emprestimo_id}"

    # Executar a atualização
    cursor.execute(update_query, tuple(update_values))
    connection.commit()

    connection.close()

# Rota para deletar um empréstimo pelo ID
@app.route('/emprestimos/<int:emprestimo_id>', methods=['DELETE'])
def deletar_emprestimo(emprestimo_id):
    # Verificar se o empréstimo existe
    emprestimo_existente = obter_emprestimo_por_id(emprestimo_id)
    if not emprestimo_existente:
        return jsonify({"message": "Empréstimo não encontrado"}), 404

    # Deletar o empréstimo
    deletar_emprestimo_por_id(emprestimo_id)

    return jsonify({"message": "Empréstimo deletado com sucesso!"})

# Função para deletar um empréstimo pelo ID
def deletar_emprestimo_por_id(emprestimo_id):
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("DELETE FROM Emprestimos WHERE ID = %s", (emprestimo_id,))
    connection.commit()

    connection.close()

def table_exists(table_name):
    connection = get_db_connection()
    cursor = connection.cursor()
    
    # Verifica se a tabela existe
    cursor.execute("SHOW TABLES LIKE %s", (table_name,))
    result = cursor.fetchone()
    
    connection.close()
    
    return result is not None

if __name__ == '__main__':
    app.run(debug=True)
