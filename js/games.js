let table;
let genres = [];

async function loadGenres(){

const res = await fetch("../api/games.php?genres=1");
genres = await res.json();

const select = document.getElementById("genre");

select.innerHTML="";

genres.forEach(g=>{

select.innerHTML += `<option value="${g.id}">${g.genre_name}</option>`;

});

}

async function loadGames(){

const res = await fetch("../api/games.php");
const games = await res.json();

if(table){
table.destroy();
}

const tbody=document.querySelector("#gamesTable tbody");

tbody.innerHTML="";

games.forEach(g=>{

tbody.innerHTML+=`

<tr>

<td>${g.id}</td>

<td>${g.name}</td>

<td>${g.developer}</td>

<td>${g.genre_name}</td>

<td>

<button
class="btn btn-warning btn-sm"
onclick="editGame(${g.id})"
>

<i class="bi bi-pencil"></i>

</button>

<button
class="btn btn-danger btn-sm"
onclick="deleteGame(${g.id},'${g.name}')"
>

<i class="bi bi-trash"></i>

</button>

</td>

</tr>

`;

});

table = $("#gamesTable").DataTable(
    {
        language:{
            search :"Buscar",
            paginate: {
                first: "Primero",
                last: "Último",
                next: "Siguiente",
                previous: "Anterior"
            },
            info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
            lengthMenu: "Mostrar _MENU_ registros",
        },
        //pageLength: 3
    }
);

}

function openNewGame(){

document.getElementById("game_id").value="";
document.getElementById("gameForm").reset();

const modal = new bootstrap.Modal(document.getElementById("gameModal"));

modal.show();

}

async function editGame(id){

const res = await fetch("../api/games.php");
const games = await res.json();

const game = games.find(g=>g.id==id);

document.getElementById("game_id").value=game.id;
document.getElementById("name").value=game.name;
document.getElementById("developer").value=game.developer;
document.getElementById("genre").value=game.genre_id;

const modal = new bootstrap.Modal(document.getElementById("gameModal"));

modal.show();

}

async function saveGame(){

const id = document.getElementById("game_id").value;

const data = {

name: document.getElementById("name").value,
developer: document.getElementById("developer").value,
genre_id: document.getElementById("genre").value

};

if(id===""){

await fetch("../api/games.php",{

method:"POST",
body:JSON.stringify(data)

});

}else{

data.id=id;

await fetch("../api/games.php",{

method:"PUT",
body:JSON.stringify(data)

});

}

bootstrap.Modal.getInstance(document.getElementById("gameModal")).hide();

loadGames();

}

function deleteGame(id,name){

    deleteId=id;
    deleteName=name;
    
    document.getElementById("deleteMessage").innerHTML=
    `Está seguro de eliminar <strong>${name}</strong>?`;
    
    const modal=new bootstrap.Modal(
    document.getElementById("deleteModal")
    );
    
    modal.show();
    
    document.getElementById("confirmDeleteBtn").onclick=confirmDeleteGame;
    
    }
    async function confirmDeleteGame(){

        await fetch("../api/games.php",{
        
        method:"DELETE",
        body:JSON.stringify({id:deleteId})
        
        });
        
        bootstrap.Modal.getInstance(
        document.getElementById("deleteModal")
        ).hide();
        
        document.getElementById("successMessage").innerHTML=
        `<strong>${deleteName}</strong> fue eliminado correctamente`;
        
        new bootstrap.Modal(
        document.getElementById("successModal")
        ).show();
        
        loadGames();
        
        }

loadGenres();
loadGames();