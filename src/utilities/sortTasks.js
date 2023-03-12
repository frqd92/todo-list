export function sortByDate(arr, isAsc){
    return makeDeepCopy(arr).sort((a,b)=>{
        const aDate =  new Date(`${dateFormatSort(a.due)}`);
        const bDate =  new Date(`${dateFormatSort(b.due)}`);
        return isAsc? aDate - bDate : bDate-aDate;
    })
}



function dateFormatSort(arr){
    let [dd, mm, yy] = arr;
    mm++;
    return `${yy}/${zeroAdder(mm)}/${zeroAdder(dd)}`
}

//anotha one
function zeroAdder(num){return num<10?"0"+num:num;}

function makeDeepCopy(arr){
    let copiedArr, value, key;
    if(typeof arr !== "object" || arr === null) return arr;
    copiedArr = Array.isArray(arr) ? [] : {};
    for(key in arr){
      value = arr[key];
      copiedArr[key] = makeDeepCopy(value);
    }
    return copiedArr;
}