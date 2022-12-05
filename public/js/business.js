var skuDetails;
function setupPage() {
    getSkuDetails()
}

function getSkuDetails() {
    let skuBrands = ['FOLIGRAF', 'HUMOG', 'ASPORELIX', 'R-HUCOG', 'FOLICULIN', 'AGOTRIG', 'MIDYDROGESTERONE'];
    axios
        .get('/sku-details/').then((response) => {
          //  console.log(response.data)
          skuDetails = response.data;
            let skus = skuDetails,
                html = [];


            skuBrands.forEach(skuBrand => {
                var skuBrandArr = skus.filter(item => {
                    return item.brandName === skuBrand;
                });
                //  console.log(skuBrandArr)

                html.push(`   <div class="panel panel-default">
                <div class="panel-heading">
                  <h4 class="panel-title">
                    <a data-toggle="collapse" data-parent="#accordion" href="#${skuBrand.toLowerCase().replace(/\s/g, '')}">${formatText(skuBrand, 'FirstLetterUPPER')}</a>
                  </h4>
                </div>
                <div id="${skuBrand.toLowerCase().replace(/\s/g, '')}" class="panel-collapse collapse in">
                  <div class="panel-body">
                    <div class="form-section"> 
                    ${getBrandGroupDetails(skuBrandArr)}
                   
                    
                    </div>
                  </div>
                </div>
              </div>`)

            });

            $('#accordion').append(html.join(''))


        }).catch((err) => {
            console.log(err);
        });
}

function getBrandGroupDetails(skuBrandGroups) {
    let html = []
    _brandGroupArr = [];
    skuBrandGroups.forEach(brandGroup => {
        if (!_brandGroupArr.includes(brandGroup.groupName)) {
            html.push(`<h5><strong>${brandGroup.groupName}</strong></h5>
            <hr>`);
            _brandGroupArr.push(brandGroup.groupName)
            html.push(getSKUHtml(skuBrandGroups, brandGroup))
        }
    })

    // console.log(_brandGroupArr)
    return html.join('');
}

function getSKUHtml(skuBrandGroups, brandGroup) {
    //console.log(skuBrandGroups)
    //console.log(brandGroup)
    let html = [],
        skuArr = skuBrandGroups.filter(item => {
            return item.groupName === brandGroup.groupName;

        });

    html.push(`<table class="table table-bordered table-bg">
            <thead>
            <tr>
                <th>SKU</th>
                <th>Rate Contract</th>
                <th>Unit Sold</th>
                <th>Business</th>
            </tr>
            </thead>
            <tbody>`)
    skuArr.forEach(sku => {
        let fieldName = `${sku.brandId}_${sku.brandGroupId}_${sku.medid}`
        html.push(`<tr>
                <td>
                <span>${sku.medicineName}</span>
                </td>
                <td>
                <div class="form-group">
                    <input type="text" 
                    disabled=true class="form-control business-rate" 
                    id="txt_${fieldName}_ContractRate" name="txt_${fieldName}_ContractRate" placeholder="00" required="">
                    <input type="hidden" 
                    class="form-control business-rate" id="hid_${fieldName}_Price" name="hid_${fieldName}_Price" placeholder="00" value="${sku.Price}">

                </div>
                </td>
                <td>
                <div class="form-group">
                    <input type="text" 
                        onkeypress="return isNumber(event)"
                        maxLength="2"
                        class="form-control" 
                        id="txt_${fieldName}_unitSold" 
                        name="txt_${fieldName}_unitSold" 
                        priceField = 'hid_${fieldName}_Price'
                        rateContractField = 'txt_${fieldName}_ContractRate'
                        unitSoldBusinessfield = 'txt_${fieldName}_unitSoldBusiness'
                        required="" onblur="calculateBusiness(this);">
                </div>
                </td>
                <td>
                <div class="form-group">
                    <input type="text" disabled=true  class="form-control disabled" 
                        id="txt_${fieldName}_unitSoldBusiness" 
                        name="txt_${fieldName}_unitSoldBusiness">
                </div>
                </td>
            </tr>`)
    })
    html.push(`</tbody>
        </table>`)



  //  console.log(skuArr);

    return html.join('');
}

