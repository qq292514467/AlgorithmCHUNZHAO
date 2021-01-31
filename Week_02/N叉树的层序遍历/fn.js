/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/* 思路一：BFS（Breadth-First Search）广度优先搜索算法 */
/* 1、创建res数组存放结果，创建queue数组模拟队列，并将root根节点放入队列中
2、设置迭代结束条件，即当队列为空后，不再进行迭代
        每次迭代都创建一个level数组，存放当层节点的值
        每次迭代都创建变量len存储队列当前长度，
        创建循环，用于获取当层所有节点的值，且将子节点从左到右依次加入队列
                从队列头部取出第一个节点，并赋给current变量
                将current节点的值添入level中
                将current节点的children全部依次添入队列中
        循环结束后，将存储当层节点值的level数组添入res数组中
3、返回res数组 */
var levelOrder = function (root) {
    if (!root) { return []; }
    let res = [];
    let queue = [root];
    while (queue.length) {
        let level = [];
        let len = queue.length;
        /* 必须使用len存储queue.length，即队列长度，作为循环结束的条件
            否则将current的children节点加入队列后，queue.length会动态变化 */
        for (let i = 0; i < len; i++) {
            let current = queue.shift();
            level.push(current.val);
            if (current.children.length > 0) {
                queue.push(...current.children);
            }
        }
        res.push(level);
    }
    return res;
};


/* 思路二：递归 */
/*  */
var levelOrder = function (root) {
    let res = [];
    const recursion = (res, root, level) => {
        if (!root) { return; }
        if (res[level] == undefined) {
            res[level] = [];
        }
        res[level].push(root.val);
        root.children.forEach(node => {
            /* 调用递归时，传入的level必须是 level + 1，不能为 level++ 或 ++level
                    当使用 level++ ：
                        在对子节点调用递归时，会在其所有子节点都调用完毕，都返回res后，level才会加一
                    当使用 ++level ：
                        尽管level作为参数传递，但 ++level 每进行一次判断就会加一
                        但是使用 ++level 在递归结束回到上一层递归时，level值不会回到原一层level的值，加一操作不可逆
                        
                    使用 level + 1 ，只有在满足条件时才会加一，不会有问题*/
            recursion(res, node, level + 1);
        });//可行
        /* for (let i = 0; i < root.children.length; i++) { 
            recursion(res, root.children[i], level + 1); 
        }//可行 */
        /* for (const node of root.children) {
            recursion(res, node, level + 1);
        }//可行 */

        return res;
    }
    recursion(res, root, 0);
    return res;
}