/**
 *
 * fonctions qui filtrent et trient les personnes
 *
 */

import {createFilter} from './Filter';
import {createSorter} from './Sort';
import myLog from "./MyLogger";

export default function filtrerPersonnes(items, searchName, searchFirstname, searchJobs, searchSortby) {
    myLog("filtrerPersonnes(searchName:" + searchName + ",searchFirstname:" + searchFirstname + ",searchJobs:" + searchJobs + ",searchSortby" + searchSortby + ")");
    let listeFiltree = items;
    let filters = [];
    if (searchName !== '') {
        filters.push({property: "nomAz", value: searchName});
    }
    if (searchFirstname !== '') {
        filters.push({property: "prenomAz", value: searchFirstname});
    }

    myLog("FiltrerPersonnes:typeof(searchJobs)=" + typeof searchJobs);

    if (searchJobs === null ) {
        myLog ("filtrerPersonnes - searchJobs est null");
    }
    if (searchJobs !== null && searchJobs.length !== 0) {
        let jobRegExp="";
        if (searchJobs.has("A")){ // si recherche les 'autres', il faut exclure intelligemment en fonction des autres saisies
            if ( ! searchJobs.has("I")) {
                filters.push({property: "fonction", value: "^((?![Ii]ng[ée]nieur).)*$"}); // ne contient pas ingénieur
                filters.push({property: "fonction", value: "^((?![Ii][Nn][Gg]).)*$"}); // ne contient pas ingénieur
            }
            if ( ! searchJobs.has("C")) {
                filters.push({property: "fonction", value: "^((?!^[Ee][Cc]).)*$"}); // ne contient pas EC
                filters.push({property: "fonction", value: "^((?![Cc]hercheur).)*$"}); // ne contient pas chercheur
                filters.push({property: "fonction", value: "^((?![Dd]octorant).)*$"}); // ne contient pas doctorant
            }
            if ( ! searchJobs.has("E")) {
                filters.push({property: "fonction", value: "^((?![Mm]a[iî]tre).)*$"}); // ne contient pas maitre
                filters.push({property: "fonction", value: "^((?![Ee]nseignant).)*$"}); // ne contient pas enseignant
                filters.push({property: "fonction", value: "^((?![Pp]rofesseur).)*$"}); // ne contient pas professeur
                filters.push({property: "fonction", value: "^((?![Cc]onf[ée]rence).)*$"}); // ne contient pas conférence
            }
        }
        else {
            if (searchJobs.has("E")) {
                jobRegExp += "[Ee][Cc]|[Ee]nseignant|[Pp]rofesseur|[Mm]a[iî]tre|[Cc]onf[eé]rence";
                filters.push({property: "fonction", value: jobRegExp});
            }
            if (searchJobs.has("C")) {
                if (jobRegExp !== '') {
                    jobRegExp += '|';
                }
                jobRegExp += "^[Ee][Cc]|[Cc]hercheur|[Dd]octorant";
                filters.push({property: "fonction", value: jobRegExp});
            }
            if (searchJobs.has("I")) {
                if (jobRegExp !== '') {
                    jobRegExp += '|';
                }
                jobRegExp += "[Ii]ng[eé]nieur|[Ii][Nn][Gg]";
                filters.push({property: "fonction", value: jobRegExp});
            }
        }
    }

    if (Array.isArray(filters) && filters.length) {
        listeFiltree = items.filter(createFilter(...filters));
    }
    //const { sorters } = this.state;
    const sorters = [{
        property: '',
        direction: "ASC"
    }]
    sorters[0].property = searchSortby;
    myLog("Avant le tri")
    if (listeFiltree && listeFiltree.length) {
        if (Array.isArray(sorters) && sorters.length) {
            myLog("Tri en cours...")
            listeFiltree.sort(createSorter(...sorters));
        }
    }
    return listeFiltree;

}
