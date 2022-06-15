//alert("MELO")

(() =>{
    const xhr = new XMLHttpRequest(); //objeto xmlthttpreques
    const $xhr = document.getElementById("xhr"); //ol
    const $fragment = document.createDocumentFragment();  //fragmento para hacer solo una incersion al dom 

    //ahora debemos agregar un evento
    xhr.addEventListener("readystatechange",(e)=>{
        if(xhr.readyState !== 4){ // 4 es que el estado de la peticion es completo
            return;
        }
        if(xhr.status >= 200 && xhr.status < 300){
            let json = JSON.parse(xhr.responseText);

            json.forEach(element => {
                const $li = document.createElement("li");
                $li.innerHTML = `${element.name} -- ${element.email} -- ${element.phone}`;
                $fragment.appendChild($li);
            });

            $xhr.appendChild($fragment)
        }else{
            console.log("Error")
            console.log(xhr);
            let message = xhr.statusText || "Ocurrió un error";
            $xhr.innerHTML = `Error ${xhr.status} : ${message}`
        } 
        
    }); // se podria hacer onReadyState change pero el listener es estandar
    xhr.open("GET", "https://jsonplaceholder.typicode.com/users") //vertbo http y endpoint
    xhr.send(); //envio la peticion

})();

(()=>{
    //no hay que hacer instancia de nada
    const $fetch = document.getElementById("fetch"); //ol
    const $fragment = document.createDocumentFragment();  //fragmento para hacer solo una incersion al dom 

    //ejecutamos feth con el end point
    fetch("https://jsonplaceholder.typicode.com/users")
        .then((res)=>{ //este then me valida el otro tiene la logica
            return res.ok ? res.json() : Promise.reject(res)//coge el texto readable y lo pasa a objeto json
        })
        .then((json)=>{
            json.forEach(element => {
                const $li = document.createElement("li");
                $li.innerHTML = `${element.name} -- ${element.email} -- ${element.phone}`;
                $fragment.appendChild($li);
            });

            $fetch.appendChild($fragment)
        })
        .catch(err =>{
            console.error(err);
            let message = err.tatusText || "Ocurrió un error";
            $fetch.innerHTML = `Error ${err.status} : ${message}`
        })
        .finally(console.log("por aca siempre pasamos"));
})();

(()=>{
    //no hay que hacer instancia de nada
    const $async = document.getElementById("async"); //ol
    const $fragment = document.createDocumentFragment();  //fragmento para hacer solo una incersion al dom 

    //ejecutamos feth con el end point
    async function getData(){
        try {
            let res = await fetch("https://jsonplaceholder.typicode.com/users");
            
            //valido que este tod bien antes de proceder
            if(!res.ok){
                //throw new Error("Error al cargar ") este error solo recibe mensaje de texto
                throw {status:res.status, statusText:res.statusText} //asi lanzamos un objeto que atrapa el cath y lo lleva a consola
            }
            let json = await res.json();
            json.forEach(element => {
                const $li = document.createElement("li");
                $li.innerHTML = `${element.name} -- ${element.email} -- ${element.phone}`;
                $fragment.appendChild($li);
            });
            $async.appendChild($fragment)

        } catch (error) {
            console.error(error)
        } finally{
            //console.log("Por aca paso async")
        }
    }
    
    getData();
})();

(()=>{
    //no hay que hacer instancia de nada
    const $axios = document.getElementById("axios"); //ol
    const $fragment = document.createDocumentFragment();  //fragmento para hacer solo una incersion al dom 

    axios.get("https://jsonplaceholder.typicode.com/users")
        .then((res)=>{
            console.log(res)
            res.data.forEach(element => {
                const $li = document.createElement("li");
                $li.innerHTML = `${element.name} -- ${element.email} -- ${element.phone}`;
                $fragment.appendChild($li);
            });
            $axios.appendChild($fragment) //ya esto me devuelve un objeto con la info en el atributo data
        })
        .catch((err)=>{
            console.error(err)
        })
        .finally(()=>{
            console.log("Por aca paso con axios")
        })

})();

(()=>{
    //no hay que hacer instancia de nada
    const $axiosAsync = document.getElementById("axios-async"); //ol
    const $fragment = document.createDocumentFragment();  //fragmento para hacer solo una incersion al dom 

    async function getData(){
        try {
            let res = await axios.get("https://jsonplaceholder.typicode.com/users");
            let json = await res.data;

            json.forEach(element => {
                const $li = document.createElement("li");
                $li.innerHTML = `${element.name} -- ${element.email} -- ${element.phone}`;
                $fragment.appendChild($li);
            });
            $axiosAsync.appendChild($fragment);
        } catch (error) {
            console.error(error)
        }
    }
    getData();

})();