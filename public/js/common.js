const _SUCCESSFUL_STATUS_CODE = 200;
const _INVAID_SESSION = 202
const _FAILURE_STATUS_CODE = 201
//const _ROOT = 'http://ivf1.spak.agency'; 
const _ROOT = 'http://localhost:3333';
//const _ROOT = 'http://firtibiz-env.eba-m3syxjvp.ap-south-1.elasticbeanstalk.com';
const _SKU_BRANDS = ['FOLIGRAF', 'HUMOG', 'ASPORELIX', 'R-HUCOG', 'FOLICULIN', 'AGOTRIG', 'MIDYDROGEN'];


const _URL = {
        _hospitalListing: '/hospitals',
        _POSTLOGINURL:  '/hospitals',
        _HOSPITAL_UPDATE:'/hospitals-update/',
        _CUSTOMER_ADD:'/add-customer/',
        _CUSTOMER_LIST: '/customer/list',
        _EMPLOYEE_DELETE: '/employee-delete',
        _EMPLOYEE_EDIT: '/employee-edit/',
        _EMPLOYEE_DETAILS: '/employee-details/',
        _MASTER_DATA: '/master-data/',
        _EMPLOYEE_UPDATE:'/employee-update/',
        _EMPLOYEE_ADD:'/employee-add',
        _CUSTOMER:'/customers',
        _EMPLOYEE_HERARCHY: '/employee-hierarchy/',
        _EMPLOYEE_HERARCHY_EMP_AND_PARENT: '/employee-hierarchy-details/',
        _EMPLOYEE_HERARCHY_MGR_LIST: '/employee-hierarchy-mgr-list/',
        _EMPLOYEE_HERARCHY_EMP_MGR_UPDATE: '/employee-hierarchy-mgr-update/',
        _EMPLOYEE_HOSPITAL: '/employee-hospital/',
        _EMPLOYEE_HOSPITAL_LIST: '/employee-hospital-list/',
        _EMPLOYEE_HOSPITAL_EDIT: '/employee-hospital-edit/',
        _EMPLOYEE_HOSPITAL_NEW: '/employee-hospital-new/',
        _EMPLOYEE_HOSPITAL_UN_ASSIGNED: '/employee-hospital-un-assigned',
        _EMPLOYEE_HOSPITAL_UN_ASSIGNED_UPDATE: '/employee-hospital-un-assigned-update'
    }


function checkIfValidStatus(statusCode) {
    switch (statusCode) {
        case _SUCCESSFUL_STATUS_CODE:
            return 1;
            break;
        case _FAILURE_STATUS_CODE:
            return 2;
            break;
        case _INVAID_SESSION:
            // lets do something
            break;
        default:
            break;
    }

}

function redirect(url) {
    document.location.href = url;
}

function isEditPage(){
    return (location.pathname.indexOf('add') < 0)

}

function loadComboBox(data, dropdown, displayValue, displayText, optionTextAlongWithDisplayText, txtFormat) {
    $('#' + dropdown).empty();
    //$('#' + dropdown).append($('<option></option>').val('').html('---- Select ----'));

    let selectHeader = '';

    switch(dropdown) {
        case 'cmbHosp':
            selectHeader = 'Select Hospital';
        break;
        case 'cmbRegion':
            selectHeader = 'Select State';
        break;
        case 'cmbBrandList':
            selectHeader = 'Select Brand';
        break;
        case 'cmbKam':
            selectHeader = 'Select KAM';
        break;
        case 'cmbRBM':
            selectHeader = 'Select RBM';
        break;
        case 'cmbZBM':
            selectHeader = 'Select ZBM';
        break;
        case 'cmbBrands':
            selectHeader = 'Select Brands';
        break;

        default:
            selectHeader = '----Select----';
            break;
    }

    $('#' + dropdown).append($('<option></option>').val('').html(`${selectHeader}`));
    $.each(data, function (index, item) {
        let text = (item[displayText]) ? formatText(item[displayText], txtFormat) : '',
            optinalText = ((optionTextAlongWithDisplayText) ? item[optionTextAlongWithDisplayText] : ''),
            textPlusOptionl = text + ((optinalText.length > 0) ? ' - ' + optinalText.toUpperCase() : '');


        //  console.log('-------------------------------------------')
        //  console.log(text)
        //  console.log(optinalText)
        //  console.log()
        //  console.log('-------------------------------------------')

        $('#' + dropdown).append(
            $('<option></option>').val(item[displayValue]).html((textPlusOptionl))
        );
    });
}

function formatText(str, type) {
    //console.log('text format -->' + type)
    switch(type) {
        case 'UPPER':
            return str.toUpperCase()
        break;
        case 'FirstLetterUPPER':
            return capitalizeFirstLetter(str.toLowerCase());
        break;
        default:
            return camelCaseText(str)
            break;
    }
   
}



function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  

function camelCaseText(str) {
    if (str) {
        let arr = str.split(" ");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1).toLowerCase();

        }
        return arr.join(" ");
    }
}

function getIdFromURL() {
    let urlArr = window.location.href.split('/');
    return urlArr[urlArr.length - 1];
}

