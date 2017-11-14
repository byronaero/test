    $(document).on("click", ".btn-addsite", function() { 
        
      // Get current state of our items from session
      var items = JSON.parse(localStorage.getItem("cart"));
      if(items === null) // if cart is empty
          items = [];
     
      // Populate the item
      var item = {inventory_address:"Rocklea, Queensland 4106"};
      items.push(item); // Push item to the cart
      items[(items.length - 1)].id = (items.length - 1);
      localStorage.setItem("cart", JSON.stringify(items)); // Save cart back to session
      addToCart(item,items); // append item to the cart
      console.log(item.id);
      drawpoly(item);

    });


   window.onload = populateCart(); // Populates the cart when page loads
   /*alert(JSON.stringify(data))*/

    function populateCart(){
        var items = JSON.parse(localStorage.getItem("cart"));
        if(items !== null){
            var cart = $('#cart > ul');
            for (i = 0; i < items.length; i++) {
                var headertag = 'header' + i;
                var descriptiontag = 'description' + i;
                var sitenametag = 'sitename' + i;
                var calculatedareatag = 'calculated-area' + i;
                var instructiontag = 'instruction' + i;
                if (items[i].coordinates){
                    cart.append('<div class=' + headertag + ' type="header" id=' + i + '><div class="sitename" id=' + sitenametag + '>' + items[i]['name'] + '</div><input type="button" class="toggle" id=' + i + ' value="^"></div>'        
                            + '<div class="content">'
                            + '<div class="form-input"><input type="description" id=' + descriptiontag + ' value="' + items[i]['name'] + '"></div>'
                            + '<div class="spacer"></div>'
                            + '<div class="calculation-box" id=' + instructiontag + '></div>'
                            + '<span id=' + calculatedareatag + ' class="imagearea">Image Area : <strong contenteditable="true">' + items[i]['area'] + '</strong> m<sup>2</sup></span>'    
                            + '<div><input type="submit" value="Edit"/></div>'                   
                            + '</div>');

                } else {
                    cart.append('<div class=' + headertag + ' type="header" id=' + i + '><div class="sitename" id=' + sitenametag + '>' + items[i]['name'] + '</div><input type="button" class="toggle" id=' + i + ' value="^"></div>'        
                            + '<div class="content">'
                            + '<div class="form-input"><input type="description" id=' + descriptiontag + ' value="' + items[i]['name'] + '"></div>'
                            + '<div class="spacer"></div>'
                            + '<div class="calculation-box" id=' + instructiontag + '>Select area to image.</div>'
                            + '<span id=' + calculatedareatag + ' class="imagearea"></span>' 
                            + '<div><input type="submit" value="Edit"/></div>'                      
                            + '</div>');   
                }

                $header = $(".header" + i);
                $content = $header.next();
                if ($content.is(":visible") == true){$content.hide();}
                }
        }
    }

window.onload = myMain;

$(document).on("click", '[class^=header]',function(e){

        var senderElement = e.target;
        // check if sender is the DIV element e.g.
        if($(e.target).is("div")) {
        window.location.href="site-details.html"
        return true;
    }

});

function myMain() {
  document.getElementById("cart").onclick = myfn;

  /* Load in site data for veuron */
  var agcoord = [[149.752224 , -27.405166],[149.754192, -27.405166],[149.754192, -27.406957],[149.752224 , -27.406957]];
  localStorage.setItem("agdata", JSON.stringify(agcoord));
}

window.onmouseover=function(e) {
    // gets the last character of the classname and compare against its ID
    if (e.target.className[e.target.className.length - 1] == e.target.id){
        var items = JSON.parse(localStorage.getItem("cart"));
        var polydata = items[e.target.id].coordinates;
        map.flyTo({ 'center': polydata[0], 'zoom': 16 , 'bearing': 0, 'speed':0.7})
    } else if (e.target.id == "filler" || e.target.id == "addsitediv"){
        map.flyTo({ 'center': [134.108956, -25.585480], 'zoom': 3.3 , 'bearing': 0, 'speed':0.7})
    } else if (e.target.id == "Agsite"){
        var agcoord = JSON.parse(localStorage.getItem("agdata"));
        map.flyTo({ 'center': agcoord[0], 'zoom': 16 , 'bearing': 0, 'speed':0.7})
    }

};


