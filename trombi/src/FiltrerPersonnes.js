// cette fonction filtre les personnes

// version test --> personnesList.json contient le json de toutes les personnes de GI

// import listePersonnes from "./personnesList.json";
import { createFilter } from './Filter';
import { createSorter } from './Sort';

export default function filtrerPersonnes(items, searchName, searchFirstname, searchJob, searchStruct, searchSortby) {
    console.log ("filtrerPersonnes(" + searchName + "," + searchFirstname + "," + searchJob + "," + searchStruct + "," + searchSortby + ")");
    /*let listeFiltree= items.filter(element => {
        if (searchName !== '' || searchFirstname !== '' || searchJob !== '') {
            if (searchName !== '') {
                if (element.nomAz.includes(searchName)) {
                    return true;
                }
            } else {
                if (searchFirstname !== '') {
                    if (element.prenomAz.includes(searchFirstname)) {
                        return true;
                    }
                } else {
                    if (searchJob !== '') {
                        if (element.fonction !==null && element.fonction.toLowerCase().includes(searchJob)) {
                            return true;
                        }
                    } else {
                        return false;
                    }
                }
            }
        }
        else {
            return true;}
    });*/
    let listeFiltree=items;
    let i = 0;
    let filters= [/*{
            property: 'name',
            value: 'dori'
        }, {
            property: 'company',
            value: 'a'
        }*/]
    if (searchName !== '') {
        filters.push({property:"nomAz",value:searchName});
    }
    if (searchFirstname !== '') {
        filters.push({property:"prenomAz",value:searchFirstname});
    }
    if (searchJob !== '') {
        filters.push({property:"fonction",value:searchJob});
    }
    if (searchStruct !== '') {
        filters.push({property:"structLibelleFils",value:searchStruct});
    }
    console.log(filters);
    console.log(filters.length);
    if (Array.isArray(filters) && filters.length) {
        listeFiltree = items.filter(createFilter(...filters));
    }
        //const { sorters } = this.state;
        const sorters = [{
            property: '',
            direction : "ASC"
        }]
        sorters[0].property=searchSortby;
        console.log("Avant le tri")
        if (listeFiltree && listeFiltree.length) {
            if (Array.isArray(sorters) && sorters.length) {
                console.log("Tri en cours...")
                listeFiltree.sort(createSorter(...sorters));
            }
    }
    return listeFiltree;

}
