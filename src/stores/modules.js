export const restrictions = (el) => {
    if (el === 399){
        return [-20, -20, -1, -1]
    } else if (el === 380){
        return [-20, 1, 1, -20,]
    }  else if (el === 0){
        return [20, 1, 20, 1]
    } else if (el === 19){
        return [-1, -1, 20, 20]
    } else if (el < 20){
        return [1, -1, 20]
    } else if (el > 379){
        return [-1, -20, 1]
    } else if((el + 1) % 20 === 0){
        return [20, -1, -20]
    } else if (el % 20 === 0){
        return [1, 20, -20]
    } else {
        return [1, 20, -1, -20]
    }
};

export const shuffle = (arr) => {
    if(arr.length>2){
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); 
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr
    }
    return arr
}

export const randomIndex = (arr) => {
    return Math.floor(Math.random() * ((arr.length+1) - 1) + 1) - 1;
}

export const percents = (min, max) => {
    const startRange = Math.floor(((20 * 20) * min) / 100);
    const endRange = Math.floor(((20 * 20) * max) / 100);
    return Math.floor(Math.random() * (startRange - endRange + 1)) + endRange;
}

export const factor = () => {
    return Math.floor(Math.random()*(101-1)+1);
}

export const timestamp = ()=>{
    return Math.floor(new Date().getTime()*(Math.random()*(1000-1)+1)).toString();
}

const delayForRabbits = {
    water: 3,
    swamp: 4,
    mud: 2,
    forest: 2,
}

const delayForFox = {}

// if(animal.position === value){
//     console.log('delayed')
//     if(0 <= animal.delayCounter){
//         animal.delayed = true;
//         animal.delayCounter += 1;
//         return [0]
//     } else {
//         return restrictions(animal.position)
//     }
// } else {
//     console.log('restrictions', animal.position)
//     return restrictions(animal.position)
// }