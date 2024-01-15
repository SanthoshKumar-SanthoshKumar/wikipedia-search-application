

let searchInputEl = document.getElementById("searchInput") ;

let searchResultsEl = document.getElementById("searchResults");

let spinnerEl = document.getElementById("spinner");




function createAndAppendSearchResult(result){
    let {title,link,description} = result ;
    // div-container -- result Item 

    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultsEl.appendChild(resultItemEl) ;

    // anchor Title -- result title 
    
    let resultTitleEl = document.createElement("a");
    resultTitleEl.classList.add("result-title");
    resultItemEl.textContent = title ;
    resultTitleEl.href = link ; 
    resultTitleEl.target="_blank" ;
    resultItemEl.appendChild(resultTitleEl);

    // title --Break Element 

    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl); 
    // Anchor url --result -url 

    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url")
    urlEl.src= link ;
    urlEl.textContent = link ;
    urlEl.target = "_blank" ;
    resultItemEl.appendChild(urlEl);

    //line-break
    let lineBrEl = document.createElement("br");
    resultItemEl.appendChild(lineBrEl);
    // paragraph-description  

    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description ;
    resultItemEl.appendChild(descriptionEl);

}


function displayResults(search_results){
    spinnerEl.classList.toggle("d-none");
    for (let result of search_results){
        createAndAppendSearchResult(result)
    }
}



function searchWikipedia(event){
      if(event.key === "Enter"){
        spinnerEl.classList.toggle("d-none");
        searchResultsEl.textContent = "";
        let searchInput = searchInputEl.value ;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput ;

        let options = {
            method:"GET"
        }

        fetch(url,options)
           .then(function(response){
            return response.json();
           })
           .then(function(jsonData){
            console.log(jsonData);
            let {search_results} = jsonData ; 
            displayResults(search_results);
           })
      }
}

searchInputEl.addEventListener("keydown",searchWikipedia);