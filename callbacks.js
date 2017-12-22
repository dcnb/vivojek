	function formatNumber (num) {
		return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
	}

	function headerCallback(str) {
        // Convert result to JSON
		var callback = JSON.parse(str);

		// Put the object into storage		
		sessionStorage['header'] = JSON.stringify(callback);
		hdb = JSON.parse(sessionStorage.getItem('header'));
		
		var callback = null;
		
		// Set up the header and breadcrumb
		var result = "";
		var breadcrumb = "";
	
		for (var i = 0; i < hdb.results.bindings.length; i++) {
			// Loop to build breadcrumb navigation
			breadcrumb += " " + hdb.results.bindings[i].header.value + " ";		

			// Loop to build image and title
			result += "<a target='_blank'  href='" + hdb.results.bindings[i].orglink.value +"'><img class='pull-left header-image' src='http://vivo.nkn.uidaho.edu/vivo/" +hdb.results.bindings[i].image.value +"'></a> <h1 > <a target='_blank'  href='" + hdb.results.bindings[i].orglink.value +"'>" + hdb.results.bindings[i].header.value + " <span style='font-size:smaller'>(" +  timestart  +" - " + timeend +")</span></h1>";
        }
        result += "" ;
        breadcrumb += "" ;
		
		$("#deptCount").hide();
		
		//Add the content to the specific divs for display
		document.getElementById("facultycount").innerHTML = "<ul><li>" + hdb.results.bindings[0].faculty.value + "</li></ul>";
		document.getElementById("entityheader").innerHTML = result;
		document.getElementById("reportbread").innerHTML = breadcrumb;
	}
	
	function headerDeptCallback(str) {
        // Convert result to JSON
		var callback = JSON.parse(str);

		// Put the object into storage		
		sessionStorage['header'] = JSON.stringify(callback);
		hdb = JSON.parse(sessionStorage.getItem('header'));
		
		var callback = null;
		var breadcrumb = "";
		var imgTitle = "";
		
		// Set up the faculty and department modals HTML
		
		var facultylist = "<ul style='-webkit-padding-start: 0px;'>";
		var facultygallery = "";
		
		// Set up the arrays to store the list of depts and faculty
	
		var facCount = [];
		
		for (var i = 0; i < hdb.results.bindings.length; i++) {
			
			// Loop for breadcrumb navigation
			breadcrumb = " " + hdb.results.bindings[i].header.value + " ";
			
			// Loop for image and title
			imgTitle = "<a target='_blank'  href='" + hdb.results.bindings[i].orglink.value +"'><img class='header-image' src='http://vivo.nkn.uidaho.edu/vivo/" +hdb.results.bindings[i].image.value +"'></a> <h1 > <a target='_blank'  href='" + hdb.results.bindings[i].orglink.value +"'>" + hdb.results.bindings[i].header.value + " <span style='font-size:smaller'>(" +  timestart  +" - " + timeend +")</span></h1>";
			
			// Loop for faculty modal, including links to their VIVO pages
			facultylist += "<li class='modallist'><a target='_blank' class='authorlink' href='"+hdb.results.bindings[i].a.value +"'>"+hdb.results.bindings[i].n.value +"</a> (" +hdb.results.bindings[i].d.value +") </li>";
			
			// Loop for faculty flickity gallery, including links to their VIVO pages
			facultygallery += "<a target='_blank' class='gallery_item_sm  facdiv' href='"+hdb.results.bindings[i].a.value +"'><img src='http://vivo.nkn.uidaho.edu/vivo/" +hdb.results.bindings[i].pic.value +"' class='img img-circle' /><h4>"+hdb.results.bindings[i].n.value +"</h4></a> ";
			
		
			
			// Add to array to determine number of faculty
			facCount.push(hdb.results.bindings[i].n.value);
			
			
		}

	
		
		
		
		// Add the finishing tags for the various sections
		breadcrumb += "" ;
		
		facultylist += "</ul>" ;
		facultygallery += "" ;
	
	$("#deptCount").hide();
	
		// Add the content to each of the divs
		document.getElementById("facultycount").innerHTML = "<ul><li>" + facCount.length + " <a href='#' style='font-size:12px;' data-toggle='modal' data-target='#myModal'>(list)</a></li></ul>";
		document.getElementById("deptcount").innerHTML = "<ul><li>" + deptCount.length + " <a href='#' style='font-size:12px;' data-toggle='modal' data-target='#myModaldept'>(list)</a></li></ul>";
		document.getElementById("entityheader").innerHTML = imgTitle;
		document.getElementById("reportbread").innerHTML = breadcrumb;
		document.getElementById("facultylist").innerHTML = facultylist;
		document.getElementById("facultygallery").innerHTML = facultygallery;
	}


	function headerCollCallback(str) {
        // Convert result to JSON
		var callback = JSON.parse(str);

		// Put the object into storage		
		sessionStorage['header'] = JSON.stringify(callback);
		hdb = JSON.parse(sessionStorage.getItem('header'));
		
		var callback = null;
		var breadcrumb = "";
		var imgTitle = "";
		
		// Set up the faculty and department modals HTML
		var departments = "<ul>";
		var facultylist = "<ul style='-webkit-padding-start: 0px;'>";
		var facultygallery = "";
		
		// Set up the arrays to store the list of depts and faculty
		var deptCount = [];
		var facCount = [];
		
		for (var i = 0; i < hdb.results.bindings.length; i++) {
			
			// Loop for breadcrumb navigation
			breadcrumb = " " + hdb.results.bindings[i].header.value + " ";
			
			// Loop for image and title
			imgTitle = "<a target='_blank'  href='" + hdb.results.bindings[i].orglink.value +"'><img class='header-image' src='http://vivo.nkn.uidaho.edu/vivo/" +hdb.results.bindings[i].image.value +"'></a> <h1 > <a target='_blank'  href='" + hdb.results.bindings[i].orglink.value +"'>" + hdb.results.bindings[i].header.value + " <span style='font-size:smaller'>(" +  timestart  +" - " + timeend +")</span></h1>";
			
			// Loop for faculty modal, including links to their VIVO pages
			facultylist += "<li class='modallist'><a target='_blank' class='authorlink' href='"+hdb.results.bindings[i].a.value +"'>"+hdb.results.bindings[i].n.value +"</a> (" +hdb.results.bindings[i].d.value +") </li>";
			
			// Loop for faculty flickity gallery, including links to their VIVO pages
			facultygallery += "<a target='_blank' class='gallery_item_sm  facdiv' href='"+hdb.results.bindings[i].a.value +"'><img src='http://vivo.nkn.uidaho.edu/vivo/" +hdb.results.bindings[i].pic.value +"' class='img img-circle' /><h4>"+hdb.results.bindings[i].n.value +"</h4></a> ";
			
		
			
			// Add to array to determine number of faculty
			facCount.push(hdb.results.bindings[i].n.value);
			
			// Since the query is based on distinct faculty, we end up with
			// duplicated depts.  We search the deptCount array each time with
			// the indexOf method to figure out if has already been added 
			// to deptCount.  If so, we skip.  If not, we add it.  
			if (deptCount.indexOf(hdb.results.bindings[i].d.value+";"+hdb.results.bindings[i].p.value) === -1) {
				deptCount.push(hdb.results.bindings[i].d.value+";"+hdb.results.bindings[i].p.value);
			} 
		}

		// Organize the list of departments alphabetically
		deptCount.sort();
		
		// Loop for dept modal, including links to their VIVO pages
		for (var i = 0;i<deptCount.length;i++) {
			var type = deptCount[i].split(";");
			departments += "<li class='modallist'><a target='_blank' class='deptlink' href='"+type[1]+"'>"+type[0]+"</a></li>"
		}
		
		// Add the finishing tags for the various sections
		breadcrumb += "" ;
		departments += "</ul>" ;
		facultylist += "</ul>" ;
		facultygallery += "" ;
	
		// Add the content to each of the divs
		document.getElementById("facultycount").innerHTML = "<ul><li>" + facCount.length + " <a href='#' style='font-size:12px;' data-toggle='modal' data-target='#myModal'>(list)</a></li></ul>";
		document.getElementById("deptcount").innerHTML = "<ul><li>" + deptCount.length + " <a href='#' style='font-size:12px;' data-toggle='modal' data-target='#myModaldept'>(list)</a></li></ul>";
		document.getElementById("entityheader").innerHTML = imgTitle;
		document.getElementById("reportbread").innerHTML = breadcrumb;
		document.getElementById("departmentlist").innerHTML = departments;
		document.getElementById("facultylist").innerHTML = facultylist;
		document.getElementById("facultygallery").innerHTML = facultygallery;
	}
	
	function pubCallback(str) {
        // Convert result to JSON
		var cbk = JSON.parse(str);

		// Put the object into storage		
		sessionStorage['recentpubs'] = JSON.stringify(cbk);
		
		// Get it back out of storage so we can do stuff with it
		db = JSON.parse(sessionStorage.getItem('recentpubs'));
		
		
		var callback = null;
		// Create the various display variables.  In this example, venues
		// is the tag cloud, result3 is the article count, result6 is the
		// article list, resultBook is the book list.
		var venues = "<div id='htmltagcloud'>";
		var articleCount = "<ul>";
		var articleList = "<ul style='-webkit-padding-start: 0px;'>";
		var resultBook = "<ul style='-webkit-padding-start: 0px;'>";
		
		// Create a placeholder variable for journal names and URIs.  We
		// need this for word cloud, since we have to count them.
		var pubCounts = [];
		
		for (var i = 0; i < db.results.bindings.length; i++) {
			
			// Since we're running a SPARQL query with OPTIONAL values, the result
			// set will have gaps, i.e. some entries may not have a specific 
			// piece of information.  The javascript will fire an error if it finds
			// those gaps and is expecting to see something.
			
			//Check for the URI value.  In the first case, it's the "j" variable.
			// If present, set journalUri equal to the value.  If absent,
			// pass an empty string.  Do the same for journal name below.
			if (db.results.bindings[i].j === undefined) {
				journalUri = ""; 
			} else {
				journalUri = db.results.bindings[i].j.value;
			}
			if (db.results.bindings[i].jo === undefined) {
				journal = ""; 
			} else {
				journal = db.results.bindings[i].jo.value;
			}
			
			// Check to see if the item is listed as an Academic Article or 
			// a Book Chapter, or a Book.  This allows us to query any publication
			// type at once, rather than doing multiple queries for different types.
			if (db.results.bindings[i].ty.value.match(/AcademicArticle|Chapter|Article/)) {
				
				// Create Article List by looping through stored object
				articleList += "<li><a target='_blank' class='authorlink' href='"+db.results.bindings[i].a.value +"'>"+db.results.bindings[i].au.value +"</a>. <a target='_blank'  href='" + db.results.bindings[i].p.value + "'>"+ db.results.bindings[i].ti.value + "</a>. <em>" + journal + "</em>. (" + db.results.bindings[i].y.value +") </li>";			
			
				// Create array in order to count the items.
				// In order to pass two values without using a hash, we join
				// them - ugly, I know - and split them again later.
				pubCounts.push(journal+";"+journalUri);
				
			} else if (db.results.bindings[i].ty.value.match(/Book/)) {
				
				resultBook += "<li><a target='_blank' class='authorlink' href='"+db.results.bindings[i].a.value +"'>"+db.results.bindings[i].au.value +"</a>. <a target='_blank'  href='" + db.results.bindings[i].p.value + "'>"+ db.results.bindings[i].ti.value + "</a>.  (" + db.results.bindings[i].y.value +") </li>";
			}
		}

		// We sort them alphabetically so that we group the duplicate titles.
		// We also convert to lowercase during sorting to deal with any case
		// sensitivity issues.
		pubCounts.sort(function (a, b) {
			return a.toLowerCase().localeCompare(b.toLowerCase());
		});

		//  We create temp variables for our counting loop
		var current = null;
		var cnt = 0;
		
		// Run the loop.  We check each index in the array against the next one
		// to see if they're the same.  If they are it keeps counting until
		// the check fails.  Then we output the count into the word cloud's HTML.
		// Also, we run the loop as "less than or equal to".  This prevents the final
		// item from being cut off.
		for (var i=0;i<=pubCounts.length;i++) {
			if (pubCounts[i] != current) {
				if (cnt > 0) {
					// sessionStorage['"'+current+'"'] = cnt;
					
					// Remember, we joined the name and uri earlier?  Now
					// we have to split them to create the link and display text.
					var type = current.split(";");
					venues += "<span id=" + i +" class='wrd tagcloud" +cnt+ "'><a target='_blank'  href='" + type[1] + "'>"+ " <em>" + type[0] + "</em></a><span style='font-size:10px;display:none;'>(" +cnt+")</span> </span>";
				}
				current = pubCounts[i];
				cnt = 1;
				
			} else {
				cnt++;
			}
		}
		
		// Add the finishing tags to the display variables
        venues += "</div>" ;
		articleList += "</ul>" ;
		//articleCount += "<li>" + db.results.bindings.length + "</li></ul>" ;
			articleCount += "<li id='navbar-imposter'>" + db.results.bindings.length + " <button class='btn btn-sm btn-info smoothScroll' type='button' data-toggle='collapse' data-target='#collapseThree' aria-expanded='false' aria-controls='collapseThree'  id='articleexplore' >Explore <span class='glyphicon glyphicon-arrow-down'></span></button></li></ul>" ;
		resultBook += "</ul>" ;
		
		if(resultBook.match(/<li>/)) {$("#recentbooksdiv").show();};

		//Build the display
		document.getElementById("acarticlecount").innerHTML = articleCount;
		document.getElementById("recentarticles").innerHTML = articleList;
		document.getElementById("publicationvenues").innerHTML = venues;
		document.getElementById("recentbooks").innerHTML = resultBook;
	}

	function grantCallback(str) {
        // Convert result to JSON
		var cbk = JSON.parse(str);

		// Put the object into storage		
		sessionStorage['recentgrants'] = JSON.stringify(cbk);
		
		var callback = null;
		// Get it back out so we can do stuff with it
		gdb = JSON.parse(sessionStorage.getItem('recentgrants'));
		
		// Set up the necessary variables to create the displays.  Result7
		// is the list of grants, count is number of grants, and gtAmt is 
		// dollar amount of the grant value.
		var result7 = "<ul style='-webkit-padding-start: 0px;'>";
		var count = "<ul>"
		var gtAmt = 0;
		
		for (var i = 0; i < gdb.results.bindings.length; i++) {
			
			// Since we're running a SPARQL query with OPTIONAL results, the result
			// set will have gaps, i.e. some records may or may not have a specific 
			// piece of information.  The javascript will fail if it finds
			// those gaps and is expecting to see something.
			
			//Check for the URI value.  In the first case, it's the "g" variable.
			// If present, set grant URI equal to the value.  If absent,
			// pass an empty string.  Either way, the function is given some sort of
			// value.
			if (gdb.results.bindings[i].g === undefined) {
				uri = ""; 
			} else {
				uri = gdb.results.bindings[i].g.value;
			}
			if (gdb.results.bindings[i].o === undefined) {
				name = ""; 
			} else {
				name = gdb.results.bindings[i].o.value;
			}			
			if (gdb.results.bindings[i].ag === undefined) {
				funderuri = ""; 
			} else {
				funderuri = gdb.results.bindings[i].ag.value;
			}
			if (gdb.results.bindings[i].n === undefined) {
				funder = ""; 
			} else {
				funder = gdb.results.bindings[i].n.value;
			}
			if (gdb.results.bindings[i].y === undefined) {
				year = ""; 
			} else {
				year = gdb.results.bindings[i].y.value;
			}

			// Loop through creating the list of grants
			result7 += "<li> <a target='_blank'  href='" + uri + "'>"+ name + "</a>. <a target='_blank' style='color:black;' href='" +funderuri +  "'>"+ funder + "</a>. (" +year +") </li>";
			
			// Check for absence of the dollar figure. Add zero if it is missing.
			// Otherwise, send it along and normalize the number if it has commas.
			if (gdb.results.bindings[i].m === undefined) {
				gtAmt += 0;
			} else {
				gtAmt += parseInt(gdb.results.bindings[i].m.value.replace(/,/g , "").replace("$" , ""));
			}
		}
		
		//Finish the display variables
		result7 += "</ul>";
		count += "<li>" + gdb.results.bindings.length + " <button class='btn btn-sm btn-info smoothScroll' type='button' data-toggle='collapse' data-target='#collapseTwo' aria-expanded='false' aria-controls='collapseThree'  id='articleexplore' >Explore <span class='glyphicon glyphicon-arrow-down'></span></button></li></ul>" ;
	
		//Check to see if the display variables have content.  If not, don't
		// show the divs.
		if(gtAmt !=  0) {$("#grantmoneydiv").show();};
		if(uri != undefined) {$("#recentgrantdiv").show();};
		if(gdb.results.bindings.length != 0) {$("#grantcountdiv").show();};
		
		//Add the display variable content to the div HTML
		document.getElementById("grantcount").innerHTML = count;
		document.getElementById("recentawards").innerHTML = result7;	
		document.getElementById("grantmoney").innerHTML = formatNumber(gtAmt);

	}
	
	function prezCallback(str) {
        // Convert result to JSON
		var callback = JSON.parse(str);


		// Put the object into storage		
		sessionStorage['recentprez'] = JSON.stringify(callback);
		
		var callback = null;
		
		pdb = JSON.parse(sessionStorage.getItem('recentprez'));
			var check = 0
		for (var i = 0; i < pdb.results.bindings.length; i++) {
		check += pdb.results.bindings[i].prezname.value;}
		if(check != 0) {
          $("#recentprezdiv").show();};
		
		var result8 = "<ul style='-webkit-padding-start: 0px;'>";
		for (var i = 0; i < pdb.results.bindings.length; i++) {
			
		result8 += "<li> <a target='_blank'  href='" + pdb.results.bindings[i].prez.value + "'>"+ pdb.results.bindings[i].prezname.value + "</a>. <em>" + pdb.results.bindings[i].conf.value + "</em>. (" + pdb.results.bindings[i].prezyear.value +") </li>";;
                }
                result8 += "</ul>" ;

		
		//Build the first table
		document.getElementById("recentprez").innerHTML = result8;
	}