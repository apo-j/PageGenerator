var utilities = (function(utilities){
    var self = this;
    self.id = 0;

    utilities.incrementor = function(){
        self.id = self.id + 1;
        return self.id;
    };

    //when final target is a observableArray, the id represent the element's id in the array
    utilities.apply = function( context, objstr, callback, params, id, seperator){
        var objs = objstr.split(seperator || '|');
        if(!!context){
            var closestObj =  context;
            for(var i = 0, j = objs.length; i < j; i++){
                if(!!closestObj[objs[i]]){
                    if(typeof closestObj[objs[i]] === 'function'){
                       closestObj = closestObj[objs[i]]();
                    }else{
                        closestObj = closestObj[objs[i]];
                    }
                }
            }
            if(typeof closestObj === 'function' && typeof closestObj() === 'array'){
                var obj = ko.utils.arrayFilter(closestObj(), function(item) {
                     return item.id() == id;
                });
                return obj[callback].apply(closestObj, params);
            }else{
                return closestObj[callback].apply(closestObj, params);
            }
        }else{
            return null;
        }
    }

    return utilities;
}(utilities))
