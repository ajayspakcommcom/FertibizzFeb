var skuDetails;
function setupPage() {
    getContractDetails()
}

function getContractDetails() {
    let urlArr = window.location.href.split('/'),
        chainAccountTypeId = urlArr[urlArr.length - 1],
    skuBrands = ['FOLIGRAF', 'HUMOG', 'ASPORELIX', 'R-HUCOG', 'FOLICULIN', 'AGOTRIG', 'MIDYDROGESTERONE'];
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
            </tr>
            </thead>
            <tbody>`)
    skuArr.forEach(sku => {
        let fieldName = `${sku.brandId}_${sku.brandGroupId}_${sku.medid}`
        html.push(`<tr>
                <td width="25%">
                <span>${sku.medicineName}</span>
                </td>
                <td>
                <div class="form-group">
                    <input type="text" 
                    maxlength="2" 
                    onkeypress="return isNumber(event)"
                    class="form-control business-rate" 
                    id="txt_${fieldName}_ContractRate" name="txt_${fieldName}_ContractRate" placeholder="00" required="">
                    
                </div>
                </td>
            </tr>`)
    })
    html.push(`</tbody>
        </table>`)



  //  console.log(skuArr);

    return html.join('');
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
    console.log(skuDetails)
     
    let urlArr = window.location.href.split('/'),
        chainAccountTypeId = urlArr[urlArr.length - 1],
        skus = skuDetails;
        
        skus.forEach(sku => {
           let brandId = sku.brandId,
                brandGroupId = sku.brandGroupId,
                skuId = sku.medid,
                fieldId = `${sku.brandId}_${sku.brandGroupId}_${sku.medid}`,
                rateContractPrice =  $(`#txt_${fieldId}_ContractRate`).val();
        if (rateContractPrice > 0) {
            param = {
                brandId: brandId,
                brandGroupID: brandGroupId,
                skuId: skuId,
                rate: rateContractPrice,
                chainAccountTypeId: chainAccountTypeId                
            }
            console.log(param)

                axios
                .post('/rate-contract-add/', param).then((response) => {
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
           
        });
    return false;

}
