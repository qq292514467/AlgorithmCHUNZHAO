/* 类似数组形式的整数相加 */
/* 思路：因为加一，所以只有两种情况
1：最后一位加一小于10，则直接返回数组
2、最后一位加一等于10（个位数加1最大只能为10），
    则自最后遍历数组，遇到某一位加一不进位，返回数组*/
var plusOne = function (digits) {
    let len = digits.length;
    for (let i = len - 1; i >= 0; i--) {
        digits[i]++;
        if (digits[i] >= 10) {
            digits[i] = 0;
        } else {
            return digits;
        }
    }
    if (digits[0] == 0) {
        digits.unshift(1);
    }
    return digits;
};


/* 错误示例： */
/* 本想尝试将最后一位不进位的情况剥离出来，但是当数组只有一个元素时，会下标溢出报错，故不行 */
/* var plusOne = function (digits) {
let len = digits.length;
digits[len-1]++;
if (digits[len-1] < 10) {
    return digits;
}
for (let i = len-2; i >=0; i++) {
    digits[len-1] = 0;
    digits[i]++;
    if (digits[i] = 10) {
        digits[i] = 0;
        continue;
    }
    if (i == 0 && digits[i] == 10) {
        digits[0] = 0;
        digits.unshift(1);
        return digits;
    }
    return digits;
}
} */