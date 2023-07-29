function countBMI(weight, height, callback){
    let result = weight / Math.pow(height, 2)
    // return result
    callback (result)
}

//  function status(bmi){
    
// }

let statusBMI = (bmi) => {
    if (bmi < 18,5){
        console.log(`you are underweight`);
    }
    else if (bmi >= 18,5 && bmi < 25){
        console.log(`you are normal`);
    }
    else if (bmi >= 18,5 && bmi < 30){
        console.log(`you are overweight`);
    }
    else if (bmi >=30){
        console.log(`you are obese`);
    }

}

countBMI(70, 1.7, btbb => statusBMI(btbb))