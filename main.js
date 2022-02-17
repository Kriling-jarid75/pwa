if ('serviceWorker' in navigator) {
    console.log('Puedes usar el servicio en tu navegador :) ');
    navigator.serviceWorker.register('./sw.js')
        .then(res => console.log("El serviceWorker fue cargado correctamente", res))
        .catch(err => console.log("No fue posible cargarlo correctamente", err));
} else {
    console.log('No puedes usar el servicio en tu navegador :) ');

}

//scroll suavizado
$(document).ready(function () {
    $("#menu a").click(function (e) {
        e.preventDefault();

        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top
        });
    })
});