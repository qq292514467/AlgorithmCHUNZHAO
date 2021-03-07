var climbStairs = function (n) {
    let p = [];
    p[0] = 1;
    p[1] = 2;
    for (let i = 2; i <= n-1; i++) {
        p[i] = p[i-2] + p[i-1];
    }
    return p[n-1];
}