// Get All Users and save all users details to locastorage
export function addDetails(addfavourite) {
    
    console.log("addfavourite ", addfavourite)
    var dataObject = [];
    if (localStorage.getItem('addFavourite') && localStorage.getItem('addFavourite').length > 0) {
      console.log("yes its working")
      dataObject = JSON.parse(localStorage.getItem('addFavourite'));
    }
    console.log("data object is", dataObject)
    dataObject.push(addfavourite);

    localStorage.setItem('addFavourite', JSON.stringify(dataObject));

    let retrivedOjects = localStorage.getItem('addFavourite');

    console.log('retrivedOjects: ', JSON.parse(retrivedOjects));
}