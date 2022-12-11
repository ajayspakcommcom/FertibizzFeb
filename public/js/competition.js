var competitorSkus;
function setupPage() {
    loadMonthYear();
    getSkuDetails()
}



function loadMonthYear() {
    const date = new Date();
    let dt = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    // $('#cmbMonth').val(dt.getMonth() + 1); // our combo box starts with 1
    // $('#cmbYear').val(dt.getFullYear());
    // $('#cmbMonth').prop('disabled', true);
    // $('#cmbYear').prop('disabled', true);
}


async function getSkuDetails() {
    let months = ['apr', 'may', 'jun', 'jul', 'aug', 'spt', 'oct', 'nov', 'dec', 'jan', 'feb', 'mar'],
        hospitalId = new URLSearchParams(window.location.search).get('cid'),
        chainAccountTypeId = new URLSearchParams(window.location.search).get('chainAccountType');

    const getAllSKURequest = axios.get("/competitor-sku-details/");
    const getSkuContractDetailsRequest = axios.get('/contract-details/0');
    await axios.all([getAllSKURequest, getSkuContractDetailsRequest]).then(axios.spread(function (skuResponse, contractResponse) {
        //  console.log(skuResponse.data);
        //console.log(contractResponse.data);
        competitorSkus = skuResponse.data;
        let skus = competitorSkus,
            contractRes = contractResponse.data,
            html = [];
       // isContractApplicableBool = (contractRes[0].RateType === 'contract Rate');

        //  console.log(isContractApplicableBool) ;
          console.log(competitorSkus)   ;

          competitorSkus.forEach(skuBrand => {
            html.push(` <tr>
            <td>${skuBrand.brandName}</td>
            <td>
              <span>${skuBrand.name}</span>
            </td>
            <td>
              <div class="form-group">
                <input type="text" class="form-control" id="txt_${skuBrand.brandId}_${skuBrand.competitorId}_apr" required="" />
              </div>
            </td>
            <td>
              <div class="form-group">
              <input type="text" class="form-control" id="txt_${skuBrand.brandId}_${skuBrand.competitorId}_may" required="" />
              </div>
            </td>
            <td>
              <div class="form-group">
              <input type="text" class="form-control" id="txt_${skuBrand.brandId}_${skuBrand.competitorId}_jun" required="" />
              </div>
            </td>
            <td>
              <div class="form-group">
              <input type="text" class="form-control" id="txt_${skuBrand.brandId}_${skuBrand.competitorId}_jul" required="" />
              </div>
            </td>
            <td>
              <div class="form-group">
              <input type="text" class="form-control" id="txt_${skuBrand.brandId}_${skuBrand.competitorId}_aug" required="" />
              </div>
            </td>
            <td>
              <div class="form-group">
              <input type="text" class="form-control" id="txt_${skuBrand.brandId}_${skuBrand.competitorId}_sep" required="" />
              </div>
            </td>
            <td>
              <div class="form-group">
              <input type="text" class="form-control" id="txt_${skuBrand.brandId}_${skuBrand.competitorId}_oct" required="" />
              </div>
            </td>
            <td>
              <div class="form-group">
              <input type="text" class="form-control" id="txt_${skuBrand.brandId}_${skuBrand.competitorId}_nov" required="" />
              </div>
            </td>
            <td>
              <div class="form-group">
              <input type="text" class="form-control" id="txt_${skuBrand.brandId}_${skuBrand.competitorId}_dec" required="" />
              </div>
            </td>
            <td>
              <div class="form-group">
              <input type="text" class="form-control" id="txt_${skuBrand.brandId}_${skuBrand.competitorId}_jan" required="" />
              </div>
            </td>
            <td>
              <div class="form-group">
              <input type="text" class="form-control" id="txt_${skuBrand.brandId}_${skuBrand.competitorId}_feb" required="" />
              </div>
            </td>
            <td>
              <div class="form-group">
              <input type="text" class="form-control" id="txt_${skuBrand.brandId}_${skuBrand.competitorId}_mar" required="" />
              </div>
            </td>
          </tr>`)

        });

        $('#competitorDataTable').append(html.join(''))

    }))

}

function validateMe() {
    let months = ['apr', 'may', 'jun', 'jul', 'aug', 'spt', 'oct', 'nov', 'dec', 'jan', 'feb', 'mar'];

    console.log('save into database');
    let userData = JSON.parse(localStorage.getItem("BSV_IVF_Admin_Data")),
        centerId = new URLSearchParams(window.location.search).get('cid'),
        empId = parseInt(userData.empId),
        endPoints = [];
    competitorSkus.forEach(skuBrand => {
        //console.log(skuBrand)
        apr = parseInt($(`#txt_${skuBrand.brandId}_${skuBrand.competitorId}_apr`).val())  ;
        may = parseInt($(`#txt_${skuBrand.brandId}_${skuBrand.competitorId}_may`).val());
        jun = parseInt($(`#txt_${skuBrand.brandId}_${skuBrand.competitorId}_jun`).val());
        jul = parseInt($(`#txt_${skuBrand.brandId}_${skuBrand.competitorId}_jul`).val());
        aug = parseInt($(`#txt_${skuBrand.brandId}_${skuBrand.competitorId}_aug`).val());
        sep = parseInt($(`#txt_${skuBrand.brandId}_${skuBrand.competitorId}_sep`).val());
        oct = parseInt($(`#txt_${skuBrand.brandId}_${skuBrand.competitorId}_oct`).val());
        nov = parseInt($(`#txt_${skuBrand.brandId}_${skuBrand.competitorId}_nov`).val());
        dec = parseInt($(`#txt_${skuBrand.brandId}_${skuBrand.competitorId}_dec`).val());
        jan = parseInt($(`#txt_${skuBrand.brandId}_${skuBrand.competitorId}_jan`).val());
        feb = parseInt($(`#txt_${skuBrand.brandId}_${skuBrand.competitorId}_feb`).val());
        mar = parseInt($(`#txt_${skuBrand.brandId}_${skuBrand.competitorId}_mar`).val());

        

        let param = {
            apr : !isNaN(apr) ? apr  : 0,
            may : !isNaN(may) ? may : 0,
            jun : !isNaN(jun) ? jun : 0,
            jul : !isNaN(jul) ? jul : 0,
            aug : !isNaN(aug) ? aug : 0,
            sep : !isNaN(sep) ? sep : 0,
            oct : !isNaN(oct) ? oct : 0,
            nov : !isNaN(nov) ? nov : 0,
            dec : !isNaN(dec) ? dec : 0,
            jan : !isNaN(jan) ? jan : 0,
            feb : !isNaN(feb) ? feb : 0,
            mar : !isNaN(mar) ? mar : 0,
            empId: empId,
            brandId: parseInt(`${skuBrand.brandId}`),
            centerId: parseInt(centerId),
            year: $('#cmbYear').val(),
            skuId: parseInt(`${skuBrand.competitorId}`),

        }
        //console.log(param)
        endPoints.push(param);
    })
    Promise.all(endPoints.map((endpoint) => axios.post('/competitor-sku-add/', endpoint))).then(
        axios.spread((...allData) => {
            console.log({ allData });
            redirect('/hospitals');
        })
    );

    
}