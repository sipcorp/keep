function rand_code(string, lon, start) {
    var number = "0123456789",
        numLetra = "0123456789PLIKMNJUYHBVGTRFCXDEWSZAQ",
        lether = "PLIKMNJUYHBVGTRFCXDEWSZAQqazwsxedcrfvtgbyhnujmiklop"
    lon = lon,
        chars = (string === 1) ? number : ((string === 2) ? numLetra : lether),
        code = start;
    for (x = 0; x < lon; x++) {
        rand = Math.floor(Math.random() * chars.length);
        code += chars.substr(rand, 1);
    }
    return code;
}

function currentDate(type, format) {
    var options = { year: 'numeric', month: 'short', day: 'numeric' }, newDay = null;
    Date.prototype.mes = function () {
        var m = this.getMonth() + 1; // la funcion getMonth() está basado en cero
        return (m > 9 ? '' : '0') + m;
    };
    Date.prototype.segundos = function () {
        var s = this.getSeconds();
        return (s > 9 ? '' : '0') + s;
    };

    var date = new Date(),
        //ampm = (date.getHours() >= 12) ? "PM" : "AM",
        hours = date.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    //hours = (hours >= 12) ? hours : "0" + hours;
    if (type === 1 && format === 1) {
        var dateFormat = date.mes() + "/" + date.getDate() + "/" +
            date.getFullYear() + " " + hours;
    }
    if (type === 2 && format === 1) {
        var dateFormat = date.mes() + "/" + date.getDate() + "/" +
            date.getFullYear();
    }
    if (type === 1 && format === 2) {
        var newDay = date.mes() + "/" + date.getDate() + "/" +
            date.getFullYear() + " " + hours,
            tempDate = new Date(newDay)
        dateFormat = tempDate.toLocaleDateString("es-ES", options)
    }
    if (type === 2 && format === 2) {
        var newDay = date.mes() + "/" + date.getDate() + "/" +
            date.getFullYear(),
            tempDate = new Date(newDay)
        dateFormat = tempDate.toLocaleDateString("es-ES", options)
    }
    if (type === 3 && format === 3) {

        dateFormat = date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" + date.getDate() + "T05:00:00.000+00:00"
    }
    return dateFormat;
};
function currentHours() {
    var a = new Date;
    let min = 0;
    let hour = 0;
    a.setDate(a.getDate()), setInterval(function () {
        var a = (new Date).getMinutes(),
            min = (a < 10 ? "0" : "") + a;
    }, 1e3), setInterval(function () {
        var a = (new Date).getHours();

        if (a <= 12) {
            if (a == '00') {
                a = '12'
            } else {
                a = a
            }
        } else {
            a = (a - 12)
        }

        hour = (a < 10 ? "0" : "") + a
    }, 1e3)
    return hour + ":" + min

}

// function formatNumber(nStr) {
//     nStr = nStr.toString();
//         nStr += '';
//         x = nStr.split('.');
//         x1 = x[0];
//         x2 = (x[1])/100;
//         x2 = x.length > 1 ? '.' + x[1] : '';
//         var rgx = /(\d+)(\d{3})/;
//         while (rgx.test(x1)) {
//             x1 = x1.replace(rgx, '$1' + ',' + '$2');
//         }
//         return (x1 + x2);
// }

function formatCurrencyNum(num) {
    num = num.toString();
    var value = num.replace(/\D/g, "")
        .replace(/([0-9])([0-9]{2})$/, '$1.$2')
        .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",")

    return value
}

function formatNumber(n) {
    n = String(n).replace(/\D/g, "");
    return n === '' ? n : Number(n).toLocaleString();
}

