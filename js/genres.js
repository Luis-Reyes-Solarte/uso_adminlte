let table;
let editingId = null;
let deleteId=null;
let deleteName="";

/* ======================
LOAD GENRES
====================== */

async function loadGenres(){

    if(table){
        table.destroy();
        }

const res = await fetch("../api/genres.php");
const genres = await res.json();

table = document.querySelector("#genresTable tbody");

table.innerHTML="";

genres.forEach(g=>{

table.innerHTML += `
<tr>

<td>${g.id}</td>

<td>${g.genre_name}</td>

<td>

<button class="btn btn-warning btn-sm"
onclick="editGenre(${g.id},'${g.genre_name}')">

<i class="bi bi-pencil"></i>

</button>

<button class="btn btn-danger btn-sm"
onclick="deleteGenre(${g.id},'${g.genre_name}')">

<i class="bi bi-trash"></i>

</button>

</td>

</tr>
`;

}); 


table = $("#genresTable").DataTable({
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
});


}


/* ======================
EDIT
====================== */

function editGenre(id,name){

    document.getElementById("genre_id").value=id;
    document.getElementById("genre_name").value=name;
    
    const modal = new bootstrap.Modal(document.getElementById("genreModal"));
    
    modal.show();
    
}

/* ======================
UPDATE
====================== */

async function updateGenre(){

const name=document.getElementById("genre_name").value;

await fetch("../api/genres.php",{

method:"PUT",

body:JSON.stringify({

id:editingId,
genre_name:name

})

});

editingId=null;

document.getElementById("genre_name").value="";

document.getElementById("saveBtn").innerText="Add Genre";

loadGenres();

}

/* ======================
DELETE
====================== */

function deleteGenre(id,name){

    deleteId=id;
    deleteName=name;
    
    document.getElementById("deleteMessage").innerHTML=
    `Está seguro de eliminar <strong>${name}</strong>?`;
    
    const modal=new bootstrap.Modal(
    document.getElementById("deleteModal")
    );
    
    modal.show();
    
    document.getElementById("confirmDeleteBtn").onclick=confirmDeleteGenre;
    
    }

async function confirmDeleteGenre(){

    await fetch("../api/genres.php",{
    
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
    
    loadGenres();
    
    }

/* ======================
SAVE BUTTON
====================== */

async function saveGenre(){

    const id = document.getElementById("genre_id").value;
    const name = document.getElementById("genre_name").value;
    
    if(id===""){
    
    await fetch("../api/genres.php",{
    method:"POST",
    body:JSON.stringify({genre_name:name})
    });
    
    }else{
    
    await fetch("../api/genres.php",{
    method:"PUT",
    body:JSON.stringify({
    id:id,
    genre_name:name
    })
    });
    
    }
    
    bootstrap.Modal.getOrCreateInstance(
    document.getElementById("genreModal")
    ).hide();
    
    loadGenres();
    
    }

function openNewGenre(){

    document.getElementById("genre_id").value="";
    document.getElementById("genre_name").value="";
    
    const modal = new bootstrap.Modal(document.getElementById("genreModal"));
    
    modal.show();
    
    }



loadGenres();