function getFirstDayPreviousMonth() {
    const date = new Date();
    let dt = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    $('#cmbMonth').val(dt.getMonth() + 1); // our combo box starts with 1
    $('#cmbYear').val(dt.getFullYear());
    //$('#cmbMonth').attr('disabled', 'disabled');
    $('#cmbYear').attr('disabled', 'disabled');
  }


  function logMeOut() {
    localStorage.setItem("userData", null);
    localStorage.clear();
    document.location.href = "/";
}

function DisabledInput(elemClassName){
    $(`.${elemClassName}`).prop('disabled', true);
}


// $('.col-wrapper').on('click', '.img-wrapper', function(){
//     let $this = $(this);
//     $this.parents('.col-wrapper').append(`
//         <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
//             <div class="form-group add-input-wrapper">
//             <input type="text" class="form-control" id="assistantTxt" name="assistantTxt" placeholder="Ivf Dr Assistant" />
//             <div class="img-wrapper">
//                 <img src="../../img/plus.png" alt="add input" class="img-responsive" />
//             </div>
//             </div>    
//         </div>
//     `);
// });

function goBack() {
    window.history.back();
}

function enableApproveButton() {
    console.log('enable button')
    $('#btnApprove').prop('disabled', !$('#chkApproved').is(":checked"));
}

function getQueryStringValue(key) {
    //console.log(window.location)
    let urlSearchParams = new URLSearchParams(window.location.search);
    //console.log(urlSearchParams)
    return urlSearchParams.get(key);
}

function showElementByDesignation() {
    let userData = JSON.parse(localStorage.getItem("BSV_IVF_Admin_Data"));
    if (userData != null) { 
        switch (userData.post.toLowerCase()) {
            case 'kam':
                    console.log('Kam Level');
                break;
            case 'rbm':
                $('.addNewCustomer').hide();
                console.log('Rbm Level');                
                break;
            case 'zbm':
                $('.addNewCustomer').hide();
                console.log('zbm Level');      
                break;
            case 'admin':
                console.log('Admin Level');      
                break;
        }
    }
}

function showNavigationByDesignation() {
    let userData = JSON.parse(localStorage.getItem("BSV_IVF_Admin_Data"));

    if (userData != null) {
        $('#ulLink > li').hide();
        $('.userLink, .logoutLink').show();

        $('#userName').text(userData.name);
        $('#userPost').text(userData.post);

        switch (userData.post.toLowerCase()) {
            case 'kam':
                $('.kamLink').show();
                break;
            case 'rbm':
                $('#logoLink').attr('href', '/employees/kam-list');
                $('.rbmLink').show();
                break;
            case 'zbm':
                $('#logoLink').attr('href', '/employees/kam-list');
                $('.zbmLink').show();
                break;
            case 'admin':
                $('.adminLink').show();
                break;
        }
    }
}

function showDrNameCentreName() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    console.log(params);
    $('#drName').text(params.drName);
    $('#centreName').text(params.centreName);
}

function addPrevValueOnFocus(elem) {
    if(parseInt(elem.value) == 0) {
        elem.value = '';
    } else {
        elem.value = elem.value;
    }
}

function addPrevValueOnFocusOut(elem) {
    console.log(elem.value);
    if(elem.value == undefined || elem.value == null || elem.value == '') {
        elem.value = 0;
    }
}

setTimeout(() => {
    showNavigationByDesignation();   
    showElementByDesignation(); 
}, 2000);

function intToString(num) {
    num = num.toString().replace(/[^0-9.]/g, '');
    if (num < 1000) {
        return num;
    }
    let si = [
      {v: 1E3, s: "K"},
      {v: 1E6, s: "M"},
      {v: 1E9, s: "B"},
      {v: 1E12, s: "T"},
      {v: 1E15, s: "P"},
      {v: 1E18, s: "E"}
      ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
        if (num >= si[index].v) {
            break;
        }
    }
    return (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s;
}

function validateAllInput() {

    isValid = true;

    $("input").each(function () {
        var element = $(this);
        if (element.val() == "") {
            isValid = false;
            element.after(`<p class="errorTxt">${element.attr('error')}</p>`);            
        }
    });

    return isValid;
}

function isLoaderVisible(isVisible) {
    if(isVisible == true) {
        $('.loader').addClass('visible');
    } else {
        $('.loader').removeClass('visible');
    }
}

function isBtnLoaderVisible(isVisible) {
    if(isVisible == true) {
        $('.loader-img').addClass('show');
    } else {
        $('.loader-img').removeClass('show');
    }
}

function addActiveClassToLink(pos) {
    const links = $('.navigation-ul > li');
    if(links[pos]) {
        links[pos].querySelector('a').classList.add('active');
    }
}

function setActiveLink() {    
    let url = window.location.pathname;

    if(url.includes('hospitals')) {
        addActiveClassToLink(0);
    } 
    else if(url.includes('customers')) { 
        addActiveClassToLink(1);
    }
    else if(url.includes('rc-list')) { 
        addActiveClassToLink(7);
    }
}

function showYear() {
    const elem = document.getElementById('showYearId');
    if(elem) {
        elem.textContent = new Date().getFullYear();
    }
}

setTimeout(() => {
    //setActiveLink();
    showYear();
}, 4000);


