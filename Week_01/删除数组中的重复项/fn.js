/* 思路一：暴力破解，使用双层循环
1、一层循环从左向右遍历数组，
2、二层循环将数组剩下元素与当前元素比较，相同则删除 */
var removeDuplicates = function (nums) {
    for (let i = 0; i < nums.length-1; i++) {
        for (let j = i+1; j < nums.length; j++) {
            if (nums[i] === nums[j]) {
                nums.splice(j,1);
                j--;//避免数组塌陷后漏掉元素
            }
        }
    }
    return nums.length;
}

/* 思路二：快慢双指针，并且设置一个新的数组用来拷贝，但题目要求原地修改，故不用
1、原数组先进行排序，
2、设置一个新数组res，放入原数组中第一个元素，
3、设置指针index = 0，记录非重复元素的位置 
4、将nums[i]和res[index]比较，将没有重复的元素添加到res数组中 */

/* var removeDuplicates = function (nums) {
    nums.sort(function(a, b){ return a-b; });
    let res = [nums[0]];
    let index = 0;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] != res[index]) {
            index++;
            res[index] = nums[i];
        }
    }
    return res.length;
} */

/* 思路三：快慢双指针，在原数组上进行操作
1、数组进行排序（题目已排序完成）并且设置第二个指针index，用来记录非重复数组的位置
2、将index下标的元素和i下标的元素进行比较 */
var removeDuplicates = function (nums) {
    // nums.sort(function(a, b){ return a-b; });
    let index = 0;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] != nums[index]) {
            nums[++index] = nums[i]
        }
    }
    return index+1;
}