/* 思路一：
1、使用双指针，index和i
2、使用循环，i遍历数组，index记录为0的元素位置，
    i遇到非零元素，将i位置的元素赋值给index位置的元素
3、遍历结束后，index会在应该是最后一个非零元素的下一位
4、最后使用循环，将index及以后的元素赋值为0 */

var moveZeroes = function (nums) {
    let index = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] != 0) {
            nums[index++] = nums[i];
        }
    }
    while (index < nums.length) {
        nums[index++] = 0;
    }
}

/* 思路二：
1、 遍历数组，遇到0则使用splice方法，将其从数组中删去
2、删去为0元素的同时，在数组的末尾插入一个0*/

var moveZeroes = function (nums) {
    let temp = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[temp] === 0) {
            // splice方法去除1个下标为temp的元素，数组长度会缩短1位
            nums.splice(temp, 1);
            nums[nums.length] = 0;
        } else {
            temp++;
        }
    }
}

/* 思路三：
1、视频中的解法，使用双指针，相当于对思路一进行一些简化
2、j记录为0的元素的位置，i遍历数组，在遇到0后，j不动，i++
3、当i再次遇到非零元素时，i!=j ，将值赋值给j位置的元素，同时i位置元素赋值为0 
    这一步相当于将非零元素与之前遇到的0交换位置*/
var moveZeroes = function (nums) {
    let j = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] != 0) {
            nums[j] = nums[i]; 
            if (i != j) {
                nums[i] = 0;
            }
            j++;
        }
    }
}

/* 思路四：
1、遍历数组，使用变量count记录数组中0的个数
2、遍历数组时遇到0，使用splice方法删除0，并令i--以防数组塌陷
3、结束循环后再开循环，将count个0填入数组尾部 */
var moveZeroes = function (nums) {
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] == 0) {
            count++;
            nums.splice(i,1);
            i--;
        }
    }
    for (let i = 0; i < count; i++) {
        nums[nums.length] = 0;
    }
}