function myfn(e) {
  if (e.target.type == 'button') {
    $header = $(".header" + e.target.id);
    //getting the next element
    $content = $header.next();
    if ($content.is(":visible") == true){
            var inputname = document.getElementById("description" + e.target.id).value;
            var items = JSON.parse(localStorage.getItem("cart"));
            items[e.target.id].name = inputname;
            localStorage.setItem("cart", JSON.stringify(items));
            console.log(items[e.target.id]);
            //write new name to summary header
            $content.slideToggle(500);
            var namestring = document.getElementById("sitename" + e.target.id);
            namestring.innerHTML = inputname;
        } else {$content.slideToggle(500);}

    //open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
    
  }
}

    /*$header = $(".header");
    //getting the next element
    $content = $header.next();
    //open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
    $content.slideToggle(500, function () {
        if ($content.is(":visible") !== true){
            var input = document.getElementById("description").value
            console.log(item);
        }
        
    });*/


    function addToCart(item,items){
        var headertag = 'header' + (items.length - 1);
        var descriptiontag = 'description' + (items.length - 1);
        var sitenametag = 'sitename' + (items.length - 1);
        var calculatedareatag = 'calculated-area' + (items.length - 1);
        var instructiontag = 'instruction' + (items.length - 1);
        var submittag = 'submit' + (items.length - 1);
        $('#cart > ul').append('<div class=' + headertag + ' type="header" id=' + (items.length - 1) + '><div class="sitename" id=' + sitenametag + '>New Site</div><input type="button" class="toggle" id=' + (items.length - 1) + ' value="^"></div>'        
                            + '<div class="content">'
                            + '<div class="form-input"><input type="description" id=' + descriptiontag + ' placeholder="Site Name" /></div>'
                            + '<div class="spacer"></div>'
                            + '<div class="calculation-box" id=' + instructiontag + '>Select area to image.</div>'
                            + '<span id=' + calculatedareatag + ' class="imagearea"></span>'
                            + '<div><input type="submit" id=' + submittag + ' value="Submit" onclick="submitarea(' + (items.length - 1) + ')"/></div>'                      
                            + '</div>');
    }
        
    function drawpoly(item){

        map.on('draw.create', updateArea);
        map.on('draw.delete', updateArea);
        map.on('draw.update', updateArea);

        console.log(item.id);
        function updateArea(e) {
        var data = draw.getAll();
        var answer = document.getElementById('calculated-area' + item.id);
        if (data.features.length > 0) {
            var area = turf.area(data);
            // restrict to area to integer
            var rounded_area = Math.round(Math.round(area*100)/100);
            var items = JSON.parse(localStorage.getItem("cart"));  
            items[item.id].area = rounded_area;
            items[item.id].coordinates = data.features[0].geometry.coordinates[0];
            localStorage.setItem("cart", JSON.stringify(items));
            answer.innerHTML = 'Image Area : <strong contenteditable="true">' + rounded_area + '</strong> m<sup>2</sup>';
            localStorage.setItem("polygondata", JSON.stringify(data.features[0].geometry.coordinates[0]));
            document.getElementById('instruction' + item.id).innerHTML = '';
            /*console.log(data.features[0].geometry.coordinates[0]);*/
        } else {
            answer.innerHTML = '';
            document.getElementById('calculated-area' + item.id).innerHTML = 'Select area to image.';
            if (e.type !== 'draw.delete') alert("Select area to image.");
        }
    }
    }

    function submitarea(id){
        draw.deleteAll();

        $header = $(".header" + id);
        $content = $header.next();
        if ($content.is(":visible") == true){$content.slideUp(500);}


        var inputname = document.getElementById("description" + id).value;
        var items = JSON.parse(localStorage.getItem("cart"));
            items[id].name = inputname;
            localStorage.setItem("cart", JSON.stringify(items));

        location.reload()
    }

        $('#filler').height($(window).height() - $('#addsitediv').height() - $('#topsection').height() - $('#listsection').height() - 20);

         

                
    /*+ '<input type="submit" value="Draw Area" onclick="drawpoly()">'*/
    
    /*function
        var items = JSON.parse(sessionStorage.getItem("cart"));



    /*function addToCart(item,items){
        $('#cart > ul').append('<button class="lists" onclick="myFunction()">' + item['inventory_name'] + (items.length) + '</button> <div id="asd"> </div>');
    }*/

    /*<button class="accordion">' + '<div class="lists">'+ item['inventory_name'] + (items.length) + '</div> </button>' + '<div class="panel">'            
                            + '<div class="recurrence">Recurrence</div>'
                            + '<select class="recurrencelist">  <option selected>Once</option> <option>Daily</option> <option>Weekly</option> <option>Monthly</option></select>'
                            + '<div class="priority">Priority Level</div>'
                            + '<select class="prioritylist">  <option>Priority 1</option> <option>Priority 2</option> <option selected>Priority 3</option> </select>'
                            + '<div class="data">Data Required</div>'
                            + '<input type="checkbox" id="rgb"><label>RGB</label>'
                            + '<input type="checkbox" id="thermal"><label>Thermal</label>'
                            + '<input type="checkbox" id="near-infrared"><label>Near-Infrared</label>'
                            + '<input type="checkbox" id="hyperspectral"><label>Hyperspectral</label>'
                            + '<input type="submit" id="login-btn" value="Submit" class="btn-addsite">'
                            + '</div>'*/
    /*function myFunction() {
        $('#asd').append('<div class="lists"> <div class="recurrence">Recurrence</div>'
                            + '<select class="recurrencelist">  <option selected>Once</option> <option>Daily</option> <option>Weekly</option> <option>Monthly</option></select>'
                            + '<div class="priority">Priority Level</div>'
                            + '<select class="prioritylist">  <option>Priority 1</option> <option>Priority 2</option> <option selected>Priority 3</option> </select>'
                            + '<div class="data">Data Required</div>'
                            + '<input type="checkbox" id="rgb"><label>RGB</label>'
                            + '<input type="checkbox" id="thermal"><label>Thermal</label>'
                            + '<input type="checkbox" id="near-infrared"><label>Near-Infrared</label>'
                            + '<input type="checkbox" id="hyperspectral"><label>Hyperspectral</label>'
                            + '<input type="submit" id="login-btn" value="Submit" class="btn-addsite">'
                            + '</div>');
    }*/

    /*function sitedetails() {
        var polydata = JSON.parse(localStorage.getItem("polygondata"));
        console.log(polydata)
    
}*/
