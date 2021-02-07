/* 思路一：暴力破解 */
var majorityElement = function (nums) {
    let res = 0;
    for (let i = 0; i < nums.length; i++) {
        let count = 0;
        for (let j = 0; j < nums.length; j++) {
            if (num[i] == nums[j]) {
                count++;
            }
        }
        if (count >= Math.ceil(nums.length / 2)) { res = count; break; }
    }
    return res;
}

/* 思路二：map，以元素为键，出现次数为值 */
var majorityElement = function (nums) {
    let map = new Map();
    let res = 0;
    nums.forEach(ele => {
        if (map.has(ele)) {
            map.set(ele, map.get(ele) + 1);
        } else {
            map.set(ele, 1);
        }
    });
    for (const [key, value] of map) {
        if (value >= Math.ceil(nums.length / 2)) {
            res = key;
            break;
        }
    }
}

/* 思路三：sort排序 */
/* 1、调用数组的sort直接对nums排序，
2、由于始终存在多数元素，所以n/2下标的元素肯定是多数元素，返回n/2位置的元素
        调用Math.floor()处理非偶数长度的数组 */
var majorityElement = function (nums) {
    nums.sort((a, b) => { return a - b; });
    return nums[Math.floor(nums.length / 2)];
}