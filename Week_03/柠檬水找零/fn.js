/* 思路一：模拟，贪心
模拟：分出所有情况，共三种
贪心：得到20钞票时，找零先找10元钞票，因为5元钞票的用途大于10元钞票 */
/* 1、创建map，记录收到的5元和10元钞票数量
2、遍历bills，对当前收到的钞票分情况讨论：
    1）收到5元：不用找零，零钱中5元加一
    2）收到10元：找零5元一张，数量小于1，则返回false
    3）收到20元：
            若有10元，先找零一张10元，再找零一张5元
            若无10元，找零三张5元
3、返回res */
var lemonadeChange = function (bills) {
    let change = new Map();
    let res = true;
    change.set(5, 0);
    change.set(10, 0);
    if (bills[0] != 5) { return false; }
    for (let i = 0; i < bills.length; i++) {
        if (bills[i] == 5) {
            // change.push(bills[i]);
            change.set(5, change.get(5) + 1);
        } else if (bills[i] == 10) {
            /* 如果有5，找零
                再将10纳入零钱中 */
            if (change.get(5) < 1) {
                res = false;
                break;
            } else {
                change.set(10, change.get(10) + 1);
                change.set(5, change.get(5) - 1);
            }
        } else {
            /* 顾客给20：
                如果有10：先给10，再给5
                如果没有10：给3张5 */
            if (change.get(10) < 1) {
                // change.get(5) < 3 ?  : res = true;
                if (change.get(5) < 3) {
                    res = false;
                    break;
                } else {
                    change.set(5, change.get(5) - 3);
                }
            } else {
                change.set(10, change.get(10) - 1);
                if (change.get(5) < 1) {
                    res = false;
                    break;
                } else {
                    change.set(5, change.get(5) - 1);
                }
            }
        }
    }
    return res;
};


/* 思路二：模拟、贪心
在思路一的题解中，不在收钱中途返回结果，计算5元与10元数量，最后统计
    任意一种数量小于零，返回false */