function calculateBusiness(obj) {
   // console.log(obj)
    let priceField =  obj.getAttribute('priceField'),
        rateContractField = obj.getAttribute('rateContractField'),
        unitSoldBusinessfield = obj.getAttribute('unitSoldBusinessfield')
        isRateContractApplicable = $('#chkIsContractRateApplicable').is(':checked'), 
        unitPrice = $('#'+ priceField).val(),
        rateContractPrice = $('#'+ rateContractField).val(),
        finalPrice = (isRateContractApplicable)? rateContractPrice : unitPrice,
        roundOffPrice = Math.round(($('#'+obj.id).val() * finalPrice) * 100) / 100;
        
        $('#'+unitSoldBusinessfield).val(roundOffPrice);

        calculateTotal();
   // console.log(priceField, rateContractField, unitPrice)
}

function calculateTotal() {
    let skus = skuDetails,
        totalBusiness = 0;
        skus.forEach(sku => {
            let unitSoldBusinessfield = `txt_${sku.brandId}_${sku.brandGroupId}_${sku.medid}_unitSoldBusiness`,
                businessValue = $('#'+unitSoldBusinessfield).val().length > 0 ? parseFloat($('#'+unitSoldBusinessfield).val()) : 0;
            totalBusiness  = parseFloat(totalBusiness+businessValue)
        })
//        console.log(totalBusiness);
        $('#spnTotalBusinessValue').html(totalBusiness);
}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}


function validateMe() {

    console.log('save into database')

    if ($('#cmbMonth').val() === "") {
        alert('Month field is empty');
        $('#cmbMonth').focus();
        return false;
    }

    if ($('#cmbYear').val() === "") {
        alert('Year field is empty');
        $('#cmbYear').focus();
        return false;
    }
    let checkBox = document.getElementById('chkIsContractRateApplicable');
    
    if (checkBox.checked && $('#txtContractEndDate').val() === '') {
        alert('Select contract End date');
        $('#txtContractEndDate').focus();
        return false;
    }

    let skus = skuDetails,
        totalBusiness = 0,
        userData = JSON.parse(localStorage.getItem("BSV_IVF_Admin_Data")),
        hospitalId = new URLSearchParams(window.location.search).get('cid'),
        empId= parseInt(userData.empId),
        month= parseInt($('#cmbMonth').val()),
        year= parseInt($('#cmbYear').val()),
        isRateContractApplicable = $('#chkIsContractRateApplicable').is(':checked')
        contractEndDate = $('#txtContractEndDate').val()
        ;
        
        skus.forEach(sku => {
           let brandId = sku.brandId,
                brandGroupId = sku.brandGroupId,
                skuId = sku.medid,
                fieldId = `${sku.brandId}_${sku.brandGroupId}_${sku.medid}`,
                rateContractPrice =  $(`#txt_${fieldId}_ContractRate`).val(),
                unitPrice = $(`#hid_${fieldId}_Price`).val(),
                unitSold = parseInt($(`#txt_${fieldId}_unitSold`).val()),
                finalPrice = (isRateContractApplicable)? rateContractPrice : unitPrice
        ;
        if (unitSold >0) {
            param = {
                empId: empId,
                hospitalId: hospitalId,
                month: month,
                year: year,
                brandId: brandId,
                brandGroupID: brandGroupId,
                skuId: skuId,
                rate: finalPrice,
                qty: unitSold,
                isContractApplicable: isRateContractApplicable,
                contractEndDate: contractEndDate.length > 0? contractEndDate : null,
                
            }
            console.log(param)

                axios
                .post('/sku-add/', param).then((response) => {
                    //console.log(response.data[0])
                    let res = response.data[0];
                    if (res.sucess === 'true') {
                        redirect('/hospitals');
                    } else {
                        //     $('#lblMsg').text(res.msg);
                    }
                }).catch((err) => {
                    console.log(err);
                });
                
        }
           
        })
    return false;

}

$(".disabled").attr("disabled", true);

function setRate() {
    let checkBox = document.getElementById('chkIsContractRateApplicable');
    console.log(checkBox.checked);
    if (checkBox.checked) {
        $('.business-rate').attr("disabled", false);
    } else {
        $('.business-rate').attr("disabled", true);
    }
}