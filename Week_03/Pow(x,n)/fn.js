/* 思路一：暴力 超出时间限制*/
/* var myPow = function (x, n) {
    let res = 1;
    if (x == 0 || x == 1) { return x; }
    if (n == 0) { return 1; }
    if (n < 0) {
        // n<0时，pow(x,n)等于x的n次方分之一；同时，pow(x,n)等于1/x的|n|次方
        x = 1 / x;
        n = 0 - n;
    }
    for (let i = 0; i < n; i++) {
        res = res * x;
    }
    return x;
}; */


/* 思路二：分治
暴力求解需要将乘n次，时间复杂度为O(N)；
但若令x = x^2，则只需要乘log2(N)次，时间复杂度为O(logN) */
/* 1、创建res变量存储结果
2、考虑特殊情况，如x为0或1时，直接返回x
    当n小于0时，Pow(x,n)等于 1/x 的 -n 次方
3、创建递归函数
    1）设置终止条件：当n为0，当前层结果返回1
    2）处理当前层逻辑，并进入下一层
            将n/2的商作为参数，传入下一层
    3）返回当前层
            若当前层n为偶数，返回res*res
            若n为奇数，则res*res后还要乘以x
4、调用函数
5、返回res */
var myPow = function (x, n) {
    let res = 1;
    if (x == 0 || x == 1) { return x; }
    if (n == 0) { return 1; }
    if (n < 0) {
        // n<0时，pow(x,n)等于x的n次方分之一；同时，pow(x,n)等于1/x的|n|次方
        x = 1 / x;
        n = 0 - n;
    }
    /* 分治：x^n == x^(n/2)的2次方 == x^2的n/2次方 == ...
            这样就将时间复杂度从O(n)降低到了O(logN) */
    const myPow = (x, n) => {
        if (n == 0) {
            // 终止条件
            return 1;
        }

        // 进入下一层，调用递归
        myPow(x, Math.floor(n / 2));

        return n % 2 == 0 ? res = res * res : res = res * res * x;
    }
    myPow(x, n);
    return res;
}