function digits(c) {
    return c.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

function dateFormat(target, type) {
    if (type === 1) {
        var options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return target.toLocaleDateString("es-ES", options)
    }
    if (type === 2) {
        return target.getFullYear() + "-" + ((target.getMonth() + 1) < 10 ? "0" + (target.getMonth() + 1) : (target.getMonth() + 1)) + "-" + (target.getDate() < 10 ? "0" + target.getDate() : target.getDate()) + "T05:00:00.000+00:00"

    }
}
function currency(value, decimals, separators) {
    // var decimals = 2;
    //   var separators = [',', ",", '.'];
    sTr = value //.replace("[\.\-\,]");
    decimals = decimals >= 0 ? parseInt(decimals, 0) : 2;
    separators = separators || ['.', "'", ','];
    var number = (parseFloat(sTr) || 0).toFixed(decimals);
    if (number.length <= (4 + decimals))
        return number.replace('.', separators[separators.length - 1]);
    var parts = number.split(/[-.]/);
    sTr = parts[parts.length > 1 ? parts.length - 2 : 0];
    var result = sTr.substr(sTr.length - 3, 3) + (parts.length > 1 ?
        separators[separators.length - 1] + parts[parts.length - 1] : '');
    var start = sTr.length - 6;
    var idx = 0;
    while (start > -3) {
        result = (start > 0 ? sTr.substr(start, 3) : sTr.substr(0, 3 + start)) +
            separators[idx] + result;
        idx = (++idx) % 2;
        start -= 3;
    }
    return (parts.length == 3 ? '-' : '') + result;
}

/* Funcion validadora de tarjeta de credito
--- Historial:
*/
function creditCardValidation(cardNo) {
    var cards = {
        "American Express": /^3[47][0-9]{13}$/,
        "Mastercard": /^5[1-5][0-9]{14}$/,
        "Visa": /^4[0-9]{12}(?:[0-9]{3})?$/
    };

    for (var card in cards) {
        if (cards[card].test(cardNo)) {
            return card;
        }
    }

    return undefined;
}

/* Funcion para validar la longitud del numero
--- Historial:
*/
function numValidate(numero) {
    var num = 0
    if (numero < 1) {
        return num
    } else {
        if (numero > 999999) {
            numero = 999999
        }
        return numero
    }
}

//Asesor
function asesorArray() {
    var asesor = [{
        id: 1,
        tag: 'Aksel Kerim'
    },
    {
        id: 2,
        tag: 'Orville Barret'
    },
    {
        id: 3,
        tag: 'Jeffry Church'
    },
    {
        id: 4,
        tag: 'Jewell Rice'
    },
    {
        id: 5,
        tag: 'Montana Lincoln'
    }
    ];

    return asesor;
}

// Tipo de identificacion
function typeidArray() {
    var typeID = [{
        id: 0,
        tag: "NIT"
    },
    {
        id: 1,
        tag: "CC"
    },
    {
        id: 2,
        tag: "CE"
    },
    {
        id: 3,
        tag: "RUC"
    },
    {
        id: 4,
        tag: "RUT"
    },
    {
        id: 5,
        tag: "RIF"
    },
    {
        id: 6,
        tag: "RUN"
    },
    {
        id: 7,
        tag: "NIF"
    },
    {
        id: 8,
        tag: "NIE"
    },
    {
        id: 9,
        tag: "RFC"
    },
    {
        id: 10,
        tag: "CUIT"
    },
    {
        id: 11,
        tag: "CUIL"
    },
    {
        id: 12,
        tag: "CPF"
    },
    {
        id: 13,
        tag: "CNPJ"
    },
    {
        id: 14,
        tag: "PASAPORTE"
    }
    ];

    return typeID;
}

// Metodo de Pago
function paymentArray() {
    var paymentType = [{
        id: 0,
        tag: "Efectivo"
    },
    {
        id: 1,
        tag: "Tarjeta Credito"
    },
    {
        id: 2,
        tag: "Tarjeta Debito"
    },
    {
        id: 3,
        tag: "Cheque"
    }
    ]

    return paymentType;
}

//Descuento de factura
function discountArray() {
    var invoiceDisc = [{
        id: 0,
        tag: "5"
    },
    {
        id: 1,
        tag: "10"
    },
    {
        id: 2,
        tag: "15"
    },
    {
        id: 3,
        tag: "20"
    },
    {
        id: 4,
        tag: "25"
    }
    ]

    return invoiceDisc;
}


// Funcion para la pagina de Bitacora //

// Modal Comments
function addComents(array, targetID) {
    // se carga la seccion de comentarios
    var sZeroRecords = array.length > 0 ? true : false

    if (sZeroRecords === true) {
        userComments(array, 1);
        $.each(array, function (index, val) {
            if (targetID === val.bitacoraID) {
                let date = val.date;
                let comments = val.comments;
                const newLocal = "<!-- // Item" + index + " -->" +
                    "<li class='media'><span class='pull-left'><span class='item-icon booico-pin-3'></span></span>" +
                    "<div class='media-body'>" +
                    "<span class='date'>" + date + "</span> <span class='quick-menu-icon pull-right'><a class='edit booico-edit'></a><a class='state booico-archive'></a> </span>" +
                    "<p class='note'>" + comments + ".</p>" +
                    "</div>" +
                    "</li>";
                var htmlElement = newLocal;
                $("#contentComments").append(htmlElement);
            } else {
                var hasMessage = $("ol[id=contentComments]").children().length
                if (hasMessage <= 0) {
                    userComments(array, 2);
                    notRecordFound();
                }
            }
        });
    } else {
        notRecordFound();
    }
}

function notRecordFound() {
    const newLocal = "<!-- // Item -->" +
        "<li class='media'>" +
        "<div class='media-body'>" +
        "<p style='color: red;text-align:  center;'>" + 'No se encontro registro' + ".</p>" +
        "</div>" +
        "</li>";
    var htmlElement = newLocal;
    $("#contentComments").append(htmlElement);
}

function userComments(dataComments, type) {
    if (type === 1) {
        $("#userExtent").append(dataComments[0].user);
    } else {
        $("#userExtent").empty();
    }

}


//Modal Extencion de Timepo

function addTimeExtend(data, target) {
    var id = null,
        name = null,
        userExten = "Jose Rojas", // se debe optener del currentUser dentro del modelo inicial
        currentStep = null
    $.each(data, function (i, v) {
        id = v.id
        if (target === id) {
            name = v.customer;
            currentStep = v.step + " - " + v.nameStep
            $("#accountForce").val(name);
            $("#accountStep").val(currentStep);
            $("#accountCreated").val(userExten);
            $("#idProductor").val(target);
        }
    });
}

// Modal Address

function addAddress(data, target) {
    var id = null,
        html = null;
    $.each(data, function (i, v) {
        id = v.id
        if (target === id) {
            if ($("#contacInfo")[0].children.length > 0) {
                $("#contacInfo").empty()
            }
            html =
                '<li class="control-group row-fluid">' +
                '<p><span class="label-field">Nombre</span> <span class="field bold">' + v.contacto + '</span></p>' +
                '<p><span class="label-field">Telefono</span> <span class="field bold">' + v.telefono + '</span></p>' +
                '</li>' +
                '<li class="control-group">' +
                '<p><span class="label-field">Provincia</span> <span class="field bold">' + v.provincia + '</span></p>' +
                '<p><span class="label-field">Distrito</span> <span class="field bold">' + v.distrito + '</span></p>' +
                '<p><span class="label-field">Direccion</span> <span class="field bold">' + v.direccion + '</span></p>' +
                '</li>'

            $("#contacInfo").append(html)
        }
    });

}


function newElemtArray(array1, array2, item, type) {
    var value = "",
        target = "",
        array = [];
    if (type == 1) {
        value = $("#" + item).val()
        if (value !== "") {
            $.each(array1, function (index, val) {
                if (value == val.id) {
                    target = val.country;
                    $.each(array2, function (index, val) {
                        if (target === val.country) {
                            array.push(array2[index])
                            //delete array[index];
                        }
                    });
                }
            });
        }
    } else {
        value = $("#" + item).val()
        value = (value !== "") ? parseInt(value) - parseInt(1) : value
        if (value !== "") {
            $.each(array1, function (index, val) {
                if (value == index) {
                    target = val.short;
                    $.each(array2, function (index, val) {
                        if (target === val.short) {
                            array.push(array2[index])
                            //delete array[index];
                        }
                    });
                }
            });

        }
    }

    return array;
};

function keyNumOnly(e) {
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        return false;
    }
}

