import axios from 'axios';
import { format } from 'date-fns';
const btnCriar: HTMLButtonElement = document.getElementById('btn-criar') as HTMLButtonElement;
const tituloTarefa: HTMLInputElement = document.getElementById('tituloTarefa') as HTMLInputElement;
const descricaoTarefa: HTMLInputElement = document.getElementById('descricaoTarefa') as HTMLInputElement;
const listaTarefas: HTMLElement = document.getElementById('listaTarefas') as HTMLDivElement;
const alerta: HTMLElement = document.getElementById('alerta') as HTMLDivElement;
const numTarefas: HTMLElement = document.getElementById('NumeroTarefas') as HTMLSpanElement;

interface Tarefa {
    _id: any;
    title: string;
    description: string;
    createdAt: string;
}

interface ApiResponse {
    data: Tarefa[]
}

let tarefasConcluidas: Tarefa[] = [];

const criarTarefa = async (): Promise<void> => {
    const title: string = tituloTarefa.value;
    const description: string = descricaoTarefa.value;

    if (!title || !description) {
        exibirAlertDanger('Título e descrição são obrigatórios.');
        return;
    }

    const dados = {
        title,
        description,
    };

    try {
        const response = await axios.post<Tarefa>('https://gerenciador-tarefas-3.onrender.com/tarefa', dados, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 201) {
            exibirAlertSuccess('Tarefa criada com sucesso!');
            exibirTarefas();
        } else {
            console.log('Erro ao criar Tarefa');
        }

        limparInputs();
    } catch (err: any) {
        exibirAlertDanger(err.response.data.message);
    }
};

const exibirTarefas = async () => {
    try {
        const response = await axios.get<ApiResponse>('https://gerenciador-tarefas-3.onrender.com/tarefas');
        const tarefas = response.data.data;
        numTarefas.textContent = tarefas.length.toString();
        listaTarefas.innerHTML = '';
        if (tarefas.length !== 0) {
            tarefas.forEach((tarefa: Tarefa) => {
                const dataFormatada = format(new Date(tarefa.createdAt), 'dd/MM/yyyy');
                const col = document.createElement('div');
                col.setAttribute('class', 'col-12 card');
                col.setAttribute('id', 'Card');
                col.innerHTML = `
                        <div class="d-flex">
                            <input type="checkbox" name="concluida" id="checkConcluida">
                            <div class="titleDescricao">
                                <span class="title">${tarefa.title}</span>
                                <span class="descricao text-truncate" style="max-width: 150px;">${tarefa.description}</span>
                            </div>
                        </div>
                        <div class="contentIcons">
                            <div class="iconsEditTrash">
                                <button type="button" data-bs-toggle="modal" data-bs-target="#modalEditar"class="editar" id="btnEditar" data-id-editar="${tarefa._id}"><i class="fa-solid fa-pen caneta"></i></button>
                                <button class="apagar" data-id="${tarefa._id}" id="btnApagar"><i class="fa-solid fa-trash lixeira"></i></button>
                            </div>
                            <span class="data">${dataFormatada}</span>
                        </div>
                `;
                listaTarefas.appendChild(col);
            });

            const checkboxes = document.querySelectorAll('#checkConcluida');

            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('click', () => {
                    const card = checkbox.closest('#Card') as HTMLDivElement;
                    if ((checkbox as HTMLInputElement).checked) {
                        card.classList.add('card-apagado');
                    } else {
                        card.classList.remove('card-apagado');
                    }
                });
            });



            const btnID = document.querySelectorAll('#btnApagar');
            btnID.forEach(btnid => {
                const id = btnid.getAttribute('data-id');
                btnid.addEventListener('click', () => {
                    apagarTarefa(id);
                })
            });

            const btnEditar = document.querySelectorAll('#btnEditar');
            btnEditar.forEach(btnid => {
                const id = btnid.getAttribute('data-id-editar');
                btnid.addEventListener('click', () => {
                    exibirModal(id);
                })
            })

        } else {
            listaTarefas.innerHTML = `<h3 class="text-center text-body-secondary mt-4">Lista de Tarefas Vazia</h3>`;
        }
    } catch (error) {
        console.error('Erro ao obter tarefas:', error);
    }
};

