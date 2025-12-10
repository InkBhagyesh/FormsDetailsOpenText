sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("com.winslow.FORMSCARD.Card", {
		onInit: function () {
			var oModel = new JSONModel({});
			this.getView().setModel(oModel, "myModel");
		},
		fullyDecode: function (value) {
			if (!value) return value;

			let prev;
			let current = value;

			try {
				do {
					prev = current;
					current = decodeURIComponent(current);
				} while (prev !== current);
			} catch (e) {
				return value;
			}

			return current;
		},

		onAfterRendering: function () {
			debugger;
			var params = new URLSearchParams(window.location.search);
			var title = params.get("title");
			title = title ? title.split("/")[0] : "";

			if (!title) return; // ✅ stop if no title
			
			if (title.includes('%')) title = this.fullyDecode(title);
			
			console.log("Received Title:", title);
			this.byId("ProductList").setBusy(true);
			this.getOwnerComponent().getModel().read("/FetchOTFiles", {
				urlParameters: {
					"activity": "Form",
					"keyword": title
				},
				success: function (oData) {
					debugger
					var aFormData = oData.results || [];
					var oModel = new sap.ui.model.json.JSONModel(aFormData);
					this.getView().setModel(oModel, "myModel");
					this.byId("ProductList").setBusy(false);
				}.bind(this),
				error: function (oError) {
					console.error("Error fetching group ID", oError);
					this.byId("ProductList").setBusy(false);
				}.bind(this)
			});
		},
		handlePress: function (oEvent) {
			debugger;
			var sUrl = oEvent.getSource().getBindingContext('myModel').getObject();
			sap.m.URLHelper.redirect(sUrl.url, true);
		}
	});
});