function validateCedula(cedula) {
    //Patrones aceptados 
    // Regular (provincia-libro-tomo). Ej: 1-1234-12345
    // Panameño nacido en el extranjero (PE-libro-tomo). Ej: PE-1234-12345
    // Extranjero con cédula (E-libro-tomo). Ej: E-1234-12345
    // Naturalizado (N-libro-tomo). Ej: N-1234-12345
    // Panameños nacidos antes de la vigencia (provinciaAV-libro-tomo). Ej: 1AV-1234-12345
    // Población indigena (provinciaPI-libro-tomo). Ej: 1PI-1234-12345
    //-------------------------------------------------------------------------------------
    // Identificación de las provincias
    // 1- Bocas del Toro
    // 2 - Coclé
    // 3 - Colón
    // 4 - Chiriquí
    // 5 - Darién (Madugandí - Wargandi)
    // 6 - Herrera
    // 7 - Los Santos
    // 8 - Panamá
    // 9 - Veraguas
    // 10 - Guna Yala
    // 11 - Emberá Wounaan
    // 12 - Ngäbe-Buglé
    // 13 - Panamá Oeste
    Array.prototype.insert = function (index, item) {
        this.splice(index, 0, item);
    };
    var re = /^P$|^(?:PE|E|N|[23456789]|[23456789](?:A|P)?|1[0123]?|1[0123]?(?:A|P)?)$|^(?:PE|E|N|[23456789]|[23456789](?:AV|PI)?|1[0123]?|1[0123]?(?:AV|PI)?)-?$|^(?:PE|E|N|[23456789](?:AV|PI)?|1[0123]?(?:AV|PI)?)-(?:\d{1,4})-?$|^(PE|E|N|[23456789](?:AV|PI)?|1[0123]?(?:AV|PI)?)-(\d{1,4})-(\d{1,5})$/i
    var matched = cedula.match(re)
    // matched contains:
    // 1) if the cedula is complete (cedula = 8-AV-123-123)
    //    matched = [cedula, first part, second part, third part]
    //    [8AV-123-123]
    // 2) if the cedula is not complete (cedula = "1-1234")
    //    matched = ['1-1234', undefined, undefined, undefined]
    var isComplete = false;
    if (matched !== null) {
        matched.splice(0, 1); // remove the first match, it contains the input string.
        if (matched[0] !== undefined) { // if matched[0] is set => cedula complete
            isComplete = true;
            if (matched[0].match(/^PE|E|N$/)) {
                matched.insert(0, '0');
            }
            if (matched[0].match(/^(1[0123]?|[23456789])?$/)) {
                matched.insert(1, '');
            }
            if (matched[0].match(/^(1[0123]?|[23456789])(AV|PI)$/)) {
                var tmp = matched[0].match(/(\d+)(\w+)/);
                matched.splice(0, 1);
                matched.insert(0, tmp[1]);
                matched.insert(1, tmp[2]);
            }
        } // matched[0]
    }
    var result = {
        'isValid': cedula.length == 0 ? true : re.test(cedula),
        'inputString': cedula,
        'isComplete': isComplete,
        'cedula': isComplete ? matched.splice(0, 4) : null
    };
    //  console.log(result);
    return result;
}

//*************************************//
// Funcion para la pagina de Bitacora //
//*************************************//

function cancelFullScreen(el) {
    var requestMethod = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullscreen;
    if (requestMethod) { // cancel full screen.
        requestMethod.call(el);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}

function requestFullScreen(el) {
    // Supports most browsers and their versions.
    var requestMethod = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;

    if (requestMethod) { // Native full screen.
        requestMethod.call(el);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
    return false
}

function toggleFull() {
    var elem = document.body; // Make the body go full screen.
    var isInFullScreen = (document.fullScreenElement && document.fullScreenElement !== null) || (document.mozFullScreen || document.webkitIsFullScreen);

    if (isInFullScreen) {
        cancelFullScreen(document);
    } else {
        requestFullScreen(elem);
    }
    return false;
}

