function Thread(f,name){
    return {
        start: function(){
            requestAnimationFrame(f);
        }
    };
}