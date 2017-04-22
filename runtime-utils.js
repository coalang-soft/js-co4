function range(a,b){
    var ret = (function(x){return x;});
    if(b){
        return ret.for(a,b);
    }else{
        return ret.for(0,a);
    }
}