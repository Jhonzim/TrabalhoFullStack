// Frontend simples para consumir a API Spring Boot
// Endpoints (base): http://localhost:8080/tasks
const API_BASE = window.API_BASE || 'http://localhost:8080/tasks';

const q = sel => document.querySelector(sel);
const tasksEl = q('#tasks');
const nameInput = q('#task-name');
const descInput = q('#task-desc');
const statusInput = q('#task-status');
const saveBtn = q('#save-btn');
const cancelEditBtn = q('#cancel-edit');

let editingId = null;

async function listTasks(){
  try{
    const res = await fetch(API_BASE);
    if(!res.ok) throw new Error('Falha ao listar tarefas: ' + res.status);
    const tasks = await res.json();
    renderTasks(tasks);
  }catch(err){
    console.error(err);
    tasksEl.innerHTML = '<li class="small">Erro ao carregar tarefas. Verifique a API no console.</li>';
  }
}

function renderTasks(tasks){
  if(!Array.isArray(tasks)) { tasksEl.innerHTML = '<li class="small">Resposta inesperada da API</li>'; return; }
  tasksEl.innerHTML = '';
  if(tasks.length === 0){ tasksEl.innerHTML = '<li class="small">Nenhuma tarefa cadastrada.</li>'; return; }
  tasks.forEach(t => {
    const li = document.createElement('li');
    const left = document.createElement('div');
    left.style.display='flex'; left.style.alignItems='center';
    const cb = document.createElement('input');
    cb.type = 'checkbox'; cb.checked = !!t.status;
    cb.addEventListener('change', ()=> toggleStatus(t, cb.checked));
    const info = document.createElement('div');
    info.className = 'task-info';
    const title = document.createElement('div');
    title.textContent = t.name || '[sem nome]';
    if(t.status) title.className = 'status-true';
    const desc = document.createElement('div');
    desc.className = 'small';
    desc.textContent = t.description || '';
    info.appendChild(title); info.appendChild(desc);
    left.appendChild(cb); left.appendChild(info);

    const actions = document.createElement('div');
    actions.className = 'task-actions';
    const edit = document.createElement('button');
    edit.textContent = 'Editar'; edit.className='btn-edit';
    edit.addEventListener('click', ()=> startEdit(t));
    const del = document.createElement('button');
    del.textContent = 'Excluir'; del.className='btn-delete';
    del.addEventListener('click', ()=> deleteTask(t.id));
    actions.appendChild(edit); actions.appendChild(del);

    li.appendChild(left); li.appendChild(actions);
    tasksEl.appendChild(li);
  });
}

async function toggleStatus(task, newStatus){
  const payload = {...task, status: !!newStatus};
  await saveTask(payload, true);
}

async function saveTask(taskObj, silent=false){
  try{
    const method = taskObj.id ? 'PUT' : 'POST';
    const res = await fetch(API_BASE, {
      method,
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(taskObj)
    });
    if(!res.ok) throw new Error('Erro ao salvar');
    await listTasks();
    if(!silent) resetForm();
  }catch(err){
    console.error(err);
    alert('Erro ao salvar tarefa. Veja o console.');
  }
}

async function deleteTask(id){
  if(!confirm('Confirmar exclusão?')) return;
  try{
    const res = await fetch(API_BASE + '/' + id, { method: 'DELETE' });
    if(!res.ok) throw new Error('Erro ao excluir');
    await listTasks();
  }catch(err){
    console.error(err);
    alert('Erro ao excluir. Verifique o console.');
  }
}

function startEdit(task){
  editingId = task.id;
  nameInput.value = task.name || '';
  descInput.value = task.description || '';
  statusInput.checked = !!task.status;
  saveBtn.textContent = 'Salvar alterações';
  cancelEditBtn.classList.remove('hidden');
}

function resetForm(){
  editingId = null;
  nameInput.value = '';
  descInput.value = '';
  statusInput.checked = false;
  saveBtn.textContent = 'Adicionar';
  cancelEditBtn.classList.add('hidden');
}

saveBtn.addEventListener('click', ()=>{
  const payload = {
    id: editingId,
    name: nameInput.value.trim(),
    description: descInput.value.trim(),
    status: statusInput.checked
  };
  saveTask(payload);
});

cancelEditBtn.addEventListener('click', resetForm);

// initial load
listTasks();

// expose for tweak
window._listTasks = listTasks;
