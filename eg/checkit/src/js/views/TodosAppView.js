// All the subviews of a TodosAppView will always have
// the same model as the TodosAppView has.
//
maria.ElementView.subclass(checkit, 'TodosAppView', {
    properties: {
        getContainerEl: function() {
            return this.find('.content'); // child views will be appended to this element
        },
        initialize: function() {
            var model = this.getModel();
            if (!model) {
                model = new checkit.TodosModel();
                this.setModel(model);
            }
            this.appendChild(new checkit.TodosInputView(model));
            this.appendChild(new checkit.TodosToolbarView(model));
            this.appendChild(new checkit.TodosListView(model));
            this.appendChild(new checkit.TodosStatsView(model));
        },
        insertBefore: function(newChild, oldChild) {
            newChild.setModel(this.getModel());
            maria.ElementView.prototype.insertBefore.call(this, newChild, oldChild);
        },
        setModel: function(model) {
            if (model !== this.getModel()) {
                maria.ElementView.prototype.setModel.call(this, model);
                var childViews = this.childNodes;
                for (var i = 0, ilen = childViews.length; i < ilen; i++) {
                    childViews[i].setModel(model);
                }
            }
        },
        focus: function() {
            var childNodes = this.childNodes;
            for (var i = 0, ilen = childNodes.length; i < ilen; i++) {
                childNodes[i].focus();
            }
        }
    }
});
