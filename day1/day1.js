const utils = require('../shared/utils')



function getInventories() {
    try {
        const data = utils.getFileByLinesSync('./day1/day1.txt')
        const snackCalories = data.map((x => parseInt(x)));

        const inventories = [];
        
        let currentInventory = {
          inventory: [],
          totalCalories: 0
        };
        // console.log(snackCalories)

        let largestTotalCalories = 0;
        
        for(let i = 0; i <  snackCalories.length; i++) {
          const calorie = snackCalories[i];
          if(Number.isNaN(calorie)) {
            // console.log("NAN");
            inventories.push(currentInventory);
            // console.log("total", currentInventory.totalCalories);
            if (currentInventory.totalCalories > largestTotalCalories) {
              largestTotalCalories = currentInventory.totalCalories;
            }
            currentInventory = {
              inventory: [],
              totalCalories: 0
            };
          } else {
            // console.log("calorie", calorie)
            currentInventory.inventory.push(calorie);
            currentInventory.totalCalories += calorie;
          }
        }
        // console.log(inventories);
        return inventories;
      } catch (err) {
        console.error(err);
      }
}




const inventories = getInventories().sort(((a, b) => b.totalCalories - a.totalCalories))
console.log("Part 1");
console.log(inventories[0].totalCalories);

console.log("Part 2")
console.log(inventories[0].totalCalories + inventories[1].totalCalories + inventories[2].totalCalories);




