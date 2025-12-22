sap.ui.define([
    "sap/ui/core/format/DateFormat"
], function (DateFormat) {
    "use strict";
    return {

        doctypeicon: function (mime) {
            if (!mime) return "";
            if (mime === "application/pdf") {
                return "sap-icon://pdf-attachment";
            }
            else if (mime === "image/png" || mime === "image/jpeg" || mime === "image/webp") {
                return "sap-icon://attachment-photo";
            }
            else if (mime === "text/plain") {
                return "sap-icon://document-text";
            }
            else if (mime === "video/mp4") {
                return "sap-icon://attachment-video";
            }
            else if (mime === "Workpage URL") {
                return "sap-icon://chain-link";
            }
            else if (mime === "application/msword" || mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                return "sap-icon://document-text";
            }
            else if (mime === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || mime === "application/vnd.ms-excel") {
                return "sap-icon://excel-attachment";
            }
            else {
                return "sap-icon://document";
            }
        },
        formatExpiryDate: function (sDate) {
            if (!sDate) {
                return "";
            }

            var oDate = new Date(sDate);
            var sFormatted = oDate.toLocaleDateString("en-IN");

            return "Expiry Date: " + sFormatted;
        },
        previewText: function (sDescription) {
            if (sDescription && sDescription.trim()) {
                return sDescription;
            }
            return "Preview";
        }


    }
});