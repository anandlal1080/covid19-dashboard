$(document).foundation()

(function() {
    var calendar = [
        ["January", 31],
        ["February", 28],
        ["March", 31],
        ["April", 30],
        ["May", 31],
        ["June", 30],
        ["July", 31],
        ["August", 31],
        ["September", 30],
        ["October", 31],
        ["November", 30],
        ["December", 31]
        ],
        cont = document.getElementById('calendar-container');
  
    var sel_year = document.createElement('select'),
        sel_month = document.createElement('select'),
        sel_day = document.createElement('select');
  
    function createOption(txt, val) {
        var option = document.createElement('option');
        option.value = val;
        option.appendChild(document.createTextNode(txt));
        return option;
    }
  
    function clearChildren(ele) {
        while (ele.hasChildNodes()) {
            ele.removeChild(ele.lastChild);
        }
    }
  
    function recalculateDays() {
        var month_index = sel_month.value,
            df = document.createDocumentFragment();
        for (var i = 0, l = calendar[month_index][1]; i < l; i++) {
            df.appendChild(createOption(i + 1, i));
        }
        clearChildren(sel_day);
        sel_day.appendChild(df);
    }
  
    function generateMonths() {
        var df = document.createDocumentFragment();
        calendar.forEach(function(info, i) {
            df.appendChild(createOption(info[0], i));
        });
        clearChildren(sel_month);
        sel_month.appendChild(df);
    }
  
    sel_month.onchange = recalculateDays;
  
    generateMonths();
    recalculateDays();
  
    cont.appendChild(sel_year);
    cont.appendChild(sel_month);
    cont.appendChild(sel_day);
  }())