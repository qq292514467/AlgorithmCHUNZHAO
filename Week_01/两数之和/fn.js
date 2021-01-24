/* 思路一（暴力求解）
1、设置两层嵌套循环，第一层中遍历数组中所有数字
2、第二层循环遍历除了第一层循环中数的所有数字，覆盖所有可能情况
3、在第二层循环中计算第二层中的数与一层循环中的数相加，和是否为target
    如果是，往一个数组中存放一层与二层数字的下标，并返回；
    若不是，则跳至下一次循环
 */
var twoSum = function(nums, target) {
    let res = [];
    for (let i = 0; i < nums.length-1; i++) {
        // 数组中同一个元素只能使用一次，
        // 因此一层中最后一个数字不需要再计算，即nums[nums.length-2]
        for (let j = i+1; j < nums.length; j++) {
           if(nums[i] + nums[j] === target) {
               res[0] = i;
               res[1] = j;
               return res;
           }            
        }
    }
};

/* 思路二（哈希表） */