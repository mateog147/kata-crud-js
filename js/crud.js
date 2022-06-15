(()=>{
    const d = document;
    const $table = d.querySelector(".crud-table");
    const $form = d.querySelector(".crud-form");
    const $title = d.querySelector(".crud-title");
    const $template = d.getElementById("crud-template").content;
    const $fragment = d.createDocumentFragment();
    const $tbody = d.getElementById("container")

    const getAll = async () =>{
        try {
            let res = await fetch("http://localhost:3000/santos/")
            let json = await res.json();
            if(!res.ok){
                throw {status:res.status, statusText:res.statusText} //asi lanzamos un objeto que atrapa el cath y lo lleva a consola
            }
            json.forEach(element => {
                $template.querySelector(".name").textContent = element.nombre;
                $template.querySelector(".constellation").textContent = element.constelacion;
                $template.querySelector(".edit").dataset.id  = element.id;
                $template.querySelector(".edit").dataset.nombre  = element.nombre;
                $template.querySelector(".edit").dataset.constelacion  = element.constelacion;
                $template.querySelector(".delete").dataset.id = element.id;
                let $clone = d.importNode($template,true);
                $fragment.appendChild($clone);
            });
            $tbody.append($fragment);
        } catch (error) {
            let message =error.statusText || "Ocurrió un error"
            $table.insertAdjacentHTML("afterend",`<p><b>${error}</b></p>`)
        }
    }
    d.addEventListener("DOMContentLoaded",getAll);
    d.addEventListener("submit", async e=>{
        if(e.target === $form){
        e.preventDefault();
        if(!e.target.id.value){
            //post
            try {
                let options ={
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json;charset=utf-8"
                    },
                    body:JSON.stringify({
                    nombre:e.target.nombre.value,
                    constelacion: e.target.constelacion.value
                    })
                }
                let res = await fetch("http://localhost:3000/santos/",options);
                if(!res.ok){
                    throw {status:res.status, statusText:res.statusText} //asi lanzamos un objeto que atrapa el cath y lo lleva a consola
                }
                let json = await res.json();
            } catch (error) {
                $form.insertAdjacentHTML("afterend",`<p><b>${error}</b></p>`)
            }

        }else{
            //put
            try {
                let options ={
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json;charset=utf-8"
                    },
                    body:JSON.stringify({
                    nombre:e.target.nombre.value,
                    constelacion: e.target.constelacion.value
                    })
                }
                let res = await fetch(`http://localhost:3000/santos/${e.target.id.value}`,options);
                if(!res.ok){
                    throw {status:res.status, statusText:res.statusText} //asi lanzamos un objeto que atrapa el cath y lo lleva a consola
                }
                let json = await res.json();
            } catch (error) {
                $form.insertAdjacentHTML("afterend",`<p><b>${error}</b></p>`)
            }
        }
        location.reload();
    }
    });
    d.addEventListener("click",async e=>{
    if(e.target.matches(".edit")){
        //alert("Ëditar")
        $title.textContent = "Editar Santo";
        $form.nombre.value = e.target.dataset.nombre;
        $form.constelacion.value = e.target.dataset.constelacion;
        $form.id.value = e.target.dataset.id;
    }
    if(e.target.matches(".delete")){
        let isDelete = confirm(`Estas seguro de eliminar a ${e.target.dataset.id}?`)
        if(isDelete){
            try {
                let options ={
                    method:"DELETE",
                    headers:{
                        "Content-Type":"application/json;charset=utf-8"
                    }
                }
                let res = await fetch(`http://localhost:3000/santos/${e.target.dataset.id}`,options);
                if(!res.ok){
                    throw {status:res.status, statusText:res.statusText} //asi lanzamos un objeto que atrapa el cath y lo lleva a consola
                }
                let json = await res.json();
                location.reload();
            } catch (error) {
                $form.insertAdjacentHTML("afterend",`<p><b>${error}</b></p>`)
            }
        }
    }
})
})();