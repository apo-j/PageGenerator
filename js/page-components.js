//definition of basic bricks
	components.blocItem = function(id, on, type, title, supportLangues, attr, dataAttr, clickCallBack){
			var self = this;
			self.id = ko.observable(id);
			self.type = ko.observable(type);
            self.supportLangues = ko.observableArray(supportLangues || []);
            self.on = ko.observable(on || false);
			self.title = ko.observable(title);
			self.attr = attr || {};
			self.dataAttr = dataAttr || {};

            self.callback = function(data, event){
                if(!!clickCallBack && typeof clickCallBack === 'function'){
                    clickCallBack(data,event);
                }
            };
	};
	components.bloc = function(id, on, type, title, items,supportLangues, attr, dataAttr){
			var self = this;
			self.id = id;
			self.type = type;
            self.supportLangues = ko.observableArray(supportLangues || []);
            self.on = ko.observable(on || false);
            //self.on = ko.computed(function(){
            //if(self.supportLangues.indexOf(translator.currentLanguage()) === -1){
            //    return false;
            //}else{
            //    return _on();
            //}
            //});
			self.title = title;
			self.items = items || [];
        self.attr = attr || {};
        self.dataAttr = dataAttr || {};
	};
	components.sideBar = function(id, on, items, attr, dataAttr){
			var self = this;
			self.id = id;
			self.on = ko.observable(on || false);
			self.items = items || [];
            self.onClick = function(data, event){
                vars.ID = vars.ID + 1;

                var currentObject = {};

                switch(data.value){
                    case enums.optionsEnums.Properties :
                        vars.currentPageComponent = enums.componentIdEnum.SideBar;
                        currentObject = self;
                        break;
                    case enums.optionsEnums.Add :
                        vars.currentPageComponent = enums.componentIdEnum.SideBar;
                        currentObject = new components.bloc(vars.ID, false, enums.blocTypeEnum.None, 'new bloc');
                        break;
                    case enums.optionsEnums.Delete :
                        vars.currentPageComponent = enums.componentIdEnum.None;
                        break;
                    default :
                        console.log('unknown operation : ' + operation)
                }

                return {
                        on :self.on(),
                        outObject : currentObject
                };
            };
	};
	components.section = function(id, on, title, body, attr, dataAttr){
			var self = this;
			self.id = id;
			self.on = ko.observable(on || false);
			self.title = translator.translate(title);
			self.body = translator.translate(body);
            self.attr = attr || {};
            self.dataAttr = dataAttr || {};
	};
	components.sections = function(items, attr, dataAttr){
			var self = this;
			self.items = items || [];
	};
	components.page = function(param, attr, dataAttr){
			var self = this;
			self.id = param.id;
			self.on = ko.observable(param.on || false);
			self.leftSideBar = param.leftSideBar || {on : ko.observable(false), items : []};
			self.rightSideBar = param.rightSideBar || {on : ko.observable(false), items : []};
			self.title = translator.translate(param.title);
			self.sections = param.sections || [];
	};

components.navBarItem = function(id, on, active, title,supportLangues, attr, dataAttr){
 var self = this;
 self.id = id;
 self.supportLangues = ko.observableArray(supportLangues || []);
 var _on = ko.observable(on || false);
 self.on = ko.computed(function(){
     if(self.supportLangues.indexOf(translator.currentLanguage()) === -1){
         return false;
     }else{
         return _on();
     }
 });
 self.isActive = ko.observable(active || false);
 self.title = translator.translate(title);
 self.attr = attr || {};
 self.dataAttr = dataAttr || {};
};
components.navBar = function(id, on, items, supportLangues, attr, dataAttr){
    var self = this;
    self.id = id;

    self.supportLangues = ko.observableArray(supportLangues || []);
    var _on = ko.observable(on || false);
    self.on = ko.computed(function(){
        if(self.supportLangues.indexOf(translator.currentLanguage()) === -1){
            return false;
        }else{
            return _on();
        }
    });
    self.on = ko.observable(on || false);
    self.items = items || [];
    self.attr = attr || {};
    self.dataAttr = dataAttr || {};
};
 components.module = function(param, attr, dataAttr){
     var self = this;
     self.id = param.id;
     self.on = ko.observable(param.on || false);
     self.navBar = param.navBar || {};
     self.pages = param.pages || [];
     self.attr = attr || {};
     self.dataAttr = dataAttr || {};

     self.toggle = function(data, event){
         ko.utils.arrayForEach(self.pages(), function (page) {
             if(page.id === data.id){
                 page.on(true);
             }else{
                 page.on(false);
             }
         });
     };
 } ;

pages.PageModule = pages.PageModule || (function(){
    var res = {};

    res.init = function(args){
        var _args = $.extend({
            id : 0,
            on : false,
            leftSideBar : [],
            rightSideBar : [],
            title : '_undefined',
            sections : []
        }, args);

        return new components.page(_args);
    };
    return res;
}());