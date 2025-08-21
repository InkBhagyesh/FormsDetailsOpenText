sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	'sap/m/Dialog',
	'sap/m/Image',
	'sap/m/Button'
], function (MessageToast, Controller, JSONModel, Dialog, Image, Button) {
	"use strict";

	return Controller.extend("com.winslow.FORMSCARD.Card", {
		onInit: function () {
			debugger
			var that = this;
			sap.ui.core.BusyIndicator.show(0);
			$.ajax({
				url: "https://otcs.g080-test.opentext.cloud/cs/cs/api/v1/auth",
				type: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					"Accept": "application/json"
				},
				data: {
					"username": "WinslowSAP",
					"password": "2lw37Hn63BFe8h0Je19o8TiqsCMpGdZE"
				},
				success: function (data) {
					debugger
					$.ajax({
						url: "https://otcs.g080-test.opentext.cloud/cs/cs/api/v1/nodes/1273181/nodes?where_type=144",
						type: "GET",
						headers: {
							"Accept": "application/json",
							"OTCSTicket": data.ticket
						},
						success: function (oData) {
							sap.ui.core.BusyIndicator.hide();
							console.log(oData.data);
							var oModel = new JSONModel(oData.data);
							that.getView().setModel(oModel, "myModel");
						},
						error: function (error) {
							sap.ui.core.BusyIndicator.hide();
							MessageToast.show(error.message)
						}
					});
				},
				error: function (error) {
					sap.ui.core.BusyIndicator.hide();
					MessageToast.show(error.message)
				}
			});

		},
		handlePress: function (oEvent) {
			var sPath = oEvent.getSource().getBindingContext('myModel').getPath();
			var sSrc = oEvent.getSource().getBindingContext('myModel').getModel().getProperty(sPath).actions.filter(i => i.name === "View as Web Page" || i.name === "View")[0].url
			sSrc = "https://otcs.g080-test.opentext.cloud" + sSrc;
			//window.location.href = sSrc;
			//window.open(sSrc);
		    sap.m.URLHelper.redirect(sSrc,true)
			// var oHtml = new sap.ui.core.HTML({
			// 	content: "<iframe src='" + sSrc + "' width='100%' height='600px' style='border:none;'></iframe>"
			// });
			// var oDialog = new Dialog({
			// 	title: "Document Preview",
			// 	contentWidth: "80%",
			// 	contentHeight: "80%",
			// 	resizable: true,
			// 	draggable: true,
			// 	content: [oHtml],
			// 	beginButton: new Button({
			// 		text: 'Close',
			// 		press: function () {
			// 			oDialog.close();
			// 		}
			// 	}),
			// 	afterClose: function () {
			// 		oDialog.destroy();
			// 	}
			// });
			// oDialog.open();
		}
	});
});