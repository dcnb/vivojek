function initQ() {

		
		//Endpoint and prefixes for all queries
		var endpoint = "http://vivo.nkn.uidaho.edu:3030/VIVO/query";
		
		var prefixes = "PREFIX rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#> PREFIX xsd:   <http://www.w3.org/2001/XMLSchema#> PREFIX owl:   <http://www.w3.org/2002/07/owl#> PREFIX swrl:  <http://www.w3.org/2003/11/swrl#> PREFIX swrlb: <http://www.w3.org/2003/11/swrlb#> PREFIX vitro: <http://vitro.mannlib.cornell.edu/ns/vitro/0.7#> PREFIX bibo: <http://purl.org/ontology/bibo/> PREFIX c4o: <http://purl.org/spar/c4o/> PREFIX cito: <http://purl.org/spar/cito/> PREFIX event: <http://purl.org/NET/c4dm/event.owl#> PREFIX fabio: <http://purl.org/spar/fabio/> PREFIX foaf: <http://xmlns.com/foaf/0.1/> PREFIX geo: <http://aims.fao.org/aos/geopolitical.owl#> PREFIX obo: <http://purl.obolibrary.org/obo/> PREFIX ocrer: <http://purl.org/net/OCRe/research.owl#> PREFIX ocresd: <http://purl.org/net/OCRe/study_design.owl#> PREFIX skos: <http://www.w3.org/2004/02/skos/core#> PREFIX uidaho: <http://vivo.nkn.uidaho.edu/ontology/uidaho#> PREFIX vcard: <http://www.w3.org/2006/vcard/ns#> PREFIX vitro-public: <http://vitro.mannlib.cornell.edu/ns/vitro/public#> PREFIX vivo: <http://vivoweb.org/ontology/core#> PREFIX vlocal: <http://localhost/vivo/ontology/vivo-local#> PREFIX scires: <http://vivoweb.org/ontology/scientific-research#> "; 
		
		// Query People/Dept Information for Academic Depts
		
		var queryDeptHeader = prefixes + "SELECT  ?orglink ?header ?image ?p ?d ?a ?n ?pic WHERE{ FILTER(?orglink = <http://vivo.nkn.uidaho.edu/individual/"+hashval+">) . ?orglink rdfs:label ?header ; vitro-public:mainImage ?i ; obo:BFO_0000050 ?college ;  vivo:relatedBy ?b ; rdfs:label ?d .  ?b vivo:relates ?a . ?a a vivo:FacultyMember ; rdfs:label ?n ; vitro-public:mainImage ?profpic . ?i vitro-public:thumbnailImage  ?thumb .  ?thumb vitro-public:downloadLocation ?im .  ?im vitro-public:directDownloadUrl ?image . ?profpic vitro-public:thumbnailImage  ?profthumb .  ?profthumb vitro-public:downloadLocation ?pm .  ?pm vitro-public:directDownloadUrl ?pic .} GROUP BY ?orglink ?header ?image ?p ?d ?a ?n ?pic ORDER BY ?n" ;
		
		// Query People/Organization Information for Research Orgs/Library/College of Law
		var queryOrgHeader = prefixes + "SELECT  ?orglink ?header ?image ?p ?d ?a ?n ?pic  WHERE{ FILTER(?orglink = <http://vivo.nkn.uidaho.edu/individual/"+hashval+">) . ?orglink rdfs:label ?header ; vitro-public:mainImage ?i ; vivo:relatedBy ?b; rdfs:label ?d.  ?b vivo:relates ?a . ?a a vivo:FacultyMember ; rdfs:label ?n ; vitro-public:mainImage ?profpic .  ?i vitro-public:thumbnailImage  ?thumb . ?thumb vitro-public:downloadLocation   ?im . ?im vitro-public:directDownloadUrl ?image .  ?profpic vitro-public:thumbnailImage  ?profthumb .  ?profthumb vitro-public:downloadLocation ?pm .  ?pm vitro-public:directDownloadUrl ?pic .} GROUP BY ?orglink ?header ?image ?p ?d ?a ?n ?pic ORDER BY ?n" ;
		
		//OLD var queryOrgHeader = prefixes + "SELECT  ?header ?image ?orglink ?college (COUNT(?a) AS ?faculty) WHERE{ FILTER(?orglink = <http://vivo.nkn.uidaho.edu/individual/"+hashval+">) . ?orglink rdfs:label ?header ; vitro-public:mainImage ?i ; vivo:relatedBy ?b .  ?b vivo:relates ?a . ?a a vivo:FacultyMember .  ?i vitro-public:thumbnailImage  ?thumb . ?thumb vitro-public:downloadLocation   ?im . ?im vitro-public:directDownloadUrl ?image .  } GROUP BY ?header ?image ?orglink ?college ?faculty" ;
		
		// Query People/Dept Information for Colleges
		var queryCollHeader = prefixes + "SELECT  ?orglink ?header ?image ?p ?d ?a ?n ?pic WHERE{ FILTER(?orglink = <http://vivo.nkn.uidaho.edu/individual/"+hashval+">) . ?orglink rdfs:label ?header ; vitro-public:mainImage ?i ; obo:BFO_0000051 ?p . ?p a vivo:AcademicDepartment ; vivo:relatedBy ?b ; rdfs:label ?d .  ?b vivo:relates ?a . ?a a vivo:FacultyMember ; rdfs:label ?n ; vitro-public:mainImage ?profpic . ?i vitro-public:thumbnailImage  ?thumb .  ?thumb vitro-public:downloadLocation ?im .  ?im vitro-public:directDownloadUrl ?image . ?profpic vitro-public:thumbnailImage  ?profthumb .  ?profthumb vitro-public:downloadLocation ?pm .  ?pm vitro-public:directDownloadUrl ?pic .} GROUP BY ?orglink ?header ?image ?p ?d ?a ?n ?pic ORDER BY ?n" ;
		
		
		
		//Query Article Information
		var queryCollPubs = prefixes + "SELECT DISTINCT  ?a ?au ?p ?ty ?ti ?j ?jo (year(?d) as ?y) WHERE {<http://vivo.nkn.uidaho.edu/individual/"+hashval+"> obo:BFO_0000051 ?q . ?q a vivo:AcademicDepartment ; vivo:relatedBy ?b . ?b vivo:relates ?a . ?a rdf:type foaf:Person ; rdfs:label ?au ; vivo:relatedBy ?c . ?c vivo:relates ?p . ?p a bibo:Document ; vitro:mostSpecificType ?ty ; rdfs:label ?ti ; vivo:dateTimeValue ?datetime . ?datetime vivo:dateTime ?d . OPTIONAL {?p vivo:hasPublicationVenue ?j . ?j rdfs:label ?jo .} FILTER (?d > '"+timestart+"-01-01T00:00:00'^^xsd:dateTime ) . } ORDER BY DESC(?d)";
		
		// Query Grant Information
		var queryCollGrant = prefixes + "SELECT DISTINCT ?g ?o ?ag ?n ?m (year(?d) as ?y) WHERE {<http://vivo.nkn.uidaho.edu/individual/"+hashval+"> obo:BFO_0000051 ?q . ?q a vivo:AcademicDepartment ; vivo:relatedBy ?b . ?b vivo:relates ?a . ?a rdf:type foaf:Person ; rdfs:label ?l ; vivo:relatedBy ?g . ?g a vivo:Grant ; rdfs:label ?o . OPTIONAL {?g vivo:assignedBy ?ag . ?ag rdfs:label ?n .} OPTIONAL {?g vivo:dateTimeInterval ?dti . ?dti vivo:start ?dt . ?dt vivo:dateTime ?d .} OPTIONAL {?g vivo:totalAwardAmount ?m .} FILTER (?d > '"+timestart+"-01-01T00:00:00'^^xsd:dateTime )} ORDER BY DESC(?y)" ;
		
		//Query Presentations Information
		var queryCollPrez = prefixes + "SELECT DISTINCT ?prez ?prezname ?conf (year(?date) as ?prezyear) WHERE { <http://vivo.nkn.uidaho.edu/individual/"+hashval+"> obo:BFO_0000051 ?q . ?q a vivo:AcademicDepartment ; vivo:relatedBy ?b . ?b vivo:relates ?a . ?a rdf:type foaf:Person . ?a obo:RO_0000053 ?role . ?role obo:BFO_0000054 ?prez . ?prez a vivo:Presentation . ?prez rdfs:label ?prezname . ?prez obo:BFO_0000050 ?venue . ?venue rdfs:label ?conf . ?role vivo:dateTimeInterval ?datetimeinterval . ?datetimeinterval vivo:start ?datetime . ?datetime vivo:dateTime ?date . 		FILTER (?date > '"+timestart+"-01-01T00:00:00'^^xsd:dateTime ) . } ORDER BY DESC(?date)" ;
		
		//Query Article Information
		var queryPubs = prefixes + "SELECT DISTINCT  ?a ?au ?p ?ty ?ti ?j ?jo (year(?d) as ?y) WHERE {<http://vivo.nkn.uidaho.edu/individual/"+hashval+"> vivo:relatedBy ?b . ?b vivo:relates ?a . ?a rdf:type foaf:Person ; rdfs:label ?au ; vivo:relatedBy ?c . ?c vivo:relates ?p . ?p a bibo:Document ; vitro:mostSpecificType ?ty ; rdfs:label ?ti ; vivo:dateTimeValue ?datetime . ?datetime vivo:dateTime ?d . OPTIONAL {?p vivo:hasPublicationVenue ?j . ?j rdfs:label ?jo .} FILTER (?d > '"+timestart+"-01-01T00:00:00'^^xsd:dateTime ) . } ORDER BY DESC(?d)";
		
		// Query Grant Information
		var queryGrant = prefixes + "SELECT DISTINCT ?g ?o ?ag ?n ?m (year(?d) as ?y) WHERE {<http://vivo.nkn.uidaho.edu/individual/"+hashval+"> vivo:relatedBy ?b . ?b vivo:relates ?a . ?a rdf:type foaf:Person ; rdfs:label ?l ; vivo:relatedBy ?g . ?g a vivo:Grant ; rdfs:label ?o . OPTIONAL {?g vivo:assignedBy ?ag . ?ag rdfs:label ?n .} OPTIONAL {?g vivo:dateTimeInterval ?dti . ?dti vivo:start ?dt . ?dt vivo:dateTime ?d .} OPTIONAL {?g vivo:totalAwardAmount ?m .} FILTER (?d > '"+timestart+"-01-01T00:00:00'^^xsd:dateTime )} ORDER BY DESC(?y)" ;
		
		//Query Presentations Information
		var queryPrez = prefixes + "SELECT DISTINCT ?prez ?prezname ?conf (year(?date) as ?prezyear) WHERE { <http://vivo.nkn.uidaho.edu/individual/"+hashval+"> vivo:relatedBy ?b . ?b vivo:relates ?a .         ?a rdf:type foaf:Person .          ?a obo:RO_0000053 ?role .             ?role obo:BFO_0000054 ?prez . ?prez a vivo:Presentation . ?prez rdfs:label ?prezname . ?prez obo:BFO_0000050 ?venue . ?venue rdfs:label ?conf . ?role vivo:dateTimeInterval ?datetimeinterval . 		?datetimeinterval vivo:start ?datetime . 		?datetime vivo:dateTime ?date . 		FILTER (?date > '"+timestart+"-01-01T00:00:00'^^xsd:dateTime ) . 		 } ORDER BY DESC(?date)" ;
		
		function query(queryStr, endpoint, callback, isDebug) {
			var querypart = "query=" + encodeURI(queryStr);
			
			// Get our HTTP request object.
			var xmlhttp = null;
			if(window.XMLHttpRequest) {
				xmlhttp = new XMLHttpRequest();
			} else if(window.ActiveXObject) { 
				// Code for older versions of IE, like IE6 and before.
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			} else {alert('Perhaps your browser does not support XMLHttpRequests?');}
		
			// Set up a POST with JSON result format.
			xmlhttp.open('POST', endpoint, true); // GET can have caching probs, so POST
			xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			xmlhttp.setRequestHeader("Accept", "application/sparql-results+json");
		
			// Set up callback to get the response asynchronously.
			xmlhttp.onreadystatechange = function() {
			if(xmlhttp.readyState == 4) { if(xmlhttp.status == 200) {
				// Do something with the results
				if(isDebug) // alert(xmlhttp.responseText);
				callback(xmlhttp.responseText);
			} else {
			   // Some kind of error occurred.
			   // alert("Sparql query error: " + xmlhttp.status + " " + xmlhttp.responseText);
				}
			}
			}; 
			// Send the query to the endpoint.
			xmlhttp.send(querypart);
    
			// Done; now just wait for the callback to be called.
			
			 var x = Math.floor((Math.random() * 10) + 1);
			 
			 var xstring = "{ \"contain\": true, \"initialIndex\":" + x + ", \"wrapAround\": false }"
			
			 $("#twitter-widget-0").contents().find('head').append('<style>.inline-media{display:none !important;}.autosized-media {display:none !important;.photo-link {display:none !important;}img{display:none;}</style>');
      
			 $(".gallery").attr("data-flickity-options", xstring);
			};
		
			colls = ["n13085","n31646","n9513","n5857","n19263","n14472","n10830","n13549"];
			orgs = ["n37288","n45780","n25164","n25164","n4712", "n3175", "n6370","n13969"];
			
			// Call the header.  This is the first request and the fastest
			// Next, call the second fastest, with a 1 second delay.  The query will probably run in about 20 ms
			// Next, call the shorter of the two big queries.  It can take  around 500-700 ms to run.  So make sure it has at least 1 second.
			// Call the final and largest query.  Give it at least a second.  Occasionally this may overlap with the grants.
			if (colls.indexOf(hashval) != -1) {
				query(queryCollHeader, endpoint, headerCollCallback, true);
				setTimeout(function(){query(queryCollPrez, endpoint, prezCallback, true);}, 2000);
				setTimeout(function(){query(queryCollGrant, endpoint, grantCallback, true);}, 4000);
				setTimeout(function(){query(queryCollPubs, endpoint, pubCallback, true);}, 6000);
			} else if (orgs.indexOf(hashval) != -1) {
				query(queryOrgHeader, endpoint, headerDeptCallback, true);
				setTimeout(function(){query(queryPrez, endpoint, prezCallback, true);}, 1000);
				setTimeout(function(){query(queryGrant, endpoint, grantCallback, true);}, 2000);
				setTimeout(function(){query(queryPubs, endpoint, pubCallback, true);}, 3000);
			} else {
				query(queryDeptHeader, endpoint, headerDeptCallback, true);
				setTimeout(function(){query(queryPrez, endpoint, prezCallback, true);}, 1000);
				setTimeout(function(){query(queryGrant, endpoint, grantCallback, true);}, 2000);
				setTimeout(function(){query(queryPubs, endpoint, pubCallback, true);}, 3000);
			}
		
}