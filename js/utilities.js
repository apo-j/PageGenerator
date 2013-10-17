var utilities = (function(utilities){
    var self = this;
    self.id = 0;

    utilities.getID = function(){
        self.id = self.id + 1;
        return self.id;
    };

    return utilities;
}(utilities))
