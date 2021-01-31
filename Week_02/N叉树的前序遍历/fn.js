/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/* 思路一：递归 */
/* 终结条件：无子节点，return;
   逻辑处理函数：
        当前根节点的值添入res，
        创建循环，使当前节点的根节点的子节点调用递归
    最后：返回res */
var preorder = function (root) {
    let res = [];
    const preorder = (root) => {
        if (!root) {
            return;
        }
        res.push(root.val);
        for (let i = 0; i < root.children.length; i++) {
            preorder(root.children[i]);
        }
    }
    preorder(root);
    return res;
}


/* 思路二：迭代
1、创建res存放结果，创建stack作为栈，手动维护
2、判断root是否为空，是则直接返回空res，处理边界情况
3、将root压入栈中
4、创建迭代，
        令root出栈，创建变量node指向root，即根节点，
        将根节点的值val添入node
        创建循环，将node的子节点从右向左添入stack（因为取出时先从栈顶取出）
5、迭代结束，返回res */
var preorder = function (root) {
    let res = [];
    let stack = [];
    if (stack == null) { return res; }
    stack.push(root);
    while (stack.length) {
        let node = stack.pop();
        res.push(node.val);
        for (let i = node.children.length - 1; i >= 0; i--) {
            stack.push(node.children[i]);
        }
    }
    return res;
}