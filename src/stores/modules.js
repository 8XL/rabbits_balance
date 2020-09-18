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
        return [1, -1, 20, -1]
    } else if (el > 379){
        return [-1, -20, 1, -20]
    } else if((el + 1) % 20 === 0){
        return [20, -1, -20, -1]
    } else if (el % 20 === 0){
        return [1, 1, 20, -20]
    } else {
        return [1, 20, -1, -20]
    }
};

export const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); 
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr
}

export const randomIndex = (arr) => {
    const i = Math.floor(Math.random() * ((arr.length+1) - 1) + 1) - 1;
    return i
}