const apagarTarefa = async (id: any) => {
    try {
        const response = await axios.delete(`https://gerenciador-tarefas-3.onrender.com/tarefa/${id}`);
        if (response.status === 200) {
            exibirAlertSuccess("Tarefa excluída com sucesso.");
            exibirTarefas();
        } else {
            throw new Error('Erro ao excluir tarefa');
        }
    } catch (erro) {
        console.error('Erro ao excluir Tarefa:', erro);
    }

};

const atualizarTarefa = async (id: string, editarTitulo: string, editarDescricao: string): Promise<void> => {
    const novoTitulo: string = editarTitulo;
    const novaDescricao: string = editarDescricao;

    if (!novoTitulo || !novaDescricao) {
        exibirAlertDanger('título e descrição são obrigatórios para atualizar a tarefa.');
        return;
    }

    const dados = {
        title: novoTitulo,
        description: novaDescricao,
    };

    try {
        const response = await axios.put(`https://gerenciador-tarefas-3.onrender.com/tarefa/${id}`, dados, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            exibirAlertSuccess('Tarefa atualizada com sucesso!');
            exibirTarefas();
        } else {
            console.log('Erro ao atualizar a tarefa');
        }

        limparInputs();
    } catch (err: any) {
        exibirAlertDanger(err.response.data.message);
    }
};

const exibirAlertDanger = (message: string) => {
    alerta.textContent = message;
    alerta.classList.remove('alert-success');
    alerta.classList.add('alert-danger');
    alerta.classList.remove('d-none');

    setTimeout(() => {
        alerta.classList.add('d-none');
    }, 5000)
}

const exibirAlertSuccess = (message: string) => {
    alerta.textContent = message;
    alerta.classList.remove('alert-danger');
    alerta.classList.add('alert-success');
    alerta.classList.remove('d-none');

    setTimeout(() => {
        alerta.classList.add('d-none');
    }, 5000);
}

const exibirModal = (id: any) => {
    const modalDialog: HTMLElement = document.getElementById('modalDialog') as HTMLDivElement;
    modalDialog.innerHTML = `
    <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">
            Editar Tarefa
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form id="form">
            <div class="form-floating mb-3">
              <input
                type="text"
                placeholder="Titulo da Tarefa"
                class="form-control"
                id="editarTitulo"
              />
              <label for="editarTitulo">Titulo da Tarefa</label>
            </div>
            <div class="form-floating mb-3">
              <textarea
                class="form-control"
                placeholder="Descrição"
                id="editarDescricao"
                style="height: 100px"
              ></textarea>
              <label for="editarDescricao">Descrição</label>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            id="btn-Cancelar"
          >
            Cancelar
          </button>
          <button type="button" class="btn btnSalva" id="btn-salvar">Salvar</button>
        </div>
      </div>
    `;
    const editarTitulo: HTMLInputElement = document.getElementById('editarTitulo') as HTMLInputElement;
    const editarDescricao: HTMLInputElement = document.getElementById('editarDescricao') as HTMLInputElement;

    const btnSalvar: HTMLButtonElement = document.getElementById('btn-salvar') as HTMLButtonElement;
    btnSalvar.addEventListener('click', () => {
        atualizarTarefa(id, editarTitulo.value, editarDescricao.value);
    });

}

const limparInputs = (editarTitulo?: string, editarDescricao?: string) => {
    tituloTarefa.value = '';
    descricaoTarefa.value = '';

    editarTitulo = '';
    editarDescricao = '';
}

btnCriar.addEventListener('click', () => {
    criarTarefa();
});

exibirTarefas();
