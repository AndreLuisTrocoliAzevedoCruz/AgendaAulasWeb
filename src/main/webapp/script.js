// ==============================================================
// 		EVENTOS

reset = function() {
    let req = new XMLHttpRequest();
    req.open("POST", "ControllerServlet", true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.onreadystatechange = () => {
        if (req.readyState == 4 && req.status == 200) {
            atualizaSessao();
            window.location.href = "/prova1";
        } else {
            // Em caso de falha, você pode decidir o que fazer aqui
            console.error("Falha ao resetar");
        }
    }
    req.send("op=RESET");
}

// NOVA AULA
novaAula = function() {
	window.location.href = "nova";
}

// CANCELA NOVA AULA (OU EDIÇÃO)
calcelarNovaAula = function() {
	window.location.href = "/prova1";
}

// EDITA UMA AULA COM ID ESPECIFICADO
editarAula = function(id) {
	window.location.href = "edit?id=" + id;
}

enviarNovaAula = function() {
    // obtém os valores a partir do formulário
    let data = document.getElementById('data-id').value;
    let horario = document.getElementById('hora-id').value;
    let duracao = document.getElementById('dur-id').value;
    let codDisciplina = document.getElementById('disc-id').value;
    let assunto = document.getElementById('ass-id').value;
    
    // Verifica a validação dos dados
    if (!validaNovaAula(data, horario, duracao, codDisciplina, assunto)) {
        document.getElementById('msg-id').style.display = 'block';
        return;
    }
    
    // Cria uma nova requisição AJAX POST
    let req = new XMLHttpRequest();
    req.open("POST", "ControllerServlet", true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.onreadystatechange = () => {
        if (req.readyState == 4) {
            if (req.status == 200) {
                // Requisição bem-sucedida, atualiza a sessão e redireciona para "/prova1"
                atualizaSessao();
                window.location.href = "/prova1";
            } else {
                // Requisição falhou, faça algo aqui (por exemplo, mostrar uma mensagem de erro)
                console.error("Falha ao enviar nova aula");
            }
        }
    }
    
    // Envia os parâmetros da nova aula para a ControllerServlet
    let params = `op=CREATE&data=${data}&horario=${horario}&duracao=${duracao}&codDisciplina=${codDisciplina}&assunto=${assunto}`;
    req.send(params);
}


enviarEdit = function() {
    let id = document.getElementById('id').innerHTML;
    let data = document.getElementById('data-id').value;
    let horario = document.getElementById('hora-id').value;
    let duracao = document.getElementById('dur-id').value;
    let codDisciplina = document.getElementById('disc-id').value;
    let assunto = document.getElementById('ass-id').value;

    // Reformatar a data para o formato "dd/mm/yyyy"
    //let partesData = data.split('-');
    //let dataFormatada = partesData[2] + '/' + partesData[1] + '/' + partesData[0];
    
    if (!(/^\d+$/.test(duracao)) || parseInt(duracao) <= 0) {
        alert("A duração da aula deve ser um número inteiro positivo.");
        return; // Impede o envio do formulário se a validação falhar
    }

    let req = new XMLHttpRequest();
    req.open("POST", "ControllerServlet", true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.onreadystatechange = () => {
        if (req.readyState == 4) {
            if (req.status == 200) {
                atualizaSessao();
                window.location.href = "/prova1";
            } else {
                console.error("Falha ao enviar edição da aula");
            }
        }
    }
    
    // Use a data formatada ao enviar os parâmetros da aula editada para a ControllerServlet
    //let params = "op=UPDATE&id=${id}&data=${dataFormatada}&horario=${horario}&duracao=${duracao}&codDisciplina=${codDisciplina}&assunto=${assunto}";
    //let params = "op=UPDATE&id" + id + "&data"
    req.send("op=UPDATE&id=" + id + "&data=" + data + "&horario=" + horario + "&duracao="
		+ duracao + "&codDisciplina=" + codDisciplina + "&assunto=" + assunto);
    //req.send(params);
    
}

// DELETA UMA AULA
deleta = function(id) {
    // Cria uma nova requisição AJAX POST
    let req = new XMLHttpRequest();
    req.open("POST", "ControllerServlet", true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.onreadystatechange = () => {
        if (req.readyState == 4) {
            if (req.status == 200) {
                // Requisição bem-sucedida, atualiza a sessão e redireciona para "/prova1"
                atualizaSessao();
                window.location.href = "/prova1";
            } else {
                // Requisição falhou, faça algo aqui (por exemplo, mostrar uma mensagem de erro)
                console.error("Falha ao excluir aula");
            }
        }
    }

    // Envia o parâmetro 'id' para a ControllerServlet para identificar qual aula deve ser deletada
    req.send(`op=DELETE&id=${id}`);
}




const atualizaSessao = function() {
	let req = new XMLHttpRequest();
	req.open("POST", "ControllerServlet", true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.onreadystatechange = () => {
		if (req.readyState == 4 && req.status == 200) {
			// O QUE FAZER SE DEU CERTO
		} else {
			// O QUE FAZER SE DEU ERRADO
		}
	}
	req.send("op=START_SESSION");
}



// ============================================================
// 			VALIDAÇÕES

validaNovaAula = function(data, horario, duracao, codDisciplina, assunto) {
    // Verifica se algum campo está vazio
    if (data.trim() === '' || horario.trim() === '' || duracao.trim() === '' || codDisciplina.trim() === '' || assunto.trim() === ''|| parseInt(duracao) <= 0) {
        // Se algum campo estiver vazio, retorna falso
        return false;
    } else {
        // Se todos os campos estiverem preenchidos, retorna verdadeiro
        return true;
    }
}





// ===================================================================================
// 		INICIALIZA O PROCESSAMENTO

atualizaSessao();
