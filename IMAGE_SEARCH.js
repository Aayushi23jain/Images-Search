const accesskey='zoj6bbNZnvvXCWGVvG5Alc5mOy3Rq6L5VmLvNaW7iMY';
const searchform=document.querySelector('form');
const imagecontainer=document.querySelector('.imagescontainer');
const searchbars=document.querySelector('.searchbar');
const loadbutton=document.querySelector('.load');
const searchIcon = document.getElementById('searchicon');
// Function to fetch images using Unsplash API
let page=1;
const fetchimages = async (query,pageno) => {
    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageno}&client_id=${accesskey}`;
    try {
        const response = await fetch(url); // Fetch images from the Unsplash API
        const data = await response.json(); // Convert the response into JSON
        
        // Clear previous images from the container
       if(pageno===1){
        imagecontainer.innerHTML = '';
       }

        // Check if results exist and iterate over them
        if (data.results && data.results.length > 0) {
           data.results.forEach(photo => {
                const imageelement = document.createElement('div'); // Create a div element
                imageelement.classList.add('imagediv');
                imageelement.innerHTML = `<img src="${photo.urls.regular}" alt="${photo.alt_description}"/>`; // Corrected 'urls' object and added alt description
                const overlay=document.createElement('div');
                overlay.classList.add('over');
                //creating overlay text
                const overlaytext=document.createElement('h3');
                overlaytext.innerHTML=`${photo.alt_description}`;
                overlay.appendChild(overlaytext);
                imageelement.appendChild(overlay);
                imagecontainer.appendChild(imageelement); // Append the image to the container
                
                if(data.total_pages===pageno){
                    loadbutton.style.display="none";
                }
                else{
                    loadbutton.style.display="block";
                }
                
            });
            
            
        } else {
            imagecontainer.innerHTML = `<h2>No images found for "${query}"</h2>`;
            loadbutton.style.display="none";
        }
    } catch (error) {
        console.error("Error fetching images:", error);
        imagecontainer.innerHTML = `<h2>Failed to load images. Please try again later.</h2>`;
    }
    
    
};

// Function to handle the search action
const performSearch = () => {
    const inputText = searchbars.value.trim(); // Trim to remove the white spaces
    if (inputText !== '') {
        page = 1;
        fetchimages(inputText, page);
    } else {
        imagecontainer.innerHTML = `<h2>Please Enter A Search Query</h2>`;
        loadbutton.style.display = "none";
    }
};

// Add event listener to the search icon
searchIcon.addEventListener('click', performSearch);





//Adding Event Listners To Search Form
searchform.addEventListener('submit',(e)=>{
    e.preventDefault();
    performSearch();
   //form submit automatically so hold the page we use a parameter with prevent default
   const inputtext=searchbars.value.trim(); //Trim to remove the white spaces
   if(inputtext!=''){
    page=1;
    fetchimages(inputtext,page);
   }
   else{
    imagecontainer.innerHTML=`<h2>Please Enter A Search Query</h2>`
    loadbutton.style.display="none";
   }
  
});
//adding event listeners to load more
loadbutton.addEventListener('click',()=>{
    fetchimages(searchbars.value.trim(),++page);
});
