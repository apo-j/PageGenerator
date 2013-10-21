(function(pages){ko.bindingProvider.instance = new StringInterpolatingBindingProvider();var viewModel = function(){	var self = this;	self.page = {        id : ko.observable(''),        on : ko.observable(false),        leftSideBar : new components.sideBar(utilities.incrementor(), false, [], enums.componentEnum.LeftSideBar),        rightSideBar :  new components.sideBar(utilities.incrementor(), false, [], enums.componentEnum.RightSideBar),        title : ko.observable('sfasd'),        sections :ko.observableArray([])    };    self.availableLanguages = ko.observableArray([ 'zh','en','fr']);    self.options = {};    self.options.sideBar = [        {name:'Properties',  value:enums.optionsEnums.Properties},        {name : 'Add child', value:enums.optionsEnums.Add},        {name: 'Delete', value:enums.optionsEnums.Delete}    ];    self.options.blocTypes = [        {name : 'List', value:enums.blocTypeEnum.List},        {name: 'Standalone', value:enums.blocTypeEnum.Standalone}    ];    self.options.blocItemTypes = [        {name : 'Text', value:enums.blocItemTypeEnum.Text},        {name: 'Image', value:enums.blocItemTypeEnum.Image},        {name : 'Link', value:enums.blocItemTypeEnum.Link},        {name : 'ImageLink', value:enums.blocItemTypeEnum.ImageLink}    ];    self.currentObject = ko.observable(self);    self.pageComponentData = ko.observable({});    self.currentPageComponent = ko.observable(enums.componentEnum.None);    self.target = ko.observable('');    self.templateParams = ko.observable({});    ko.computed(function() {        var params = { template: self.currentPageComponent(), data: self.pageComponentData() };        self.templateParams(params);    }).extend({ throttle: 1 });    self.options.onClick = function(data, event, objstr){        var res = {};        if(!!callback && typeof callback === 'function'){            res =  utilities.apply(self, objstr, 'onClick',[data, event]);//callback(data, event);        }        self.currentPageComponent(res.currentPageComponent);        switch(data.value){            case enums.optionsEnums.Properties:            case enums.optionsEnums.Add:                self.pageComponentData(res.outObject || {});                break;            case enums.optionsEnums.Delete:                self.pageComponentData({});                break;            case enums.optionsEnums.Create:                self.pageComponentData({});                break;            case enums.optionsEnums.Cancel:                self.pageComponentData({});                break;            default :                console.log('option : ' + data.name + 'not defined');                break;        };    };}ko.applyBindings(new viewModel());}());