/* 思路一：map，set，API排序 */
/* 1、使用map存储nums中元素值与元素出现频率，元素值为键，出现频率为值
2、使用set存储nums中各个元素的值，去重之后将set赋给数组arr */
var topKFrequent = function (nums, k) {
    let map = new Map();
    let arr = [...new Set(nums)];
    for (let i = 0; i < nums.length; i++) {
        if (map.has(nums[i])) { map.set(nums[i], map.get(nums[i]) + 1) }
        else { map.set(nums[i], 1); }
    }
    /* 因为map.get()是元素出现的频率，且操作是map.get(b)-map.get(a)，
    所以arr的排序就是根据频率且从大到小排列 */
    return arr.sort((a, b) => map.get(b) - map.get(a)).slice(0, k);
}


/* 思路二：map，桶排序 */
/* 1、使用map存储nums中元素值与元素出现频率，元素值为键，出现频率为值
2、调用桶排序，传入map和k
        创建res用来存储结果，
        创建arr数组，作用类似map，
            arr以出现频率为下标，值为元素内容，这样频率越高的元素位置越靠后
        遍历map，按频率与值的对应关系将map中内容存入arr中不同位置
        创建循环，从尾部开始将不为空的arr元素，依次存入res中
        返回res
3、将桶排序的返回值作为函数返回值返回 */
var topKFrequent = function (nums, k) {
    let map = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (map.has(nums[i])) { map.set(nums[i], map.get(nums[i]) + 1) }
        else { map.set(nums[i], 1); }
    }
    return bucketSort(map, k);
}
const bucketSort = (map, k) => {
    let res = [], arr = [];
    map.forEach((value, key) => {
        if (!arr[value]) { arr[value] = [key]; }
        else { arr[value].push(key); }
    });
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] && res.length < k) {
            res.push(...arr[i]);
        }
    }
    return res;
}


/* 思路三：map，小顶堆
        使用map存储nums中元素值与元素出现频率，元素值为键，出现频率为值，
        创建大小为k的小顶堆，将前k个元素放入，并调整堆结构
        接着创建循环，将剩余元素依次与堆顶最小元素比较（即比较频率）
                当元素频率大于堆顶元素，删除堆顶元素，该元素入堆，调整结构
        循环结束，堆中k个元素即为频率最高的k个元素 */