var boolean = function (bool) {
    return Type.is(bool, Boolean);
}

var string = function (string) {
    return Type.is(string, String);
}

var string_lenght = function (string,number) {
    if(Type.is(string, String)){
        if(string.length >= number){ return true; }
        else{ return false; }
    }else{
      return false;
    }
}

var date = function (date) {
    Type.is(date, Date)
}
