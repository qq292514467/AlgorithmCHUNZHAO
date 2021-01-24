/* i+k <= length-1
   i+k > length-1 --> i+k-length */
/* 思路一：用新数组存储改变为之后的数组 
1、设置新数组res存储结果，
2、一层循环，将元素放到res中应该放到的下标的位置上*/
var rotate = function (nums, k) {
    let len = nums.length;
    let res = [];
    for (let i = 0; i < n; i++) {
        res[(i + k) % n] == nums[i];
    }
    for (let i = 0; i < res.length; i++) {
        nums[i] = res[i];
    }
    return nums;
}

/* 思路二：翻转数组
翻转数组解法实现的前提：
1、数组向右移动k个位置，则最后的k个元素会移动到数组最前端
    当k>=nums.length时，取k=k%nums.length;即可
2、除了最后k个元素会被移动到前端，前面的length-k个元素会移动到数组后面*/

/* 解题步骤：
1、在了解旋转数组的前提下，将数组整体翻转
2、将翻转后数组下标为0~k-1和k~length-1的两部分数组分别翻转
3、由两部分翻转后的数组拼接成的数组就是移动数组后的形式 */
var rotate = function (nums, k) {
    k = k % nums.length;
    nums.reverse();
    let res1 = nums.slice(0, k).reverse();
    let res2 = nums.slice(k, nums.length).reverse();
    for (let i = 0; i < res1.length; i++) {
        nums[i] = res1[i];
    }
    for (let i = 0; i < res2.length; i++) {
        nums[k++] = res2[i];
    }
    return nums;
}

/* 思路三：环状替换
前提了解：
1、当数组元素数n与移动的位置数k的最大公约数m等于1时，可以一次遍历完成数组移动，
    当最大公约数m不等于1时，需要n与k的最大公约数m次的遍历才能完成
2、每次遍历会有(n/m)个元素参与内循环 */

/* 1、求出n与k的最大公约数，并赋值给变量count，统计外循环总次数
2、外循环体中记录未移动元素的下标和元素值
3、内循环条件，当最后一个被挤占元素下标是外循环初始的下标，结束内循环
4、内循环中记录被挤占位置的元素的下标和元素值，
5、接着替换下标出元素值，
6、被挤占位置的元素的下标和元素值变为 未移动的元素的 下标和元素值 */

// gcd，箭头函数，通过递归返回x，y的最大公约数
const gcd = (x, y) => y ? gcd(y, x % y) : x;
var rotate = function (nums, k) {
    let n = nums.length;
    k %= n;//令 k < nums.length
    //count：k与n的最大公约数，外循环次数
    let count = gcd(n, k);
    for (let i = 0; i < count; i++) {
        /* curIndex、curValue记录当前元素下标和元素值 */
        let curIndex = i;
        let curValue = nums[curIndex];
        do {
            /* nextIndex、nextValue记录将被挤占的元素的下标和元素值 */
            let nextIndex = (curIndex + k) % n;
            let nextValue = nums[nextIndex];
            // 将应移动到的下标的元素的值更换
            nums[nextIndex] = curValue;
            /* 被占据位置的元素的下标和元素值赋值给curIndex、curValue */
            curValue = nextValue;
            curIndex = nextIndex;
        } while (i != curIndex);
    }
}
