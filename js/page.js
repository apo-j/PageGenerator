(function(pages){ko.bindingProvider.instance = new StringInterpolatingBindingProvider();var viewModel = function(){	var self = this;	self.page = {        id : ko.observable(''),        on : ko.observable(true),        leftSideBar : new components.sideBar(utilities.incrementor(), true, false, [], enums.componentEnum.LeftSideBar),        rightSideBar :  new components.sideBar(utilities.incrementor(), true, false, [], enums.componentEnum.RightSideBar),        title : ko.observable('sfasd'),        body :new components.body(utilities.incrementor(), true, false, [], enums.componentEnum.Body)    };    //trigger update the page model    self.updatePage = ko.observable(true);    self.availableLanguages = ko.observableArray([ 'zh','en','fr']);    self.options = {};    self.options.sideBar = [        {name:'Properties', value:enums.optionsEnums.Properties},        {name : 'Add child', value:enums.optionsEnums.Add}    ];    self.options.body = [        {name:'Properties', value:enums.optionsEnums.Properties},        {name : 'Add child', value:enums.optionsEnums.Add}    ];    self.options.bloc = [        {name:'Properties', value:enums.optionsEnums.Properties}    ];    self.options.blocTypes = [        {name: 'List', value:enums.blocTypeEnum.List},        {name: 'Standalone', value:enums.blocTypeEnum.Standalone},        {name: 'Slider', value:enums.blocTypeEnum.sli}    ];    self.options.blocItemTypes = [        {name : 'Text', value:enums.blocItemTypeEnum.Text},        {name: 'Image', value:enums.blocItemTypeEnum.Image},        {name : 'Link', value:enums.blocItemTypeEnum.Link},        {name : 'ImageLink', value:enums.blocItemTypeEnum.ImageLink}    ];    self.currentActiveObject = ko.observable(self);    self.pageComponentData = ko.observable({});    self.currentPageComponent = ko.observable(enums.componentEnum.None);    self.target = ko.observable('');    self.templateParams = ko.observable({});    self.disablableComponents = ko.observableArray([        self.page.leftSideBar,        self.page.rightSideBar,        self.page.body    ]);    self.onDisablableComponentClick = function(data, event){        ko.utils.arrayForEach(self.disablableComponents(), function(item){            if(item.id() == data.id()){                self.currentActiveObject(item);                item.on.active(true);            }else{                item.on.active(false);            }        });    };    ko.computed(function() {        var params = { template: self.currentPageComponent(), data: self.pageComponentData() };        self.templateParams(params);    }).extend({ throttle: 1 });    self.options.onClick = function(data, event){        var res = {};        if(data.value === enums.optionsEnums.Delete){            var parent = utilities.getBlocParent(self.page, data.target);            parent.items.remove(data.target);            self.currentPageComponent(enums.componentEnum.None);            self.pageComponentData({});        }else{            res = self.currentActiveObject().onClick(data, event);            self.currentPageComponent(res.currentPageComponent);            switch(data.value){                case enums.optionsEnums.Properties:                case enums.optionsEnums.Add:                    self.pageComponentData(res.outObject || {});                    break;                case enums.optionsEnums.Create:                    self.pageComponentData({});                    self.disablableComponents.push(res.outObject);                    break;                case enums.optionsEnums.Cancel:                    self.pageComponentData({});                    break;                case enums.optionsEnums.Save:                    self.updatePage(!self.updatePage());                    self.pageComponentData({});                    break;                default :                    console.log('option : ' + data.name + 'not defined');                    break;            }        }    };    self.export = ko.computed(function(){        self.updatePage();        return ko.toJSON(self.page);    });}ko.applyBindings(new viewModel());}());