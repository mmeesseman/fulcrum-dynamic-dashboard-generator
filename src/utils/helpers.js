import { getRandomColor } from './colorGenerator';

const countData = (field, data) => {
  let obj = {};
  data.forEach((row) => {
    if(row[field] in obj){
      obj[row[field]] = obj[row[field]] + 1
    } else {
      obj[row[field]] = 1;
    }
  })
  
  return {
    labels: Object.keys(obj),
    datasets: [{
      label: field,
      data: Object.values(obj),
      backgroundColor: Object.keys(obj).map(getRandomColor)
    }]
  }
}

export { countData }
