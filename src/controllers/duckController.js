// import du/des manager(s) et de la/des view(s)

// on a tout centraliser dans le main.js comme si c'etait la view mais celui ci n'est censé n'appelé que le controller qui lui même appelle les views. On construit nos page dans les views et non pas directement dans le main.

//pour faire en sorte de faire que le perso vol il faut faire un addEventListener qui appel un callback présent et défini au préalable dans la class player. La methode appelé dans la class déclanche le le fait que le perso vol (isFlying = true) et un emit se lance. Il faut bien abonné la fonction de fly a un élément dans la view avec le on('nom dans le emit', nomDu Callback)
