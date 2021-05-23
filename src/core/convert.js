const object = require('../objecto.json')
const config = require('../config.json')
const modified = require('../modified.json')

const fs = require('fs');
const path = require('path');




/* extract key values */
const extractKeys = (object) => {

    return Object.keys(object).sort();
}

const objectKeys = extractKeys(object);
//console.log(objectKeys);
const configKeys = extractKeys(config);
//console.log(configKeys);




/* instersecion of first key values */
const intersection = (objectKeys, configKeys) => {
    return objectKeys.filter(value => configKeys.includes(value))

}
const intersectValues = intersection(objectKeys, configKeys)
    //console.log(intersectValues);

/* search for object hierarchy*/
const searchHi = (obj1, obj2) => {

    if (typeof(obj1) && typeof(obj2) === 'object') {

        const objectKeysh = extractKeys(obj1);
        const configKeysh = extractKeys(obj2);
        const intersec = intersection(objectKeysh, configKeysh)

        return intersec
    } else {
        return typeof(obj2)
    }
}

const cases = (objc, objo) => {

    let type = typeof(objc)
    switch (type) {

        case 'object':

            console.log('es un objecto');
            break;

        case 'number':
            //console.log('es un numero');
            const newVa = objc * objo
                //console.log(newVa);
            return newVa


            break;

        case 'string':
            console.log('string');

            break;
    }
}

/* to save */

const savejs = (obj) => {
    const pathto = path.join(__dirname, '../modified.json');
    fs.writeFileSync(pathto, JSON.stringify(obj));
    console.log('guarde');
}

/* ---- */

for (let i = 0; i < intersectValues.length; i++) {

    /* for for first key values */

    let configure = config[intersectValues[i]]
    let objectto = object[intersectValues[i]]


    /* look for H and the legth of the intersection array */
    if (searchHi(objectto, configure).length == 1) {


        let caso = searchHi(objectto, configure)

        const cambio = cases(configure[caso], objectto[caso])



        //console.log(object);
        //console.log(objectto);
        objectto[caso] = cambio;
        //console.log(objectto);
        //object[intersectValues[i]] = objectto;

        //console.log(object);
        const modifiedO = object;
        savejs(modifiedO);
        /*  */
    } else {
        /* const type = searchHi(objectto, configure)
        console.log(type); */
    }




}






module.exports = modified;