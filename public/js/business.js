
function setupPage() {
    getSkuDetails()
}

function getSkuDetails() {
    let skuBrands = ['FOLIGRAF', 'HUMOG', 'ASPORELIX', 'R-HUCOG', 'FOLICULIN', 'AGOTRIG', 'MIDYDROGESTERONE'];
    axios
        .get('/sku-details/').then((response) => {
          //  console.log(response.data)
            let skus = response.data,
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
                        name="txt_${fieldName}_unitSoldBusiness" placeholder="00">
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


   // console.log(priceField, rateContractField, unitPrice)
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

    if ($('#iuiTxt').val() === "") {
        alert('Total no. of IUI cycles is empty');
        return false;
    }

    if ($('#ivfTxt').val() === "") {
        alert('Total no. of IVF cycles is empty');
        return false;
    }

    if ($('#freshTxt').val() === "") {
        alert('Fresh pick-ups is empty');
        return false;
    }

    if ($('#frozenTxt').val() === "") {
        alert('Frozen Transfers is empty');
        return false;
    }

    if ($('#patientTxt').val() === "") {
        alert('Self (Patient) cycles is empty');
        return false;
    }

    if ($('#donotTxt').val() === "") {
        alert('Donor cycles is empty');
        return false;
    }

    if ($('#agonistTxt').val() === "") {
        alert('Agonist cycles is empty');
        return false;
    }

    if ($('#antagonistTxt').val() === "") {
        alert('Antagonist cycles is empty');
        return false;
    }

    let pId = new URLSearchParams(window.location.search).get('pid'),
        iuiTxt = $('#iuiTxt').val(),
        ivfTxt = $('#ivfTxt').val(),
        freshTxt = $('#freshTxt').val(),
        frozenTxt = $('#frozenTxt').val(),
        patientTxt = $('#patientTxt').val(),
        donotTxt = $('#donotTxt').val(),
        agonistTxt = $('#agonistTxt').val(),
        antagonistTxt = $('#antagonistTxt').val();

}

$(".disabled").attr("disabled", true);

function setRate() {
    let checkBox = document.getElementById('rateApplicable');
    console.log(checkBox.checked);
    if (checkBox.checked) {
        $('.business-rate').attr("disabled", false);
    } else {
        $('.business-rate').attr("disabled", true);
    }
}