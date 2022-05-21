export default function changeFavorite(id,trigger) {
    const star = document.querySelector(trigger);
    let favoritelist = JSON.parse(localStorage.getItem('favorites'));
    if (!favoritelist) {
        favoritelist = [];
    }
    if(favoritelist.includes(id)){
        star.classList.add("favorite_check");
    }
    star.addEventListener('click', _ => {
        
        if(star.classList.contains("favorite_check")) {
            star.classList.remove("favorite_check");
            favoritelist = favoritelist.filter((n) => {return n != id})
        }
        else {
            star.classList.add("favorite_check");           
            favoritelist.push(id);
        }
        
        localStorage.setItem('favorites', JSON.stringify(favoritelist));
    })
}
