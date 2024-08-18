const data = [
    { name: "Sushi"},
    { name: "Gyoza"},
    { name: "Ramen"},
    { name: "Tempura"},
    { name: "Donburi"},
    { name: "CurryKatsu"}
];

document.getElementById("searchBar").addEventListener('keyup',function(){
    const query = this.value.toLowerCase();
    const items = data.filter(item => item.name.toLowerCase().includes(query));

    const resultList = document.getElementById('searchitem');
    resultList.innerHTML = '';
    resultList.forEach(result =>{ 
        const li = document.createElement('li');
        li.textContent = result.name;
        resultList.appendChild(li);
    });
});