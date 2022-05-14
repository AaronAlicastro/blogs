let abrioLista = []; abrioLista[0] = false; abrioLista[1] = false;
document.querySelectorAll(".containerChekBox-absulute1").forEach(ele => {
    ele.addEventListener("click",e=>{
        if(!abrioLista[0]){
            abrioLista[0] = true;
            document.querySelectorAll(".componets1").forEach(con => {
                con.style.display = "block";
                con.addEventListener("click",j=>{
                    document.querySelectorAll(".inputFilter")[0].value = con.innerHTML;
                });
            });
        }else{
            abrioLista[0] = false;
            document.querySelectorAll(".componets1").forEach(con => {
                con.style.display = "none";
            });
        }
    });
});
document.querySelectorAll(".containerChekBox-absulute2").forEach(ele => {
    ele.addEventListener("click",e=>{
        if(!abrioLista[1]){
            abrioLista[1] = true;
            document.querySelectorAll(".componets2").forEach(con => {
                con.style.display = "block";
                con.addEventListener("click",j=>{
                    document.querySelectorAll(".inputFilter")[1].value = con.innerHTML;
                });
            });
        }else{
            abrioLista[1] = false;
            document.querySelectorAll(".componets2").forEach(con => {
                con.style.display = "none";
            });
        }
    });
});
document.querySelectorAll(".descripcion_blogs").forEach(ele => {
    let des = ele.innerHTML;
    des = des.substring(0,50) + "...";
    ele.innerHTML = des;
});
document.querySelectorAll(".evitarEliminar").forEach(ele => {
    ele.addEventListener("click",e=>{
        let desicion = confirm("Desea eliminar el blog");
        if(desicion) location.assign(ele.getAttribute("name"));
    });
});