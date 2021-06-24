const dirMap = {
    // greater-than
    gt: { asc: 1, desc: -1 },
    // less-than
    lt: { asc: -1, desc: 1 }
};

const doSort = (A, B, property, direction = 'ASC') => {

    if(A[property]!=null && B[property]===null ){
        return dirMap.lt[direction.toLowerCase()];
    }

    if(A[property]===null && B[property]!=null ){
        return dirMap.gt[direction.toLowerCase()];
    }

    if(A[property]===null && B[property]===null ){
        return 0;
    }

    if(A[property]!=null && B[property]!=null ){
        const a = A[property].toLowerCase();
        const b = B[property].toLowerCase();

        if (a < b) {
            return dirMap.lt[direction.toLowerCase()];
        }
        if (a > b) {
            return dirMap.gt[direction.toLowerCase()];
        }
    }

    return 0;
}

const createSorter = (...args) => {
    if (typeof args[0] === 'string') {
        args = [
            {
                direction: args[1],
                property: args[0]
            }
        ];
    }

    return (A, B) => {
        let ret = 0;

        args.some(sorter => {
            const { property, direction = 'ASC' } = sorter;
            const value = doSort(A, B, property, direction);

            if (value === 0) {
                // they are equal, continue to next sorter if any
                return false;
            } else {
                // they are different, stop at current sorter
                ret = value;

                return true;
            }
        })

        return ret;
    }
}

export { createSorter };