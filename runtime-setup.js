(function(glob){
    
    //types
    Number.prototype.type = "number";
    String.prototype.type = "string";
    Array.prototype.type = "array";
    Function.prototype.type = "function";
    Object.prototype.type = "unknown";
    
    glob.array = function(a){
        if(a.type == "number"){
            return new Array(a);
        }if(a.type == "array"){
            return a;
        }
        return arguments;
    };
    glob.float = function(f){
        if(f instanceof Number){
            return f;
        }
        return parseFloat(f + "");
    };
    glob.integer = function(f){
        return parseInt(f + "");
    };
    glob.char = function(c){
        if(c.type == "string"){
            return c.charAt(0);
        }else{
            return String.fromCharCode(c);
        }
    };
    
    function forArr(func, arr){
        var ret = [];
        for(var i = 0; i < arr.length; i++){
            ret.push(func.invoke0(arr[i]));
        }
        return ret;
    }
    function forRange(func, min,max){
        var ret = [];
        for(var i = min; i <= max; i++){
            ret.push(func.invoke0(i));
        }
        return ret;
    }
    
    //value.for
    glob.Object.prototype.for = function(a,b){
        if(a instanceof Array){
            return forArr(this,a);
        }else{
            return forRange(this,a,b);
        }
    };
    //value.while
    glob.Object.prototype.while = function(c){
        var ret = [];
        while(c.invoke()){
            ret.push(this.invoke());
        }
        return ret;
    };
    //value.invoke0 ( replaces value() )
    glob.Object.prototype.invoke0 = function(n){
        if(arguments.length == 0){
            return this;
        }if(arguments.length == 1){
            return this.getProperty(n + "");
        }else{
            throw new Error("Unexpected parameter count: " + arguments.length);
        }
    };
    glob.Function.prototype.invoke0 = function(){
        return this.apply(this, arguments);
    };
    //value.invoke
    glob.Object.prototype.invoke = function(a){
        return this.invoke0.apply(this, a);
    };
    
    //value.setProperty(name,val)
    glob.Object.prototype.setProperty = function(n,v){
        this[n]=v;
    };
    
    //value.getProperty(name)
    glob.Object.prototype.getProperty = function(n){
        return this[n];
    };
    
    //number.add
    glob.Object.prototype.add = function(a){return this+a;};
    //number.sub
    glob.Object.prototype.sub = function(a){return this-a;};
    //number.mul
    glob.Object.prototype.mul = function(a){return this*a;};
    //number.div
    glob.Object.prototype.div = function(a){return this/a;};
    
    //array.add
    glob.Array.prototype.add = function(){
        var res = this[0];
        for(var i = 1; i < this.length; i++){
            res = res.add(this[i]);
        }
        return res;
    };
    //array.mul
    glob.Array.prototype.mul = function(){
        var res = this[0];
        for(var i = 1; i < this.length; i++){
            res = res.mul(this[i]);
        }
        return res;
    };
    
    glob.Array.prototype.select = function(f){
        var ret = [];
        for(var i = 0; i < this.length; i++){
            if(f.invoke0(this[i])){
                ret.push(this[i]);
            }
        }
        return ret;
    };
    
})(this);