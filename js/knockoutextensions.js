ko.bindingHandlers.dataAttr = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
		var value = ko.utils.unwrapObservable(valueAccessor());
		
		for(var i in value){
			if(value.hasOwnProperty(i) && !! value[i]){
				$(element).data(i, value[i]);
			}
		}
    }
};


ko.bindingHandlers.Example = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
		var value = ko.utils.unwrapObservable(valueAccessor());

		$(element).attr('src', value);
    },
    update: function (element, valueAccessor) {
        var current = ko.utils.unwrapObservable(valueAccessor());
		var value = $(element).data('orgin');

        if (value !== current) {
		   $(element).css('outline', '1px solid red');
        }else{
			$(element).css('outline', '0');
		}
    }
};
ko.bindingHandlers.action = {
    init: function(element, valueAccessor, allBindingsAccessor, context) {
        var options = valueAccessor();
        if(typeof options === 'function'){
            options.apply(context, [context]);
        }
    }
};