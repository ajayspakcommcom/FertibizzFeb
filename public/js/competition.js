var competitorSkus;
function setupPage() {
    loadMonthYear();
    getSkuDetails();
    showCheckBoxApproveBtn();

    setInterval(() => {
      showPrevMonthInput();
    }, 1000);
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
    let centerId = new URLSearchParams(window.location.search).get('cid'),
        year = $('#cmbYear').val(),
        userData = JSON.parse(localStorage.getItem("BSV_IVF_Admin_Data"));

        if(userData.post.toLowerCase() == 'kam') {
           console.log('');
        } else if(userData.post.toLowerCase() == 'rbm') {
            $('h1').text('Approve Competition');
            document.title = 'Approve Competition';

        } else {
            console.log('');
        }

    const getAllSKURequest = axios.get("/competitor-sku-details/");
    const getSkuContractDetailsRequest = axios.get(`/competitor-sku-details/${year}/${centerId}`);
    await axios.all([getAllSKURequest, getSkuContractDetailsRequest]).then(axios.spread(function (skuResponse, competitionResponse) {
        //  console.log(skuResponse.data);
        //console.log(contractResponse.data);
        competitorSkus = skuResponse.data;
        let competitionRes = competitionResponse.data,
            html = [],
            apr = 0,
            may = 0,
            jun =  0,
            jul =  0,
            aug =  0,
            sep =  0,
            oct =  0,
            nov =  0,
            dec =  0,
            jan =  0,
            feb =  0,
            mar =  0;
          // console.log(competitorSkus)   ;
          // console.log(contractRes)   ;

          competitorSkus.forEach(skuBrand => {
            let filterRec = competitionRes.filter(competitor => {
              return competitor.CompetitionSkuId === skuBrand.competitorId 
            });
          //  console.log(filterRec);
            if (filterRec.length > 0)  {
              apr = !isNaN((filterRec[0].April)) ?  parseFloat(filterRec[0].April):  0;
              may = !isNaN((filterRec[0].May)) ? parseFloat(filterRec[0].May) : 0;
              jun =  !isNaN((filterRec[0].June)) ? parseFloat(filterRec[0].June) : 0;
              jul =  !isNaN((filterRec[0].July)) ? parseFloat(filterRec[0].July) : 0;
              aug =  !isNaN((filterRec[0].Aug)) ? parseFloat(filterRec[0].Aug) : 0;
              sep =  !isNaN((filterRec[0].Sep)) ? parseFloat(filterRec[0].Sep) : 0;
              oct =  !isNaN((filterRec[0].Oct)) ? parseFloat(filterRec[0].Oct) : 0;
              nov =  !isNaN((filterRec[0].Nov)) ? parseFloat(filterRec[0].Nov) : 0;
              dec =  !isNaN((filterRec[0].Dec)) ? parseFloat(filterRec[0].Dec) : 0;
              jan =  !isNaN((filterRec[0].Jan)) ? parseFloat(filterRec[0].Jan) : 0;
              feb =  !isNaN((filterRec[0].Feb)) ? parseFloat(filterRec[0].Feb) : 0;
              mar =  !isNaN((filterRec[0].Mar))  ? parseFloat(filterRec[0].Mar) : 0;
            }
            console.log(apr); 
            html.push(` <tr>
            <td>${skuBrand.brandName}</td>
            <td>
              <span>${skuBrand.name}</span>
            </td>
            <td>
              <div class="form-group">
                <input maxlength=7" type="text" onkeypress="return isNumber(event)" class="form-control" id="txt_${skuBrand.brandId}_${skuBrand.competitorId}_apr" required="" value="${apr}" title="apr" />
              </div>
            </td>
            <td>
              <div class="form-group">
              <input maxlength=7" type="text" onkeypress="return isNumber(event)" class="form-control" id="txt_${skuBrand.brandId}_${skuBrand.competitorId}_may" required="" value="${may}" title="may" />
              </div>
            </td>
            <td>
              <div class="form-group">
              <input maxlength=7" type="text" onkeypress="return isNumber(event)" class="form-control" id="txt_${skuBrand.brandId}_${skuBrand.competitorId}_jun" required="" value="${jun}" title="jun" />
              </div>
            </td>
            <td>
              <div class="form-group">
              <input maxlength=7" type="text" onkeypress="return isNumber(event)" class="form-control" id="txt_${skuBrand.brandId}_${skuBrand.competitorId}_jul" required="" value="${jul}" title="jul" />
              </div>
            </td>
            <td>
              <div class="form-group">
              <input maxlength=7" type="text" onkeypress="return isNumber(event)" class="form-control" id="txt_${skuBrand.brandId}_${skuBrand.competitorId}_aug" required="" value="${aug}" title="aug" />
              </div>
            </td>
            <td>
              <div class="form-group">
              <input maxlength=7" type="text" onkeypress="return isNumber(event)" class="form-control" id="txt_${skuBrand.brandId}_${skuBrand.competitorId}_sep"  value="${sep}" title="sep" />
              </div>
            </td>
            <td>
              <div class="form-group">
              <input maxlength=7" type="text" onkeypress="return isNumber(event)" class="form-control" id="txt_${skuBrand.brandId}_${skuBrand.competitorId}_oct"  value="${oct}" title="oct" />
              </div>
            </td>
            <td>
              <div class="form-group">
              <input maxlength=7" type="text" onkeypress="return isNumber(event)" class="form-control" id="txt_${skuBrand.brandId}_${skuBrand.competitorId}_nov"  value="${nov}" title="nov" />
              </div>
            </td>
            <td>
              <div class="form-group">
              <input maxlength=7" type="text" onkeypress="return isNumber(event)" class="form-control" id="txt_${skuBrand.brandId}_${skuBrand.competitorId}_dec"  value="${dec}" title="dec" />
              </div>
            </td>
            <td>
              <div class="form-group">
              <input maxlength=7" type="text" onkeypress="return isNumber(event)" class="form-control" id="txt_${skuBrand.brandId}_${skuBrand.competitorId}_jan"  value="${jan}" title="jan" />
              </div>
            </td>
            <td>
              <div class="form-group">
              <input maxlength=7" type="text" onkeypress="return isNumber(event)" class="form-control" id="txt_${skuBrand.brandId}_${skuBrand.competitorId}_feb"  value="${feb}" title="feb" />
              </div>
            </td>
            <td>
              <div class="form-group">
              <input maxlength=7" type="text" onkeypress="return isNumber(event)" class="form-control" id="txt_${skuBrand.brandId}_${skuBrand.competitorId}_mar"  value="${mar}" title="mar" />
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
        apr = parseFloat($(`#txt_${skuBrand.brandId}_${skuBrand.competitorId}_apr`).val())  ;
        may = parseFloat($(`#txt_${skuBrand.brandId}_${skuBrand.competitorId}_may`).val());
        jun = parseFloat($(`#txt_${skuBrand.brandId}_${skuBrand.competitorId}_jun`).val());
        jul = parseFloat($(`#txt_${skuBrand.brandId}_${skuBrand.competitorId}_jul`).val());
        aug = parseFloat($(`#txt_${skuBrand.brandId}_${skuBrand.competitorId}_aug`).val());
        sep = parseFloat($(`#txt_${skuBrand.brandId}_${skuBrand.competitorId}_sep`).val());
        oct = parseFloat($(`#txt_${skuBrand.brandId}_${skuBrand.competitorId}_oct`).val());
        nov = parseFloat($(`#txt_${skuBrand.brandId}_${skuBrand.competitorId}_nov`).val());
        dec = parseFloat($(`#txt_${skuBrand.brandId}_${skuBrand.competitorId}_dec`).val());
        jan = parseFloat($(`#txt_${skuBrand.brandId}_${skuBrand.competitorId}_jan`).val());
        feb = parseFloat($(`#txt_${skuBrand.brandId}_${skuBrand.competitorId}_feb`).val());
        mar = parseFloat($(`#txt_${skuBrand.brandId}_${skuBrand.competitorId}_mar`).val());

        

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

function isNumber(evt) {
  evt = (evt) ? evt : window.event;
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
  }
  return true;
}

function approveMe() {
  console.log('approved me Clicked competition');
  let userData = JSON.parse(localStorage.getItem("BSV_IVF_Admin_Data")),
  param = {
      hospitalId: new URLSearchParams(window.location.search).get('cid'),
      rbmId: parseInt(userData.empId),
      year : $('#cmbYear').val() // @TODO THIS NEED TO CHANGE
  }

axios
  .post('/center-competition-approved/', param).then((response) => {
   //   console.log(response.data[0])
      if (response.data.length > 0) {
          let res = response.data[0];
          console.log(res);
          if (res.sucess === 'true')
              {
                  redirect('/hospitals');
                  // @TODO: THIS NEED TO CHANGE
              }
      }

  }).catch((err) => {
      console.log(err);
  });
  return false;
}

function showCheckBoxApproveBtn() {
  let userData = JSON.parse(localStorage.getItem("BSV_IVF_Admin_Data"));
  console.log(userData);

  if(userData.post.toLowerCase() == 'kam') {
      console.log('ram');
      $('.hideApproveChk').hide();
      $('#btnApprove').hide();
  }

  else if(userData.post.toLowerCase() == 'rbm') {
      console.log('rbm');
      $('#resetBtn').hide();
      $('#saveBtn').hide();
      $('.two-btn-wrapper').addClass('right');
  }
}

function showLastMonthInput() {

}

function showPrevMonthInput() {
  $('#competitorDataTable input[type=text]').prop('disabled', true);
  $(`[title=${getPrevMonth()}]`).prop('disabled', false);
}

function getPrevMonth() {
  const monthNames = ["jan", "feb", "mar", "apr", "may", "jun","jul", "aug", "sep", "oct", "nov", "dec"];
  const date = new Date();
  return monthNames[date.getMonth() - 1];
}



//showCheckBoxApproveBtn();