/* 思路一：map，以排序后的单词为键，用来区分不同单词以及异位词
1、创建一个map实例，以排序后的单词为键，对应的所有异位词放入数组作为值
2、遍历数组，循环体中，首先将单词排序，将排序后返回的单词字符串key作为设为键
    判断map中以key为键是否有对应的值，
        如果没有，创建新数组，将当前原单词放入数组中，将数组设置为key键的值
        如果有，创建数组对象，地址指向原来的值，将当前单词添加进去，将新的数组对象设为值
3、结束循环后，调用map.values()返回所有的值，再使用Array.from()将其转化为一个二维数组 */

var groupAnagrams = function (strs) {
    let map = new Map();
    for (const str of strs) {
        let arr = Array.from(str).sort();
        let key = arr.toString();
        /* 判断当前key是否存在对应的值，
             有则赋给新的list，没有则创建新的空list */
        let list = map.get(key) ? map.get(key) : new Array();
        list.push(str);
        map.set(key, list);
    }
    return Array.from(map.values());
}

/* 思路二：哈希表，map，记数 
思路二前提了解：由于一组异位词之间各个字母的出现次数是一致的，
所以使用存储各个字母出现次数的哈希表作为map的键*/
/* 1、创建一个map实例对象，再创建一个哈希表作为map实例的键 */

var groupAnagrams = function (strs) {
    const map = new Object();
    for (let s of strs) {
        const count = new Array(26).fill(0);
        for (let c of s) {
            count[c.charCodeAt() - 'a'.charCodeAt()]++;
        }
        map[count] ? map[count].push(s) : map[count] = [s];
    }
    return Object.values(map);
};
