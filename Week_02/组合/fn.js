/* 思路一：递归
        此题十分适合使用回溯 */
/* 1、创建res数组存放结果，设置startIndex变量，意为从该位置开始进行遍历与组合，控制枚举项的范围
2、创建path数组，用来暂存一个分支上各层的数字组成的结果
3、创建递归函数
        1）设置递归结束条件：当path长度达到要求的k，将path中的结果填入res中，结束递归
        2）创建循环，在数组[1~n]中遍历，
                从startIndex开始，将对应位置的元素压入path中，
                调用递归，由于startIndex位置元素已存入path，
                        在调用递归时传入起始位置参数时，变为(startIndex+1)
                当递归在通过递归结束条件返回上一层后，进行回溯（撤销对节点的处理）
                        在此处即为将path中的尾部的数字移出，这样不影响下一次循环
4、调用递归函数，传入n,k,startIndex
5、返回res数组 */
var combine = function (n, k) {
    let res = [];
    let startIndex = 0;
    let path = [];
    const backtrack = (n, k, startIndex) => {
        if (path.length == k) {
            /* res.push(path);不行
                    存储在res中的path会随着回溯（即撤销处理的节点）而改变，
            原因是由于path是一个数组，是引用数据类型，各处引用的path实际都是堆内存中同一片地址中存储的值，
                    因此不在同一层中对于path进行的修改，也会影响到其他层path的值 */
            res.push([...path]);
            return;
        }
        /* 剪枝，此处除去了遍历时一些无效的循环：
                当path（暂存结果的数组）已经有了path.length个数字后，还需要（k-length）个数字
                    因此数组[1~n]的最后至少还需要(k-length)个位置，
                所以最多只需要遍历到下标为 n-(k-path.length)+1 的位置，
                    再往后，数组[1~n]中将没有足够的数字使path的长度达到k，就无法满足判断语句，结果就不能填入res */
        for (let i = startIndex; i <= n - (k - path.length) + 1; i++) {
            path.push(i);
            backtrack(n, k, i + 1);
            path.pop();
        }
    }
    backtrack(n, k, startIndex);
    return res;
};
