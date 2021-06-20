/**
 *
 * fonctions qui filtrent et trient les personnes
 *
 */

import {createFilter} from './Filter';
import {createSorter} from './Sort';

export default function filtrerPersonnes(items, searchName, searchFirstname, searchJobs, searchSortby) {
    console.log("filtrerPersonnes(searchName:" + searchName + ",searchFirstname:" + searchFirstname + ",searchJobs:" + searchJobs + ",searchSortby" + searchSortby + ")");
    let listeFiltree = items;
    let filters = [];
    if (searchName !== '') {
        filters.push({property: "nomAz", value: searchName});
    }
    if (searchFirstname !== '') {
        filters.push({property: "prenomAz", value: searchFirstname});
    }

    console.log("FiltrerPersonnes:typeof(searchJobs)=" + typeof searchJobs);

    if (searchJobs === null ) {
        console.log ("filtrerPersonnes - searchJobs est null");
    }
    if (searchJobs !== null && searchJobs.length !== 0) {
        let jobRegExp="";
        if (searchJobs.has("E")) {
            jobRegExp += "[Ee][Cc]|[Ee]nseignant|[Pp]rofesseur|[Mm]a[iî]tre|[Cc]onf[eé]rence";
        }
        if (searchJobs.has("C")) {
            if (jobRegExp !== '') { jobRegExp += '|';}
            jobRegExp += "[Ee][Cc]|[Cc]hercheur|[Dd]octorant";
        }
        if (searchJobs.has("I")) {
            if (jobRegExp !== '') { jobRegExp += '|';}
            jobRegExp += "[Ii]ng[eé]nieur";
        }
        console.log("FiltrerPersonnes:jobRegExp="+jobRegExp);
        filters.push({property: "fonction", value: jobRegExp});
    }
    console.log("FiltrerPersonnes:filters=" + filters);

    if (Array.isArray(filters) && filters.length) {
        listeFiltree = items.filter(createFilter(...filters));
    }
    //const { sorters } = this.state;
    const sorters = [{
        property: '',
        direction: "ASC"
    }]
    sorters[0].property = searchSortby;
    console.log("Avant le tri")
    if (listeFiltree && listeFiltree.length) {
        if (Array.isArray(sorters) && sorters.length) {
            console.log("Tri en cours...")
            listeFiltree.sort(createSorter(...sorters));
        }
    }
    return listeFiltree;

}
